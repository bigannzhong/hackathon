"use client"

import type React from "react"

/**
 * An individual menu item component, often used within dropdowns or navigation.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content of the menu item.
 * @param {React.ElementType} [props.icon] - Optional icon component to display.
 * @param {() => void} [props.onClick] - Optional click handler for the menu item.
 */
interface MenuItemProps {
  children: React.ReactNode
  icon?: React.ElementType
  onClick?: () => void
}

export function MenuItem({ children, icon: Icon, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
      role="menuitem"
    >
      {Icon && <Icon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />}
      {children}
    </button>
  )
}
