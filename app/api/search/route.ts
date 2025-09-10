import { type NextRequest, NextResponse } from "next/server"

// Helper function to get the largest thumbnail image
function getLargestThumbnail(thumbnailImages: any) {
  if (!thumbnailImages) return "/placeholder.svg?height=300&width=300"

  const sizes = Object.keys(thumbnailImages)
    .filter((key) => key.startsWith("w"))
    .map((key) => ({ key, width: Number.parseInt(key.substring(1)) }))
    .sort((a, b) => b.width - a.width)

  return sizes.length > 0 ? thumbnailImages[sizes[0].key] : "/placeholder.svg?height=300&width=300"
}

const getMockResults = (query: string) => [
  {
    id: "mock-1",
    src: "/outdoor-puppy-playing.jpg",
    alt: `${query} - Photo 1`,
    title: `Beautiful ${query} Photo`,
    author: "Stock Photographer",
    envatoUrl: "#",
    tags: query.split(" "),
  },
  {
    id: "mock-2",
    src: "/cute-puppy-nature.jpg",
    alt: `${query} - Photo 2`,
    title: `Stunning ${query} Image`,
    author: "Professional Photographer",
    envatoUrl: "#",
    tags: query.split(" "),
  },
  {
    id: "mock-3",
    src: "/puppy-outdoor-sunny.jpg",
    alt: `${query} - Photo 3`,
    title: `Amazing ${query} Shot`,
    author: "Creative Artist",
    envatoUrl: "#",
    tags: query.split(" "),
  },
  {
    id: "mock-4",
    src: "/playful-puppy-grass.jpg",
    alt: `${query} - Photo 4`,
    title: `Perfect ${query} Capture`,
    author: "Visual Creator",
    envatoUrl: "#",
    tags: query.split(" "),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { query, filters, page = 1 } = await request.json()

    console.log("[v0] Search API called with:", { query, filters, page })

    // Get API credentials from your environment variables
    const apiEndpoint = process.env.ELEMENTS_POC_ENDPOINT
    const clientId = process.env.CF_ACCESS_CLIENT_ID
    const clientSecret = process.env.CF_ACCESS_CLIENT_SECRET
    const authUser = process.env.AUTH_USER
    const authPassword = process.env.AUTH_PASSWORD

    console.log("[v0] API endpoint configured:", !!apiEndpoint)

    if (!apiEndpoint) {
      console.log("[v0] No API endpoint configured, using mock data")
      const mockResults = getMockResults(query)
      console.log("[v0] Returning mock results:", mockResults.length)
      return NextResponse.json({
        results: mockResults,
        total: mockResults.length,
        query,
        filters,
        page,
        hasMore: false,
      })
    }

    // Build search parameters - try different parameter combinations
    const searchParams = new URLSearchParams({
      term: query, // Use 'term' instead of 'q'
      item_type: "photos", // Try photos first
      page_size: "32", // Changed from "24" to "32"
      page: page.toString(), // Use the page parameter
      language_code: "en",
    })

    // Add filters if specified
    if (filters?.orientation && filters.orientation !== "all") {
      searchParams.append("orientation", filters.orientation)
    }

    if (filters?.subcategory && filters.subcategory !== "all") {
      // Map our subcategories to search tags
      const categoryMap: Record<string, string> = {
        business: "business",
        people: "people",
        nature: "nature",
        technology: "technology",
        lifestyle: "lifestyle",
      }

      if (categoryMap[filters.subcategory]) {
        searchParams.append("tags", categoryMap[filters.subcategory])
      }
    }

    // Prepare headers
    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent": "Envato-AI-Search/1.0",
    }

    // Add Cloudflare Access headers if available
    if (clientId && clientSecret) {
      headers["CF-Access-Client-Id"] = clientId
      headers["CF-Access-Client-Secret"] = clientSecret
    }

    // Add basic auth if available
    if (authUser && authPassword) {
      const credentials = Buffer.from(`${authUser}:${authPassword}`).toString("base64")
      headers["Authorization"] = `Basic ${credentials}`
    }

    console.log("Making request to:", `${apiEndpoint}?${searchParams.toString()}`)

    // Make request to your Elements API endpoint
    const response = await fetch(`${apiEndpoint}?${searchParams.toString()}`, {
      method: "GET",
      headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Response Error:", errorText)
      console.log("[v0] API failed, using mock data")
      const mockResults = getMockResults(query)
      return NextResponse.json({
        results: mockResults,
        total: mockResults.length,
        query,
        filters,
        page,
        hasMore: false,
      })
    }

    const data = await response.json()
    console.log("API Response structure:", JSON.stringify(data, null, 2))

    // Transform API response to our format - handle multiple possible structures
    let results = []

    if (data.data?.items) {
      // Structure: { data: { items: [...] } }
      results = data.data.items.map((item: any) => ({
        id: item.humane_id || item.id || Math.random().toString(),
        src:
          item.cover_image_urls?.w400 ||
          item.cover_image_urls?.w300 ||
          item.thumbnail_url ||
          item.preview_url ||
          "/placeholder.svg?height=300&width=300",
        alt: item.title || "Envato photo",
        title: item.title || "Untitled",
        author: item.contributor_username || item.author || "Unknown",
        envatoUrl: item.item_page_url || item.url,
        tags: item.tags || [],
      }))
    } else if (data.items) {
      // Structure: { items: [...] }
      results = data.items.map((item: any) => ({
        id: item.id || Math.random().toString(),
        src: item.thumbnail || item.preview || item.image_url || "/placeholder.svg?height=300&width=300",
        alt: item.title || item.name || "Envato photo",
        title: item.title || item.name || "Untitled",
        author: item.author || item.username || "Unknown",
        envatoUrl: item.url || item.link,
        tags: item.tags || [],
      }))
    } else if (Array.isArray(data)) {
      // Structure: [...]
      results = data.map((item: any) => ({
        id: item.id || Math.random().toString(),
        src: item.thumbnail || item.preview || item.image_url || "/placeholder.svg?height=300&width=300",
        alt: item.title || item.name || "Envato photo",
        title: item.title || item.name || "Untitled",
        author: item.author || item.username || "Unknown",
        envatoUrl: item.url || item.link,
        tags: item.tags || [],
      }))
    }

    if (results.length === 0) {
      console.log("[v0] No results from API, using mock data")
      results = getMockResults(query)
      console.log("[v0] Mock results generated:", results.length)
    }

    console.log("[v0] Final results count:", results.length)

    return NextResponse.json({
      results,
      total: data.data?.total_hits || data.total_hits || data.total || results.length,
      query,
      filters,
      page: page,
      hasMore: results.length === 32, // Updated to check for 32 items instead of 24
    })
  } catch (error) {
    console.error("Search API error:", error)
    const { query } = await request.json().catch(() => ({ query: "search" }))
    console.log("[v0] Error occurred, using mock data")
    const mockResults = getMockResults(query)
    return NextResponse.json({
      results: mockResults,
      total: mockResults.length,
      query,
      filters: {},
      page: 1,
      hasMore: false,
    })
  }
}
