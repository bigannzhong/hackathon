"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { TextField } from "./text-field"
import { Button } from "./button"
import { DropdownMenu } from "./dropdown-menu"
import { cn } from "@/lib/utils"

/**
 * The main search bar component with a category dropdown and search input.
 */
export function MainSearchBar() {
  const [selectedCategory, setSelectedCategory] = useState("Fonts")
  const [searchValue, setSearchValue] = useState("")

  const categories = ["Fonts", "All items", "Photos", "Videos", "Audio"]

  const dropdownItems = categories.map((category) => ({
    label: category,
    onClick: () => setSelectedCategory(category),
  }))

  return (
    // Re-added max-w-2xl
    <div className={cn("flex items-center", "bg-[#3D3D3D] rounded-full h-10 px-4 w-full max-w-2xl")}>
      {/* Category Dropdown using Button and DropdownMenu */}
      <DropdownMenu
        trigger={
          <Button
            variant="tertiary"
            iconTrailing={ChevronDown}
            // Override button styles to fit within the search bar and match its dark theme
            className="!bg-transparent !text-white !hover:bg-gray-800 !h-8 !px-2 !py-0 !text-sm"
          >
            {selectedCategory}
          </Button>
        }
        items={dropdownItems}
      />

      {/* Search Input - now transparent and borderless, relying on parent's styling */}
      <div className="flex-1 relative flex items-center">
        <TextField
          id="main-search"
          label="" // Label is visually handled by the placeholder
          placeholder="Search"
          value={searchValue}
          onChange={setSearchValue}
          leadingIcon={Search}
          inputClassName="
            !bg-transparent !border-none !shadow-none !py-0 !text-white !placeholder:text-gray-400
            !h-8 !pl-8 !pr-2 // Adjusted padding for icon and text within the transparent input
          "
        />
      </div>
    </div>
  )
}
