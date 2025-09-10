"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { FileText, ImageIcon } from "lucide-react"
import { useSearchStyle } from "../hooks/use-search-style"
import type { SearchStyle, ResponseStyle } from "../hooks/use-search-style"
import { SearchSettingsModal } from "./search-settings-modal"

interface EnhancedChatInputProps {
  onSend: (message: string) => void
  onProjectContext: () => void
  onImageUpload: () => void
  disabled?: boolean
  onSearchStyleChange?: (style: SearchStyle) => void
  onResponseStyleChange?: (style: ResponseStyle) => void
}

export function EnhancedChatInput({
  onSend,
  onProjectContext,
  onImageUpload,
  disabled,
  onSearchStyleChange,
  onResponseStyleChange,
}: EnhancedChatInputProps) {
  const [message, setMessage] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [showSearchSettings, setShowSearchSettings] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Add search style hook
  const { searchStyle, responseStyle, updateSearchStyle, updateResponseStyle } = useSearchStyle()

  // Create a stable click outside handler using useCallback
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node

    // Don't close if clicking on the button or dropdown
    if (
      (buttonRef.current && buttonRef.current.contains(target)) ||
      (dropdownRef.current && dropdownRef.current.contains(target))
    ) {
      return
    }

    // Close dropdown if clicking outside
    setShowDropdown(false)
  }, [])

  // Simplified useEffect without dependencies that could cause re-renders
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  // Add handler for tune button
  const handleTuneButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowSearchSettings(true)
    setShowDropdown(false) // Close other dropdown
  }

  // Add handler for search style change
  const handleSearchStyleChange = (style: SearchStyle) => {
    updateSearchStyle(style)
    onSearchStyleChange?.(style)
  }

  // Add handler for response style change
  const handleResponseStyleChange = (style: ResponseStyle) => {
    updateResponseStyle(style)
    onResponseStyleChange?.(style)
  }

  // Update the existing handleButtonClick to close style selector
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDropdown(!showDropdown)
    setShowSearchSettings(false) // Close other modal
  }

  // Declare handleSubmit and handleKeyDown
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(message)
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend(message)
      setMessage("")
    }
  }

  // Declare handleProjectContextClick and handleImageUploadClick
  const handleProjectContextClick = () => {
    onProjectContext()
    setShowDropdown(false)
  }

  const handleImageUploadClick = () => {
    onImageUpload()
    setShowDropdown(false)
  }

  // Add the tune button in the bottom section, before the plus button:
  return (
    <div className="relative">
      <div className="flex items-end">
        {/* Message Input Form */}
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <div className="relative bg-white border border-[#CCCCCC] rounded-[32px] min-h-[140px] max-h-[320px] overflow-hidden">
            {/* Text Input - now fills full width */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the photos you need..."
              disabled={disabled}
              className="w-full h-full bg-transparent border-none outline-none resize-none font-poly-neutral text-base placeholder:text-[#707070] text-[#191919] py-4 min-h-[140px] max-h-[320px] overflow-y-auto pl-6 pr-6"
              style={{
                fontFamily: '"Poly Sans", "Inter", system-ui, sans-serif',
                lineHeight: "1.5",
              }}
            />

            {/* Left Tune Icon - positioned absolutely */}
            <div className="absolute bottom-4 left-4">
              <button
                type="button"
                onClick={handleTuneButtonClick}
                className="w-12 h-12 bg-transparent border-2 border-[#CCCCCC] rounded-full flex items-center justify-center hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                disabled={disabled}
              >
                <Image src="/icons/tune.svg" alt="Tune settings" width={20} height={20} />
              </button>
            </div>

            {/* Left Plus Icon - positioned absolutely, with proper 8px spacing */}
            <div className="absolute bottom-4 left-[72px]">
              <button
                ref={buttonRef}
                type="button"
                onClick={handleButtonClick}
                className="w-12 h-12 bg-transparent border-2 border-[#CCCCCC] rounded-full flex items-center justify-center hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                disabled={disabled}
              >
                <Image src="/icons/plus.svg" alt="Add" width={24} height={24} />
              </button>
            </div>

            {/* Right Send Icon - positioned absolutely */}
            <div className="absolute bottom-4 right-4">
              <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="w-12 h-12 bg-[#9CEE69] rounded-full flex items-center justify-center hover:bg-[#8FE555] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9CEE69] disabled:cursor-not-allowed disabled:hover:bg-[#9CEE69]"
              >
                <Image src="/icons/send.svg" alt="Send" width={24} height={24} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Search Settings Modal */}
      <SearchSettingsModal
        isOpen={showSearchSettings}
        onClose={() => setShowSearchSettings(false)}
        searchStyle={searchStyle}
        responseStyle={responseStyle}
        onSearchStyleChange={handleSearchStyleChange}
        onResponseStyleChange={handleResponseStyleChange}
      />

      {/* Existing Plus Dropdown Menu - positioned outside the input container */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute bottom-20 left-[72px] w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[9999]"
        >
          <button
            onClick={handleProjectContextClick}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4 mr-3 text-gray-400" />
            Project context
          </button>
          <button
            onClick={handleImageUploadClick}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ImageIcon className="w-4 h-4 mr-3 text-gray-400" />
            Upload an image for reference
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="absolute -bottom-6 left-16 text-xs text-[#707070] font-poly-neutral pb-1 pt-1 text-[rgba(182,182,182,1)] font-light">
        Envato search AI may make mistakes. Please use with discretion
      </div>
    </div>
  )
}
