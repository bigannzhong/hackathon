"\"use client"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A custom select dropdown component.
 * @param {object} props - Component props.
 * @param {string} props.label - The label for the select input.
 * @param {string[]} props.options - An array of string options for the dropdown.
 * @param {string} props.value - The currently selected value.
 * @param {(value: string) => void} props.onChange - Callback when the selected value changes.
 * @param {string} props.id - Unique ID for the select and label.
 */
interface SelectProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  id: string
}

export function Select({ label, options, value, onChange, id }: SelectProps) {
  return (
    <div className="relative w-full max-w-xs">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm",
            "cursor-pointer", // Indicate it's clickable
          )}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
