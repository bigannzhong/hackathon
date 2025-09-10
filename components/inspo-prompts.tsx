"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface InspoPromptsProps {
  onPromptSelect: (prompt: string) => void
}

const INSPO_PROMPTS = [
  "Curate cozy winter lifestyle photos with warm lighting.",
  "Show bold summer campaign visuals for streetwear.",
  "Get playful pet photography for a kids' brand.",
]

export function InspoPrompts({ onPromptSelect }: InspoPromptsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handlePromptClick = (prompt: string) => {
    onPromptSelect(prompt)
  }

  return (
    <div className="mb-4">
      {/* Collapsed State - Toggle Button */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Image src="/icons/inspo.svg" alt="Inspiration" width={24} height={24} />
          <span className="text-sm font-poly-neutral text-[#707070]">Try our inspo prompt to get start</span>
        </div>
        {isExpanded ? (
          <Image src="/icons/chevron-up.svg" alt="Collapse" width={24} height={24} />
        ) : (
          <Image src="/icons/chevron-down.svg" alt="Expand" width={24} height={24} />
        )}
      </button>

      {/* Expanded State - Prompt List */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-2">
          {INSPO_PROMPTS.map((prompt, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors group"
            >
              <span className="text-sm font-poly-neutral text-[#191919] flex-1 pr-3">{prompt}</span>
              <button
                onClick={() => handlePromptClick(prompt)}
                className="flex-shrink-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors group-hover:border-gray-400"
                aria-label={`Use prompt: ${prompt}`}
              >
                <Plus className="w-4 h-4 text-[#707070]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
