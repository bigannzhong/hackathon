import type React from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "./link"

/**
 * A section component for displaying horizontally scrollable content.
 * @param {object} props - Component props.
 * @param {string} props.title - The main title of the section.
 * @param {string} [props.description] - Optional descriptive text for the section.
 * @param {React.ReactNode} props.children - The scrollable content (e.g., a grid of cards).
 * @param {string} [props.linkText] - Text for the "See all" link.
 * @param {string} [props.linkHref] - Href for the "See all" link.
 */
interface HorizontalScrollSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  linkText?: string
  linkHref?: string
}

export function HorizontalScrollSection({
  title,
  description,
  children,
  linkText = "Show all",
  linkHref = "#",
}: HorizontalScrollSectionProps) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191919]">{title}</h2>
          {description && <p className="text-gray-700 text-base">{description}</p>}
        </div>
        <Link href={linkHref} className="flex items-center gap-1 text-[#191919] hover:underline">
          {linkText} <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-4 py-2 scrollbar-hide">{children}</div>
    </section>
  )
}
