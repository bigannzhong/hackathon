"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

/**
 * A customizable dropdown menu component.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.trigger - The element that triggers the dropdown.
 * @param {Array<{ label: string; icon?: React.ElementType; onClick: () => void }>} props.items - Array of menu items.
 * @param {React.ReactNode} [props.customContent] - Custom content to display instead of items.
 */
interface DropdownMenuItem {
  label: string
  icon?: React.ElementType
  onClick: () => void
}

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  customContent?: React.ReactNode
}

export function DropdownMenu({ trigger, items, customContent }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} aria-haspopup="true" aria-expanded={isOpen}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
        >
          {customContent ? (
            customContent
          ) : (
            <div className="py-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick()
                    setIsOpen(false)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {item.icon && <item.icon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
