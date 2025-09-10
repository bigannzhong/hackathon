"use client"

import type React from "react"
import { Button } from "./button"
import { X } from "lucide-react"

/**
 * A sidebar component for displaying filter options.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The filter sections to display within the sidebar.
 * @param {() => void} props.onToggleFilters - Callback function to toggle the visibility of the sidebar.
 */
interface FilterSidebarProps {
  children: React.ReactNode
  onToggleFilters: () => void
}

export function FilterSidebar({ children, onToggleFilters }: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0 bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
        <Button
          variant="tertiary"
          iconLeading={X}
          onClick={onToggleFilters}
          className="!text-[#191919] !h-10 !px-4 !py-0"
          aria-label="Hide Filters"
        >
          Hide Filters
        </Button>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </aside>
  )
}
