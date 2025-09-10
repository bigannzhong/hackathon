"use client"

import { usePathname } from "next/navigation"
import { FloatingToggle } from "@/components/floating-toggle"

export function ConditionalFloatingToggle() {
  const pathname = usePathname()

  // Only show the toggle on chat and canvas pages, not on the homepage
  const shouldShowToggle = pathname.startsWith("/chat") || pathname.startsWith("/project-canvas")

  if (!shouldShowToggle) {
    return null
  }

  return <FloatingToggle />
}
