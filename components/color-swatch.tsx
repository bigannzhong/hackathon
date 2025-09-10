"use client"

import { cn } from "@/lib/utils"

/**
 * A component to display a color swatch, typically used in color filters.
 * @param {object} props - Component props.
 * @param {string} props.color - The Tailwind CSS background color class (e.g., 'bg-red-500' or a hex color).
 * @param {boolean} props.isSelected - Whether the color swatch is currently selected.
 * @param {() => void} props.onClick - Callback function when the swatch is clicked.
 * @param {string} [props.label] - An optional label for accessibility.
 */
interface ColorSwatchProps {
  color: string
  isSelected: boolean
  onClick: () => void
  label?: string
}

export function ColorSwatch({ color, isSelected, onClick, label }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-12 h-12 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
        color,
        isSelected ? "ring-2 ring-black ring-offset-2 scale-110" : "hover:scale-105",
      )}
      aria-label={label || `Select color ${color.replace("bg-", "")}`}
      aria-pressed={isSelected}
    />
  )
}
