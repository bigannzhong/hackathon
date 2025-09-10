"use client"

import type React from "react"
import { cn } from "@/lib/utils"

/**
 * A customizable text input field component.
 * @param {object} props - Component props.
 * @param {string} props.label - The label for the input field.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {string} props.value - The current value of the input.
 * @param {(value: string) => void} props.onChange - Callback when the input value changes.
 * @param {string} props.id - Unique ID for the input and label.
 * @param {string} [props.type] - The HTML input type (e.g., 'text', 'email', 'password').
 * @param {React.ElementType} [props.leadingIcon] - Optional icon component to display inside the input field, at the beginning.
 * @param {string} [props.inputClassName] - Additional CSS classes for the input element itself.
 */
interface TextFieldProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  id: string
  type?: React.HTMLInputTypeAttribute
  leadingIcon?: React.ElementType
  inputClassName?: string
}

export function TextField({
  label,
  placeholder,
  value,
  onChange,
  id,
  type = "text",
  leadingIcon: LeadingIcon,
  inputClassName,
}: TextFieldProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-poly-median text-brand-content-primary mb-1">
        {label}
      </label>
      <div className="relative">
        {LeadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeadingIcon className="h-5 w-5 text-brand-content-secondary" aria-hidden="true" />
          </div>
        )}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-poly-neutral",
            "focus:outline-none focus:ring-1 focus:ring-brand-content-primary focus:border-brand-content-primary sm:text-sm",
            "text-brand-content-primary placeholder:text-brand-content-secondary",
            LeadingIcon && "pl-10",
            inputClassName,
          )}
        />
      </div>
    </div>
  )
}
