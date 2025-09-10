"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Plus, FileText, ImageIcon } from "lucide-react"

interface ChatInputDropdownProps {
  onProjectContext: () => void
  onImageUpload: () => void
}

export function ChatInputDropdown({ onProjectContext, onImageUpload }: ChatInputDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleProjectContext = () => {
    setIsOpen(false)
    onProjectContext()
  }

  const handleImageUpload = () => {
    setIsOpen(false)
    onImageUpload()
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors"
        aria-label="Add context or upload image"
        type="button"
      >
        <Plus className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          <button
            onClick={handleProjectContext}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FileText className="w-4 h-4 mr-3 text-gray-400" />
            Project context
          </button>
          <button
            onClick={handleImageUpload}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ImageIcon className="w-4 h-4 mr-3 text-gray-400" />
            Upload an image for reference
          </button>
        </div>
      )}
    </div>
  )
}
