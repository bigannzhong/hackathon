"use client"
import { cn } from "@/lib/utils"

/**
 * A custom radio button component.
 * @param {object} props - Component props.
 * @param {string} props.label - The label for the radio button.
 * @param {boolean} props.checked - Whether the radio button is selected.
 * @param {(checked: boolean) => void} props.onChange - Callback when the radio button state changes.
 * @param {string} props.id - Unique ID for the radio button and label.
 * @param {string} props.name - The name attribute for the radio group.
 * @param {string} props.description - Optional description for the radio button.
 */
interface RadioProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  id: string
  name: string
  description?: string // Add optional description
}

export function Radio({ label, checked, onChange, id, name, description }: RadioProps) {
  return (
    <div className="flex items-start space-x-2 min-h-12 py-0">
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only" // Hide native radio
        aria-checked={checked}
        role="radio"
      />
      <label htmlFor={id} className="flex items-start cursor-pointer">
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            marginTop: "2px", // Align with text baseline
          }}
          className={cn(
            "border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0",
            checked ? "bg-black border-black" : "bg-white border-gray-400",
          )}
          aria-hidden="true"
        >
          {checked && (
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
              className="bg-white"
            />
          )}
        </div>
        <div className="ml-3">
          <div className="flex items-center">
            <span className="text-base font-medium text-gray-800">{label}</span>
          </div>
          {description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{description}</p>}
        </div>
      </label>
    </div>
  )
}
