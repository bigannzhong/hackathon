"use client"

import type React from "react"
import { cn } from "@/lib/utils"

/**
 * An individual tab item component for use within a Tabs container.
 * @param {object} props - Component props.
 * @param {string} props.label - The text label for the tab.
 * @param {React.ElementType} [props.icon] - Optional Lucide React icon component to display before the label.
 * @param {boolean} props.isActive - Whether this tab is currently active.
 * @param {() => void} props.onClick - Callback function when the tab is clicked.
 */
interface TabItemProps {
  label: string
  icon?: React.ElementType
  isActive: boolean
  onClick: () => void
}

export function TabItem({ label, icon: Icon, isActive, onClick }: TabItemProps) {
  const baseClasses =
    "min-h-[48px] min-w-[40px] flex items-center justify-center px-4 py-2 cursor-pointer relative transition-colors duration-200"

  const stateClasses = isActive
    ? "text-[#191919] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#191919]"
    : "text-[#707070] hover:text-[#191919] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#CCCCCC]"

  return (
    <button onClick={onClick} className={cn(baseClasses, stateClasses)} role="tab" aria-selected={isActive}>
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      <span>{label}</span>
    </button>
  )
}
