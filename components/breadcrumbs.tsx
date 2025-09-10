import React from "react"
import { cn } from "@/lib/utils"
import { Link } from "./link" // Assuming Link component is available and handles basic href

/**
 * A breadcrumbs component for navigation paths.
 * @param {object} props - Component props.
 * @param {Array<{ label: string; href: string }>} props.items - An array of breadcrumb items.
 */
interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm min-h-[24px]">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className={cn(
              "text-[#707070] hover:underline focus:outline-none focus:ring-2 focus:ring-gray-300",
              index === items.length - 1
                ? "text-[#191919] font-normal hover:no-underline" // Last item is black, no underline on hover
                : "hover:text-[#191919]", // Other items turn black and underline on hover
            )}
          >
            {item.label}
          </Link>
          {index < items.length - 1 && (
            <span className="text-[#B037A6] mx-2" aria-hidden="true">
              {"»"}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
