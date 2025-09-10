import type React from "react"
import NextLink from "next/link"
import { cn } from "@/lib/utils"

/**
 * A simple link component.
 * @param {object} props - Component props.
 * @param {string} props.href - The URL the link points to.
 * @param {React.ReactNode} props.children - The content of the link.
 * @param {string} [props.className] - Additional CSS classes.
 */
interface LinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function Link({ href, children, className }: LinkProps) {
  return (
    <NextLink
      href={href}
      className={cn("text-gray-800 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-300", className)}
    >
      {children}
    </NextLink>
  )
}
