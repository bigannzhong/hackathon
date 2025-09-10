"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Dices, X } from "lucide-react"
import { Tooltip } from "./tooltip"

interface KeywordSearchInputProps {
  value: string
  lastAiKeywords: string
  onSearch: (keywords: string) => void
  placeholder?: string
}

export function KeywordSearchInput({
  value,
  lastAiKeywords,
  onSearch,
  placeholder = "Keywords search",
}: KeywordSearchInputProps) {
  const [keywords, setKeywords] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [hasUserEdited, setHasUserEdited] = useState(false)
  const [isRandomizing, setIsRandomizing] = useState(false)
  const [randomVariations, setRandomVariations] = useState<string[]>([])
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Words to filter out from keywords - be more conservative
  const FILTER_WORDS = new Set([
    "photo",
    "photos",
    "image",
    "images",
    "picture",
    "pictures",
    "stock",
    "royalty",
    "free",
    "download",
    // Removed "high" and "quality" as these might be legitimate search terms
  ])

  // Common phrases that should stay together
  const COMMON_PHRASES = [
    "black and white",
    "black & white",
    "high resolution",
    "low angle",
    "wide angle",
    "close up",
    "top view",
    "side view",
    "front view",
    "bird eye view",
    "golden hour",
    "blue hour",
    "depth of field",
    "shallow focus",
    "natural light",
    "artificial light",
    "soft light",
    "hard light",
    "warm tone",
    "cool tone",
    "vintage style",
    "modern style",
    "minimalist style",
  ]

  // Smart keyword parsing that preserves meaningful phrases
  const parseKeywords = (keywordString: string): string[] => {
    if (!keywordString.trim()) return []

    let remaining = keywordString.toLowerCase().trim()
    const extractedKeywords: string[] = []

    // First, extract known phrases
    for (const phrase of COMMON_PHRASES) {
      const regex = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")
      if (regex.test(remaining)) {
        extractedKeywords.push(phrase)
        remaining = remaining.replace(regex, " ").trim()
      }
    }

    // Then split remaining text by common delimiters
    const remainingWords = remaining
      .split(/[,;]+/) // Split by commas and semicolons first
      .flatMap((part) => part.trim().split(/\s+/)) // Then by spaces
      .map((word) => word.trim())
      .filter((word) => {
        // Only filter out words that are definitely not useful for search
        return word.length > 0 && !FILTER_WORDS.has(word.toLowerCase())
      })

    // Add remaining meaningful words
    extractedKeywords.push(...remainingWords)

    // Remove duplicates and empty strings, preserve original casing where possible
    return [...new Set(extractedKeywords.filter((k) => k.trim().length > 0))]
  }

  // Convert keywords array back to string
  const keywordsToString = (keywordArray: string[]): string => {
    return keywordArray.join(", ")
  }

  // Update keywords when value changes (only if user hasn't manually edited)
  useEffect(() => {
    if (!hasUserEdited && value) {
      const newKeywords = parseKeywords(value)
      setKeywords(newKeywords)
      // Reset variations when new AI keywords come in
      setRandomVariations([])
      setCurrentVariationIndex(0)
    }
  }, [value, hasUserEdited])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addKeyword(inputValue.trim())
    }
  }

  const addKeyword = (keyword: string) => {
    // Parse the input to handle potential phrases
    const newKeywordsParsed = parseKeywords(keyword)
    const combinedKeywords = [...keywords, ...newKeywordsParsed]
    // Remove duplicates
    const uniqueKeywords = [...new Set(combinedKeywords)]

    setKeywords(uniqueKeywords)
    setInputValue("")
    onSearch(keywordsToString(uniqueKeywords))
    setHasUserEdited(true)
    // Clear variations when user manually edits
    setRandomVariations([])
    setCurrentVariationIndex(0)
  }

  const removeKeyword = (indexToRemove: number) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove)
    setKeywords(newKeywords)
    onSearch(keywordsToString(newKeywords))
    setHasUserEdited(true)
    // Clear variations when user manually edits
    setRandomVariations([])
    setCurrentVariationIndex(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputValue.trim()) {
        addKeyword(inputValue.trim())
      }
    } else if (e.key === "Backspace" && !inputValue && keywords.length > 0) {
      // Remove last keyword if input is empty and backspace is pressed
      removeKeyword(keywords.length - 1)
    } else if (e.key === ",") {
      e.preventDefault()
      if (inputValue.trim()) {
        addKeyword(inputValue.trim())
      }
    }
  }

  const handleFocus = () => {
    // Only restore if we have no keywords and there are last AI keywords
    if (keywords.length === 0 && lastAiKeywords && !hasUserEdited) {
      const restoredKeywords = parseKeywords(lastAiKeywords)
      setKeywords(restoredKeywords)
      setHasUserEdited(false)
    }
  }

  const handleRandomize = async () => {
    // Don't randomize if no keywords exist
    if (keywords.length === 0) {
      return
    }

    setIsRandomizing(true)

    try {
      const currentKeywordString = keywordsToString(keywords)

      // If we already have variations, cycle through them
      if (randomVariations.length > 0) {
        const nextIndex = (currentVariationIndex + 1) % randomVariations.length
        setCurrentVariationIndex(nextIndex)
        const nextVariation = randomVariations[nextIndex]
        const newKeywords = parseKeywords(nextVariation)
        setKeywords(newKeywords)
        onSearch(nextVariation)
        setHasUserEdited(true)
        return
      }

      // Generate new variations
      const response = await fetch("/api/randomize-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: currentKeywordString }),
      })

      const data = await response.json()

      if (data.variations && data.variations.length > 0) {
        setRandomVariations(data.variations)
        setCurrentVariationIndex(0)
        const firstVariation = data.variations[0]
        const newKeywords = parseKeywords(firstVariation)
        setKeywords(newKeywords)
        onSearch(firstVariation)
        setHasUserEdited(true)
      }
    } catch (error) {
      console.error("Failed to randomize keywords:", error)
    } finally {
      setIsRandomizing(false)
    }
  }

  const handleDiceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleRandomize()
    }
  }

  const hasContent = keywords.length > 0 || inputValue.trim()

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative min-h-[40px] rounded-md">
        <div className="flex items-center flex-wrap gap-1 p-1">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />

          {/* Keyword Chips */}
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 bg-[#191919] text-white text-sm px-3 py-1 rounded-full"
            >
              <span>{keyword}</span>
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="hover:bg-gray-700 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                aria-label={`Remove ${keyword}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Input for new keywords */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={keywords.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm py-1"
          />

          {/* Dice/Randomize Button */}
          {hasContent && (
            <Tooltip content="Randomize keywords">
              <button
                type="button"
                onClick={handleRandomize}
                onKeyDown={handleDiceKeyDown}
                disabled={isRandomizing}
                className="flex-shrink-0 p-1 rounded hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ml-1 transition-colors"
                aria-label="Randomize keywords"
                tabIndex={0}
              >
                <Dices
                  className={`w-4 h-4 text-black hover:text-white transition-colors ${
                    isRandomizing ? "animate-spin" : ""
                  }`}
                />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </form>
  )
}
