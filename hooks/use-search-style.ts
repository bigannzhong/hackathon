"use client"

import { useState, useEffect } from "react"

export type SearchStyle = "exact" | "balanced" | "creative"
export type ResponseStyle = "conversational" | "inquisitive" | "direct" | "detailed"

const SEARCH_STYLE_STORAGE_KEY = "envato-search-style"
const RESPONSE_STYLE_STORAGE_KEY = "envato-response-style"

export function useSearchStyle() {
  const [searchStyle, setSearchStyle] = useState<SearchStyle>("balanced") // Changed from "exact" to "balanced"
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>("conversational")

  // Load search style from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSearchStyle = sessionStorage.getItem(SEARCH_STYLE_STORAGE_KEY) as SearchStyle
      if (savedSearchStyle && ["exact", "balanced", "creative"].includes(savedSearchStyle)) {
        setSearchStyle(savedSearchStyle)
      }

      const savedResponseStyle = sessionStorage.getItem(RESPONSE_STYLE_STORAGE_KEY) as ResponseStyle
      if (savedResponseStyle && ["conversational", "inquisitive", "direct", "detailed"].includes(savedResponseStyle)) {
        setResponseStyle(savedResponseStyle)
      }
    }
  }, [])

  // Save styles to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SEARCH_STYLE_STORAGE_KEY, searchStyle)
    }
  }, [searchStyle])

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(RESPONSE_STYLE_STORAGE_KEY, responseStyle)
    }
  }, [responseStyle])

  const updateSearchStyle = (newStyle: SearchStyle) => {
    setSearchStyle(newStyle)
  }

  const updateResponseStyle = (newStyle: ResponseStyle) => {
    setResponseStyle(newStyle)
  }

  return {
    searchStyle,
    responseStyle,
    updateSearchStyle,
    updateResponseStyle,
  }
}
