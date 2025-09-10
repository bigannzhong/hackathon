import type React from "react"
import { cn } from "@/lib/utils"

/**
 * A customizable badge component for displaying status or categorization.
 * @param {object} props - Component props.
 * @param {'positive' | 'neutral'} props.type - The type of badge (determines color).
 * @param {'filled' | 'outline'} props.variant - The visual variant of the badge.
 * @param {React.ReactNode} props.children - The content of the badge.
 * @param {string} [props.className] - Additional CSS classes for the badge container.
 */
interface BadgeProps {
  type: "positive" | "neutral" | "info" | "caution" | "critical" | "promotion"
  variant?: "filled" | "outline" // Keep variant optional, default to filled if not provided for new types
  children: React.ReactNode
  className?: string // Added className prop for external styling
}

export function Badge({ type, variant, children, className }: BadgeProps) {
  // Adjusted padding to px-2.5 py-0.5 for a more compact pill shape, matching the image
  const baseClasses = "inline-flex items-center px-2.5 text-[14px] font-semibold rounded-full py-0.5"

  const typeClasses = {
    positive: {
      filled: "bg-lime-500 text-white",
      outline: "bg-lime-100 text-lime-800",
    },
    neutral: {
      filled: "bg-[#F9F9F9] text-[#191919]", // New hex colors for filled neutral
      outline: "bg-gray-100 text-gray-800", // Existing for outline neutral
    },
    info: {
      filled: "bg-[#F0F1FF] text-[#4F5CE8]",
      outline: "bg-[#F0F1FF] text-[#4F5CE8]", // Fallback to filled
    },
    caution: {
      filled: "bg-[#FFF5ED] text-[#C24100]",
      outline: "bg-[#FFF5ED] text-[#C24100]", // Fallback
    },
    critical: {
      filled: "bg-[#FFECF2] text-[#B9004B]",
      outline: "bg-[#FFECF2] text-[#B9004B]", // Fallback
    },
    promotion: {
      filled: "bg-[#9CEE69] text-[#191919]", // New hex color, assuming dark text for contrast
      outline: "bg-[#9CEE69] text-[#191919]", // Fallback
    },
  }

  const currentVariant = variant || "filled" // Default to 'filled' if variant is not provided

  return <span className={cn(baseClasses, typeClasses[type][currentVariant], className)}>{children}</span>
}
