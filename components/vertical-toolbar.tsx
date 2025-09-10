"use client"

import { IconButton } from "./icon-button"
import { MousePointer2, Hand, Settings, Type, Square, Grid3X3 } from "lucide-react"

export function VerticalToolbar() {
  const toolbarButtons = [
    { icon: MousePointer2, label: "Select" },
    { icon: Hand, label: "Pan" },
    { icon: Settings, label: "Settings" },
    { icon: Type, label: "Text" },
    { icon: Square, label: "Rectangle" },
    { icon: Grid3X3, label: "Grid" },
  ]

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-1">
        {toolbarButtons.map((button, index) => (
          <IconButton
            key={index}
            icon={button.icon}
            variant="transparent"
            size="default"
            className="hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            title={button.label}
            onClick={() => {
              // Placeholder - functionality can be replaced later
              console.log(`[v0] ${button.label} tool clicked`)
            }}
          />
        ))}
      </div>
    </div>
  )
}
