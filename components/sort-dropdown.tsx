"use client"

import { Select } from "./select"

/**
 * A dropdown component for sorting options, wrapping the Select component.
 * @param {object} props - Component props.
 * @param {string[]} props.options - An array of string options for the dropdown.
 * @param {string} props.value - The currently selected value.
 * @param {(value: string) => void} props.onChange - Callback when the selected value changes.
 */
interface SortDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function SortDropdown({ options, value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Sort by</span>
      <div className="relative">
        <Select
          id="sort-options"
          label="" // Label is handled by the "Sort by" span
          options={options}
          value={value}
          onChange={onChange}
        />
        {/* The Select component already includes a ChevronDown icon, so we don't need to add another one here */}
      </div>
    </div>
  )
}
