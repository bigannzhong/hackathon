"use client"

import Image from "next/image"
import { Bookmark, Blend, Download, Check } from 'lucide-react'
import { IconButton } from "./icon-button"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * A selectable version of ItemCard with multi-select functionality.
 * Shows a checkbox on hover for selection.
 */
interface SelectableItemCardProps {
  src: string
  alt: string
  title: string
  author: string
  itemId: string
  isSelected: boolean
  onSelectionChange: (itemId: string, isSelected: boolean) => void
  href?: string
}

export function SelectableItemCard({ 
  src, 
  alt, 
  title, 
  author, 
  itemId,
  isSelected,
  onSelectionChange,
  href = "/item" 
}: SelectableItemCardProps) {
  const toSentenceCase = (str: string) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const formattedAuthor = toSentenceCase(author)

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onSelectionChange(itemId, !isSelected)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // If an item is selected, clicking should toggle selection instead of navigating
    if (isSelected) {
      e.preventDefault()
      onSelectionChange(itemId, false)
    }
  }

  return (
    <Link 
      href={href} 
      className={cn(
        "relative w-full aspect-square overflow-hidden rounded-md group block transition-all duration-200",
        isSelected && "ring-2 ring-[#9CEE69] ring-offset-2"
      )}
      onClick={handleCardClick}
    >
      <Image
        src={src || "/abstract-item-card-fallback.png"}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Selection Checkbox - appears on hover or when selected */}
      <div 
        className={cn(
          "absolute top-2 left-2 transition-opacity duration-200",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <button
          onClick={handleCheckboxClick}
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
            isSelected 
              ? "bg-[#9CEE69] border-[#9CEE69] text-[#1A4200]" 
              : "bg-white/90 border-white/90 text-transparent hover:bg-white hover:border-white"
          )}
          aria-label={isSelected ? "Deselect item" : "Select item"}
        >
          {isSelected && <Check className="w-4 h-4" />}
        </button>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0">
        {/* Title and Author container */}
        <div className="absolute top-2 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-[rgba(25,25,25,0.7)] rounded-md p-1 inline-block">
            <p className="text-sm font-semibold line-clamp-2 text-white">{title}</p>
            <p className="text-white text-sm">{formattedAuthor}</p>
          </div>
        </div>
        
        {/* Action buttons - only show when not in selection mode */}
        {!isSelected && (
          <div className="absolute bottom-2 right-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <IconButton 
              icon={Blend} 
              variant="default" 
              size="small" 
              aria-label="Blend item"
              onClick={(e) => e.stopPropagation()}
            />
            <IconButton 
              icon={Bookmark} 
              variant="default" 
              size="small" 
              aria-label="Bookmark item"
              onClick={(e) => e.stopPropagation()}
            />
            <IconButton 
              icon={Download} 
              variant="default" 
              size="small" 
              aria-label="Download item"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </Link>
  )
}
