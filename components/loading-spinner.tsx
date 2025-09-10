import { cn } from "@/lib/utils"

/**
 * A simple loading spinner component.
 * @param {object} props - Component props.
 * @param {number} [props.size] - The size of the spinner in pixels.
 */
interface LoadingSpinnerProps {
  size?: number
}

export function LoadingSpinner({ size = 32 }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-t-2 border-gray-300 border-t-black",
        `w-${size / 4} h-${size / 4}`, // Tailwind classes for w-8 h-8 etc.
      )}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
