"use client"

import { useState, useEffect } from "react"
import { ChatPanel } from "@/components/chat-panel"
import { SearchResultsPanel } from "@/components/search-results-panel"
import { SearchSummaryBlock } from "@/components/search-summary-block"
import { useChatHistory } from "@/hooks/use-chat-history"

export default function ChatPage() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchFilters, setSearchFilters] = useState({
    category: "photos",
    subcategory: "all",
    orientation: "all",
    resolution: "all",
  })
  const [hasMoreResults, setHasMoreResults] = useState(false)
  const [hasPerformedInitialSearch, setHasPerformedInitialSearch] = useState(false)

  const { lastSearchData } = useChatHistory()

  useEffect(() => {
    if (!hasPerformedInitialSearch) {
      handleSearch("kids playing with cat, dog", {
        category: "photos",
        subcategory: "all",
        orientation: "all",
        resolution: "all",
      })
      setHasPerformedInitialSearch(true)
    }
  }, [hasPerformedInitialSearch])

  const handleSearch = async (query: string, filters: any, page = 1) => {
    setIsSearching(true)
    setSearchQuery(query)
    setSearchFilters(filters)
    setSearchError(null)

    try {
      // Call search API
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, filters, page }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Search failed")
      }

      const results = data.results || []

      // Only update search results if this is page 1 (new search)
      // For pagination, the SearchResultsPanel handles appending results
      if (page === 1) {
        setSearchResults(results)
      } else {
        setSearchResults((prevResults) => [...prevResults, ...results])
      }

      setHasMoreResults(data.hasMore || false)

      // Return the results so ChatPanel can use them
      return {
        results: results,
        totalResults: data.total || results.length,
        hasMore: data.hasMore || false,
      }
    } catch (error) {
      console.error("Search failed:", error)
      setSearchError(error instanceof Error ? error.message : "Search failed")
      if (page === 1) {
        setSearchResults([])
      }
      setHasMoreResults(false)
      return {
        results: [],
        totalResults: 0,
        hasMore: false,
      }
    } finally {
      setIsSearching(false)
    }
  }

  const handleRevisitPinnedSearch = () => {
    if (lastSearchData) {
      handleSearch(lastSearchData.query, lastSearchData.filters)
    }
  }

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Left Panel - Chat - 35% width with max 560px */}
      <div className="w-[35%] max-w-[560px] flex-shrink-0 border-r border-gray-200 flex flex-col">
        <div className="flex-1">
          <ChatPanel onSearch={handleSearch} />
        </div>

        {lastSearchData && lastSearchData.results && lastSearchData.results.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="text-xs text-gray-500 mb-2">Most Recent Search</div>
            <SearchSummaryBlock
              searchQuery={lastSearchData.query}
              results={lastSearchData.results}
              totalResults={lastSearchData.totalResults}
              onRevisitSearch={handleRevisitPinnedSearch}
              timestamp={new Date()}
            />
          </div>
        )}
      </div>

      {/* Right Panel - Search Results - Takes remaining space */}
      <div className="flex-1 min-w-0">
        <SearchResultsPanel
          results={searchResults}
          isLoading={isSearching}
          query={searchQuery}
          filters={searchFilters}
          error={searchError}
          onFiltersChange={setSearchFilters}
          onSearch={handleSearch}
          hasMore={hasMoreResults}
        />
      </div>
    </div>
  )
}
