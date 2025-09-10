import type React from "react"
import { cn } from "@/lib/utils"

/**
 * A customizable button component with different visual variants and optional icons.
 * @param {object} props - Component props.
 * @param {'primary' | 'secondary' | 'tertiary' | 'neutral'} props.variant - The visual variant of the button.
 * @param {React.ReactNode} props.children - The content of the button (label).
 * @param {React.ElementType} [props.iconLeading] - Optional icon component to display before the label.
 * @param {React.ElementType} [props.iconTrailing] - Optional icon component to display after the label.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - Additional button attributes.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "tertiary" | "neutral"
  children: React.ReactNode
  iconLeading?: React.ElementType
  iconTrailing?: React.ElementType
}

export function Button({
  variant,
  children,
  className,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  disabled,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center gap-2 h-12 px-6 py-2 rounded-md font-poly-median text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: cn(
      "bg-brand-green text-brand-content-primary focus:ring-brand-green",
      disabled ? "bg-brand-green-disabled cursor-not-allowed opacity-60" : "hover:bg-brand-green-hover",
    ),
    secondary: cn(
      "border border-brand-content-primary text-brand-content-primary focus:ring-brand-content-primary",
      disabled
        ? "border-brand-content-secondary text-brand-content-secondary cursor-not-allowed opacity-60"
        : "hover:bg-brand-content-primary hover:text-white",
    ),
    tertiary: cn(
      "bg-transparent text-brand-content-primary focus:ring-brand-content-primary",
      disabled ? "text-brand-content-secondary cursor-not-allowed opacity-60" : "hover:bg-gray-100",
    ),
    neutral: cn(
      "bg-brand-content-primary text-white focus:ring-brand-content-primary",
      disabled ? "bg-brand-content-secondary cursor-not-allowed opacity-60" : "hover:bg-gray-700",
    ),
  }

  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} disabled={disabled} {...rest}>
      {IconLeading && <IconLeading className="w-5 h-5" />}
      {children}
      {IconTrailing && <IconTrailing className="w-5 h-5" />}
    </button>
  )
}
