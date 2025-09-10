import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"

/**
 * A component to display the Envato logo in light or dark versions.
 * @param {object} props - Component props.
 * @param {number} [props.width] - The width of the logo.
 * @param {number} [props.height] - The height of the logo.
 * @param {'light' | 'dark'} [props.variant] - The color variant of the logo text. Defaults to 'dark'.
 * @param {string} [props.className] - Additional CSS classes for the container.
 */
interface LogoProps {
  width?: number
  height?: number
  variant?: "light" | "dark"
  className?: string
}

export function Logo({ width = 100, height = 24, variant = "dark", className }: LogoProps) {
  const logoSrc = variant === "light" ? "/images/envato-logo-light.svg" : "/images/envato-logo-dark.png"
  const altText = variant === "light" ? "Envato Logo Light" : "Envato Logo Dark"

  return (
    <Link href="/dashboard" className={cn("flex items-center", className)}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt={altText}
        width={width}
        height={height}
        className="object-contain" // Keep object-contain for aspect ratio, but remove h-full
      />
    </Link>
  )
}
