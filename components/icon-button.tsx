import type React from "react"
import { cn } from "@/lib/utils"

/**
 * A customizable icon button component with different visual variants.
 * @param {object} props - Component props.
 * @param {React.ElementType} props.icon - The Lucide React icon component to display.
 * @param {'default' | 'transparent' | 'circle'} props.variant - The visual variant of the icon button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - Additional button attributes.
 */
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType
  variant?: "default" | "transparent" | "circle"
  size?: "default" | "small" // Add size prop
}

export function IconButton({ icon: Icon, variant = "default", size = "default", className, ...rest }: IconButtonProps) {
  const baseClasses =
    "flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const sizeClasses = {
    default: "w-12 h-12 min-h-12",
    small: "w-12 h-12 min-h-12", // Updated to 48px for image card buttons
  }

  const iconSizeClasses = {
    default: "w-6 h-6",
    small: "w-6 h-6", // Icon size for 48px button
  }

  const variantStyles = {
    default: {
      className: "bg-[rgba(25,25,25,0.7)] text-white focus:ring-gray-500",
      style: { borderRadius: "4px" },
    },
    transparent: {
      className: "bg-transparent text-gray-800 focus:ring-gray-400",
      style: { borderRadius: "4px" },
    },
    circle: {
      className: "bg-white border border-[#CCCCCC] rounded-full text-gray-800 focus:ring-gray-400",
      style: {}, // No specific inline style needed as rounded-full handles it
    },
  }

  const { className: variantClassName, style: variantStyle } = variantStyles[variant]

  return (
    <button className={cn(baseClasses, sizeClasses[size], variantClassName, className)} style={variantStyle} {...rest}>
      <Icon className={cn(iconSizeClasses[size])} />
    </button>
  )
}
