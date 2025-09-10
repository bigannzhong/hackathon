"use client"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A custom checkbox component.
 * @param {object} props - Component props.
 * @param {string} props.label - The label for the checkbox.
 * @param {boolean} props.checked - Whether the checkbox is checked.
 * @param {(checked: boolean) => void} props.onChange - Callback when the checkbox state changes.
 * @param {string} props.id - Unique ID for the checkbox and label.
 */
interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  id: string
}

export function Checkbox({ label, checked, onChange, id }: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2 min-h-12 py-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only" // Hide native checkbox
        aria-checked={checked}
        role="checkbox"
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "4px",
          }}
          className={cn(
            "border-2 flex items-center justify-center transition-all duration-200",
            checked ? "bg-black border-black" : "bg-white border-gray-400",
          )}
          aria-hidden="true"
        >
          {checked && <Check className="w-4 h-4 text-white" />}
        </div>
        <span className="ml-2 text-base font-normal text-gray-800">{label}</span>
      </label>
    </div>
  )
}
