"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * A tooltip component that displays content on hover.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The element that triggers the tooltip.
 * @param {string} props.content - The text content to display in the tooltip.
 */
interface TooltipProps {
  children: React.ReactNode
  content: string
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby="tooltip-content"
      >
        {children}
      </div>
      {isVisible && (
        <div
          id="tooltip-content"
          role="tooltip"
          className={cn(
            "absolute z-30 px-3 py-1.5 text-sm font-medium text-white bg-[#191919] rounded-md shadow-lg",
            "bottom-full left-1/2 -translate-x-1/2 mb-2", // Position above and center
            "after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#191919]", // Dark arrow
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
