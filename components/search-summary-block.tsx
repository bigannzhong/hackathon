"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface SearchResult {
  id: string
  src: string
  alt: string
  title: string
  author: string
}

interface SearchSummaryBlockProps {
  searchQuery: string
  results: SearchResult[]
  totalResults: number
  onRevisitSearch: () => void
  timestamp: Date
}

export function SearchSummaryBlock({
  searchQuery,
  results,
  totalResults,
  onRevisitSearch,
  timestamp,
}: SearchSummaryBlockProps) {
  const previewImages = results.slice(0, 4) // Show up to 4 preview images
  const router = useRouter()
  const pathname = usePathname()

  const handleResultClick = () => {
    if (pathname !== "/chat") {
      // Generate a threadId based on the search data for consistency
      const threadId = `search-${Date.now()}-${searchQuery.replace(/\s+/g, "-").toLowerCase()}`
      router.push(`/chat?threadId=${threadId}`)

      // Delay the search revisit to allow navigation to complete
      setTimeout(() => {
        onRevisitSearch()
      }, 100)
    } else {
      // If already on chat page, just revisit the search
      onRevisitSearch()
    }
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[280px] bg-white border border-gray-200 rounded-[16px] overflow-hidden shadow-sm">
        {/* Minimal Header */}
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-[#191919]">Search Results</h4>
            <button
              onClick={handleResultClick}
              className="p-1 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
              aria-label={pathname !== "/chat" ? "View results in chat" : "Revisit this search"}
            >
              <ExternalLink className="w-4 h-4 text-[#707070]" />
            </button>
          </div>
        </div>

        <div className="p-2">
          {results.length > 0 ? (
            <div className="flex gap-1">
              {previewImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={handleResultClick}
                  className="relative w-12 h-12 rounded-[16px] overflow-hidden bg-gray-100 flex-shrink-0 hover:ring-2 hover:ring-black hover:ring-offset-1 transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-gray-500">No results found</div>
          )}
        </div>
      </div>
    </div>
  )
}
