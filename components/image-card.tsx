"use client"
import Image from "next/image"
import { WandIcon as MagicWand, Download, MoreHorizontal } from "lucide-react"
import { IconButton } from "./icon-button"

/**
 * A component to display an image with an overlay for title, author, and action buttons.
 * Action buttons appear on hover.
 * @param {object} props - Component props.
 * @param {string} props.src - The image source URL.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.title - The title displayed on the image overlay.
 * @param {string} props.author - The author displayed on the image overlay.
 */
interface ImageCardProps {
  src: string
  alt: string
  title: string
  author: string
}

export function ImageCard({ src, alt, title, author }: ImageCardProps) {
  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-md group">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex flex-col justify-between">
        <div>
          <p className="text-white text-sm font-semibold line-clamp-2">{title}</p>
          <p className="text-white text-xs opacity-75">{author}</p>
        </div>
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <IconButton icon={MagicWand} variant="default" size="small" aria-label="Edit image" />
          <IconButton icon={Download} variant="default" size="small" aria-label="Download image" />
          <IconButton icon={MoreHorizontal} variant="default" size="small" aria-label="More options" />
        </div>
      </div>
    </div>
  )
}
