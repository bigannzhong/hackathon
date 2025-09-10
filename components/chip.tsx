"use client"

import type React from "react"
import { Search, X, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A customizable chip component for tags or filters, with optional remove button and icon.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content of the chip.
 * @param {() => void} [props.onRemove] - Optional callback for when the remove button is clicked.
 * @param {'search' | 'trending' | 'none'} [props.icon] - Optional icon to display.
 * @param {'medium' | 'large'} [props.size] - The size of the chip.
 */
interface ChipProps {
  children: React.ReactNode
  onRemove?: () => void
  icon?: "search" | "trending" | "none"
  size?: "medium" | "large"
}

export function Chip({ children, onRemove, icon = "none", size = "medium" }: ChipProps) {
  const baseClasses =
    "inline-flex items-center rounded-full border transition-colors duration-200" +
    " text-[#191919] border-[#949494] bg-white" +
    " hover:bg-[#191919] hover:border-[#191919] hover:text-white"

  const sizeClasses = {
    medium: "px-4 py-1 text-sm", // 16px horizontal padding, 4px vertical padding for ~29px height
    large: "px-5 py-2 text-base", // 20px horizontal padding, 8px vertical padding for ~40px height
  }

  const IconComponent = icon === "search" ? Search : icon === "trending" ? TrendingUp : null

  return (
    <div className={cn(baseClasses, sizeClasses[size])}>
      {IconComponent && <IconComponent className={cn("w-4 h-4", size === "medium" ? "mr-1" : "mr-2")} />}
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className={cn(
            "rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300",
            size === "medium" ? "ml-2 p-0.5" : "ml-2 p-1",
          )}
          aria-label="Remove chip"
        >
          <X className={cn("text-gray-500 hover:text-white", size === "medium" ? "w-4 h-4" : "w-5 h-5")} />
        </button>
      )}
    </div>
  )
}
