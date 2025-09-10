"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Edit3 } from "lucide-react"
import { Button } from "./button"

interface ProjectContextModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (context: string) => void
  initialContext?: string
}

export function ProjectContextModal({ isOpen, onClose, onSubmit, initialContext = "" }: ProjectContextModalProps) {
  const [contextText, setContextText] = useState(initialContext)
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500

  useEffect(() => {
    setContextText(initialContext)
    setCharCount(initialContext.length)
  }, [initialContext, isOpen])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= maxChars) {
      setContextText(text)
      setCharCount(text.length)
    }
  }

  const handleSubmit = () => {
    if (contextText.trim()) {
      onSubmit(contextText.trim())
      onClose()
    }
  }

  const handleCancel = () => {
    setContextText(initialContext)
    setCharCount(initialContext.length)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#191919]">Project context</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="relative">
            <textarea
              value={contextText}
              onChange={handleTextChange}
              placeholder="Add in project context"
              className="w-full h-32 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
              autoFocus
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Character count */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">Describe your project, brand, audience, or creative direction</p>
            <span className={`text-xs ${charCount > maxChars * 0.9 ? "text-red-500" : "text-gray-400"}`}>
              {charCount}/{maxChars}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-start gap-3 p-6 border-t border-gray-200">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!contextText.trim()}
            className="!bg-[#9CEE69] !text-[#1A4200]"
          >
            Submit
          </Button>
          <Button variant="tertiary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
