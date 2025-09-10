"use client"
import { X } from "lucide-react"
import { Button } from "./button"
import { Radio } from "./radio"
import type { SearchStyle, ResponseStyle } from "../hooks/use-search-style"

interface SearchSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  searchStyle: SearchStyle
  responseStyle: ResponseStyle
  onSearchStyleChange: (style: SearchStyle) => void
  onResponseStyleChange: (style: ResponseStyle) => void
}

export function SearchSettingsModal({
  isOpen,
  onClose,
  searchStyle,
  responseStyle,
  onSearchStyleChange,
  onResponseStyleChange,
}: SearchSettingsModalProps) {
  const searchStyles = [
    {
      id: "exact" as SearchStyle,
      label: "Exact",
      description: "Find results that match your request as closely as possible, with minimal variation.",
      isRecommended: false,
    },
    {
      id: "balanced" as SearchStyle,
      label: "Balanced",
      description: "Get mostly matching results plus a few related ideas for inspiration.",
      isRecommended: true,
    },
    {
      id: "creative" as SearchStyle,
      label: "Creative",
      description: "Explore looser interpretations for broader, more unexpected options.",
      isRecommended: false,
    },
  ]

  const responseStyles = [
    {
      id: "conversational" as ResponseStyle,
      label: "Conversational",
      description: "Friendly, casual tone with light suggestions and prompts for exploration.",
    },
    {
      id: "inquisitive" as ResponseStyle,
      label: "Inquisitive",
      description: "Asks clarifying questions to uncover more possibilities and spark ideas.",
    },
    {
      id: "direct" as ResponseStyle,
      label: "Direct",
      description: "Straight to the point, minimal extra commentary.",
    },
    {
      id: "detailed" as ResponseStyle,
      label: "Detailed",
      description: "Thorough, descriptive responses with relevant context for each result.",
    },
  ]

  const handleSearchStyleChange = (style: SearchStyle) => {
    onSearchStyleChange(style)
  }

  const handleResponseStyleChange = (style: ResponseStyle) => {
    onResponseStyleChange(style)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#191919]">Personalisation</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#191919] mb-4">Search intent</h3>
            <div className="space-y-1">
              {searchStyles.map((style) => (
                <Radio
                  key={style.id}
                  id={`search-style-${style.id}`}
                  name="search-style"
                  label={style.label}
                  description={style.description}
                  checked={searchStyle === style.id}
                  onChange={() => handleSearchStyleChange(style.id)}
                  isRecommended={style.isRecommended}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#191919] mb-4">Response style</h3>
            <div className="space-y-1">
              {responseStyles.map((style) => (
                <Radio
                  key={style.id}
                  id={`response-style-${style.id}`}
                  name="response-style"
                  label={style.label}
                  description={style.description}
                  checked={responseStyle === style.id}
                  onChange={() => handleResponseStyleChange(style.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-start gap-3 p-6 border-t border-gray-200">
          <Button variant="primary" onClick={onClose} className="!bg-[#9CEE69] !text-[#1A4200]">
            Save settings
          </Button>
          <Button variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
