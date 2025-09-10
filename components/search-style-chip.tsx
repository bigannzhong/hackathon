"use client"
import Image from "next/image"
import { Edit3, Trash2 } from "lucide-react"
import { DropdownMenu } from "./dropdown-menu"
import type { SearchStyle } from "../hooks/use-search-style"

interface SearchStyleChipProps {
  searchStyle: SearchStyle
  onEdit: () => void
  onReset: () => void
}

const SEARCH_STYLE_LABELS = {
  exact: "Exact",
  balanced: "Balanced",
  creative: "Creative",
}

export function SearchStyleChip({ searchStyle, onEdit, onReset }: SearchStyleChipProps) {
  const styleLabel = SEARCH_STYLE_LABELS[searchStyle]

  const chipActions = [
    {
      label: "Edit search style",
      icon: Edit3,
      onClick: onEdit,
    },
    {
      label: "Reset to balanced", // Changed from "Reset to exact" to "Reset to balanced"
      icon: Trash2,
      onClick: onReset,
    },
  ]

  return (
    <DropdownMenu
      trigger={
        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F0F1FF] text-[#4F5CE8] text-xs rounded-full hover:bg-[#E6E7FF] focus:outline-none focus:ring-2 focus:ring-[#4F5CE8] focus:ring-offset-1 transition-colors">
          <Image src="/icons/searchstyle.svg" alt="Search style" width={16} height={16} />
          <span className="font-medium">{styleLabel} search</span>
        </button>
      }
      items={chipActions}
      customContent={
        <div className="p-4 w-80">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#191919]">Search Style</h3>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
              <strong>{styleLabel}:</strong>{" "}
              {searchStyle === "exact" &&
                "Find results that match your request as closely as possible, with minimal variation."}
              {searchStyle === "balanced" && "Get mostly matching results plus a few related ideas for inspiration."}
              {searchStyle === "creative" && "Explore looser interpretations for broader, more unexpected options."}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#191919] hover:bg-gray-100 rounded-md transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Reset to Balanced {/* Changed from "Reset" to "Reset to Balanced" */}
            </button>
          </div>
        </div>
      }
    />
  )
}
