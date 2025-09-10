"use client"
import { FileText, Edit3, Trash2 } from "lucide-react"
import { DropdownMenu } from "./dropdown-menu"

interface ProjectContextChipProps {
  context: string
  onEdit: () => void
  onClear: () => void
}

export function ProjectContextChip({ context, onEdit, onClear }: ProjectContextChipProps) {
  // Create a short preview of the context (first 30 chars)
  const contextPreview = context.length > 30 ? `${context.substring(0, 30)}...` : context

  const chipActions = [
    {
      label: "Edit context",
      icon: Edit3,
      onClick: onEdit,
    },
    {
      label: "Clear context",
      icon: Trash2,
      onClick: onClear,
    },
  ]

  return (
    <DropdownMenu
      trigger={
        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F0F1FF] text-[#4F5CE8] text-xs rounded-full border border-[#4F5CE8] hover:bg-[#E6E7FF] focus:outline-none focus:ring-2 focus:ring-[#4F5CE8] focus:ring-offset-1 transition-colors">
          <FileText className="w-4 h-4" />
          <span className="font-medium">Context added</span>
        </button>
      }
      items={chipActions}
      customContent={
        <div className="p-4 w-80">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#191919]">Project Context</h3>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">{context}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#191919] hover:bg-gray-100 rounded-md transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      }
    />
  )
}
