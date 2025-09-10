"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface ThinkingProcessData {
  duration: string
  steps: {
    title: string
    content: string[]
  }[]
}

interface ThinkingProcessMessageProps {
  data: ThinkingProcessData
}

export function ThinkingProcessMessage({ data }: ThinkingProcessMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex justify-start mb-2">
      <div className="max-w-[80%] border-gray-200 rounded-md overflow-hidden border-0">
        {/* Collapsed Header - Clickable */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left flex items-center justify-between hover:bg-gray-50 transition-colors px-0 py-0 border-transparent"
        >
          <span className="text-xs text-[#707070]">Search Photo for {data.duration}</span>
          {isExpanded ? (
            <ChevronDown className="w-3 h-3 text-[#707070]" />
          ) : (
            <ChevronRight className="w-3 h-3 text-[#707070]" />
          )}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-3 pb-3 border-t border-gray-100 pl-0 pr-0">
            <div className="space-y-2 mt-2">
              {data.steps.map((step, index) => (
                <div key={index}>
                  <h4 className="text-xs font-medium text-[#707070] mb-1">
                    Step {index + 1}: {step.title}
                  </h4>
                  <div className="space-y-1">
                    {step.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-xs text-[#949494] pl-2">
                        {item.startsWith("•") ? (
                          <div className="flex items-start gap-1">
                            <span>•</span>
                            <span>{item.substring(1).trim()}</span>
                          </div>
                        ) : item.startsWith("→") ? (
                          <div className="font-mono text-xs bg-gray-50 p-1.5 rounded border-l-2 border-gray-300">
                            {item}
                          </div>
                        ) : (
                          <div>{item}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
