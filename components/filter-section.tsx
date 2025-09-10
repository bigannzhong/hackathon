import type React from "react"
import { Divider } from "./divider"

/**
 * A section component for grouping filter options.
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the filter section.
 * @param {React.ReactNode} props.children - The filter options to display within the section.
 * @param {boolean} [props.showDivider=true] - Whether to show a divider below the title.
 */
interface FilterSectionProps {
  title: string
  children: React.ReactNode
  showDivider?: boolean
}

export function FilterSection({ title, children, showDivider = true }: FilterSectionProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
      {showDivider && <Divider className="my-6" />}
    </div>
  )
}
