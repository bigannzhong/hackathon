"use client"

import { Chip } from "./chip"

interface SuggestionPillsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

export function SuggestionPills({ suggestions, onSuggestionClick }: SuggestionPillsProps) {
  if (!suggestions || suggestions.length === 0) {
    return null
  }

  return (
    <div className="px-6 py-3 border-t border-gray-100">
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 3).map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="transition-transform hover:scale-105"
          >
            <Chip size="medium">{suggestion}</Chip>
          </button>
        ))}
      </div>
    </div>
  )
}
