"use client"

import type React from "react"

import Image from "next/image"
import { Bookmark, Blend, Download } from "lucide-react"
import { IconButton } from "./icon-button"
import Link from "next/link"
import { useSavedItems } from "../contexts/saved-items-context"
import { useToast } from "./toast"

/**
 * A card component for displaying an item with an image, title, and author.
 * On hover, an overlay appears with additional information and action buttons.
 * @param {object} props - Component props.
 * @param {string} props.src - The image source URL.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.title - The title of the item.
 * @param {string} props.author - The author's name.
 * @param {string} [props.href] - The URL to navigate to when the card is clicked.
 * @param {() => void} [props.onClick] - Click handler for the card (alternative to href).
 */
interface ItemCardProps {
  src: string
  alt: string
  title: string
  author: string
  href?: string
  onClick?: () => void
}

export function ItemCard({ src, alt, title, author, href, onClick }: ItemCardProps) {
  // Function to convert string to sentence case
  const toSentenceCase = (str: string) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const formattedAuthor = toSentenceCase(author)

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const { saveItem, isItemSaved } = useSavedItems()
  const { showToast } = useToast()

  // Generate a unique ID for this item based on src and title
  const itemId = `${src}-${title}`.replace(/[^a-zA-Z0-9]/g, "-")
  const isSaved = isItemSaved(itemId)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isSaved) {
      saveItem({
        id: itemId,
        src,
        alt,
        title,
        author,
      })
      showToast("Saved to Workspace")
    }
  }

  const cardContent = (
    <div className="relative w-full aspect-square overflow-hidden rounded-md group">
      <Image
        src={src || "/abstract-item-card-fallback.png"}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay content */}
      <div className="absolute inset-0">
        {/* Top section: Title and Author container */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-[rgba(25,25,25,0.7)] rounded-md p-1 inline-block">
            <p className="text-sm font-semibold line-clamp-2 text-white">{title}</p>
            <p className="text-white text-sm">{formattedAuthor}</p>
          </div>
        </div>

        {/* Bottom section: Action buttons */}
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
            aria-label={isSaved ? "Already saved" : "Save to workspace"}
            onClick={handleBookmarkClick}
            className={isSaved ? "bg-blue-600 text-white" : ""}
          />
          <IconButton
            icon={Download}
            variant="default"
            size="small"
            aria-label="Download item"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  )

  // If onClick is provided, use a button wrapper
  if (onClick) {
    return (
      <button
        onClick={handleCardClick}
        className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-md"
      >
        {cardContent}
      </button>
    )
  }

  // Otherwise, use Link wrapper
  return (
    <Link href={href || "/item"} className="block">
      {cardContent}
    </Link>
  )
}
