"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu } from "./dropdown-menu"
import type { DetectedFilter } from "../utils/filter-detection"

interface DynamicFilterDropdownProps {
  filter: DetectedFilter
  value: string
  onChange: (value: string) => void
}

export function DynamicFilterDropdown({ filter, value, onChange }: DynamicFilterDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(value || filter.preSelected || "All")

  useEffect(() => {
    // Auto-select pre-detected value on mount
    if (filter.preSelected && !value) {
      setSelectedValue(filter.preSelected)
      onChange(filter.preSelected)
    }
  }, [filter.preSelected, value, onChange])

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onChange(newValue)
  }

  // Create dropdown items with "All" option
  const dropdownItems = [
    {
      label: "All",
      onClick: () => handleValueChange("All"),
    },
    ...filter.options.map((option) => ({
      label: option,
      onClick: () => handleValueChange(option),
    })),
  ]

  return (
    <DropdownMenu
      trigger={
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
          <span className="text-sm">{filter.label}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      }
      items={dropdownItems}
    />
  )
}
