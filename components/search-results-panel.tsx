"use client"

import { useState, useEffect } from "react"
import { EnhancedPhotoFiltersBar } from "./enhanced-photo-filters-bar"
import { PhotoGrid } from "./photo-grid"
import { KeywordSearchInput } from "./keyword-search-input"

interface SearchResultsPanelProps {
  results: any[]
  isLoading: boolean
  query: string
  filters: any
  error?: string | null
  onFiltersChange: (filters: any) => void
  onSearch: (query: string, filters: any, page?: number) => void
}

export function SearchResultsPanel({
  results,
  isLoading,
  query,
  filters,
  error,
  onFiltersChange,
  onSearch,
}: SearchResultsPanelProps) {
  const [currentKeywords, setCurrentKeywords] = useState("")
  const [lastAiKeywords, setLastAiKeywords] = useState("")
  const [isManualSearch, setIsManualSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [allResults, setAllResults] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Update keywords when AI search happens
  useEffect(() => {
    if (query && !isManualSearch) {
      setCurrentKeywords(query) // This should be the searchQuery from compose API
      setLastAiKeywords(query)
      // Reset pagination for new searches
      setCurrentPage(1)
      setAllResults(results)
    } else if (isManualSearch) {
      // For manual searches, also reset pagination
      setCurrentPage(1)
      setAllResults(results)
    }
    // Reset manual search flag after processing
    setIsManualSearch(false)
  }, [query, isManualSearch, results])

  // Update hasMore when results change
  useEffect(() => {
    // Assume there are more results if we got exactly 32 results
    setHasMore(results.length === 32)
  }, [results])

  const handleFiltersChange = (newFilters: any) => {
    onFiltersChange(newFilters)
    if (query) {
      setCurrentPage(1)
      onSearch(query, newFilters, 1)
    }
  }

  const handleKeywordSearch = async (keywords: string) => {
    setIsManualSearch(true)
    setCurrentKeywords(keywords)
    setCurrentPage(1)

    // Trigger search with current filters
    onSearch(keywords, filters, 1)
  }

  const handleLoadMore = async () => {
    if (!query || isLoadingMore) return

    setIsLoadingMore(true)
    const nextPage = currentPage + 1

    try {
      // Call search API directly for pagination
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          filters,
          page: nextPage,
        }),
      })

      const data = await response.json()

      if (response.ok && data.results) {
        // Append new results to existing ones
        setAllResults((prev) => [...prev, ...data.results])
        setCurrentPage(nextPage)
        setHasMore(data.results.length === 32)
      }
    } catch (error) {
      console.error("Failed to load more results:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header with Envato logo, search bar, and profile */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          {/* Left: Envato Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.png" alt="Envato" className="h-6" />
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-4xl mx-6">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-1">
              <div className="flex-1">
                <KeywordSearchInput
                  value={currentKeywords}
                  lastAiKeywords={lastAiKeywords}
                  onSearch={handleKeywordSearch}
                  placeholder="Keywords search"
                />
              </div>
            </div>
          </div>

          {/* Right: Profile Icon */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="mt-4">
          <EnhancedPhotoFiltersBar filters={filters} searchQuery={query} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Results grid */}
      <div className="flex-1 overflow-y-auto">
        <PhotoGrid
          photos={allResults}
          isLoading={isLoading}
          hasQuery={!!query}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      </div>
    </div>
  )
}
