import { cn } from "@/lib/utils"

/**
 * A simple horizontal divider component.
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes for the divider.
 */
interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <hr className={cn("w-full border-t border-gray-300", className)} role="separator" />
}
