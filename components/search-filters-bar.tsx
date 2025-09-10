"use client"

import { Select } from "./select"

interface SearchFiltersBarProps {
  filters: {
    category: string
    subcategory: string
    orientation: string
    resolution: string
  }
  onFiltersChange: (filters: any) => void
}

export function SearchFiltersBar({ filters, onFiltersChange }: SearchFiltersBarProps) {
  // Provide default values if filters is undefined or missing properties
  const safeFilters = {
    category: filters?.category || "photos",
    subcategory: filters?.subcategory || "all",
    orientation: filters?.orientation || "all",
    resolution: filters?.resolution || "all",
  }

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...safeFilters,
      [key]: value,
    })
  }

  return (
    <div className="flex gap-4">
      <Select
        id="category"
        label=""
        options={["Photos", "Graphics", "Videos"]}
        value={safeFilters.category.charAt(0).toUpperCase() + safeFilters.category.slice(1)}
        onChange={(value) => handleFilterChange("category", value.toLowerCase())}
      />

      <Select
        id="subcategory"
        label=""
        options={["All", "Business", "People", "Nature", "Technology", "Lifestyle"]}
        value={safeFilters.subcategory.charAt(0).toUpperCase() + safeFilters.subcategory.slice(1)}
        onChange={(value) => handleFilterChange("subcategory", value.toLowerCase())}
      />

      <Select
        id="orientation"
        label=""
        options={["All orientations", "Horizontal", "Vertical", "Square"]}
        value={
          safeFilters.orientation === "all"
            ? "All orientations"
            : safeFilters.orientation.charAt(0).toUpperCase() + safeFilters.orientation.slice(1)
        }
        onChange={(value) =>
          handleFilterChange("orientation", value === "All orientations" ? "all" : value.toLowerCase())
        }
      />

      <Select
        id="resolution"
        label=""
        options={["All resolutions", "Small", "Medium", "Large", "Extra Large"]}
        value={
          safeFilters.resolution === "all"
            ? "All resolutions"
            : safeFilters.resolution.charAt(0).toUpperCase() + safeFilters.resolution.slice(1)
        }
        onChange={(value) =>
          handleFilterChange("resolution", value === "All resolutions" ? "all" : value.toLowerCase())
        }
      />
    </div>
  )
}
