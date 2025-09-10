"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * A component to display a horizontally scrollable gallery of image thumbnails.
 * @param {object} props - Component props.
 * @param {{ src: string; alt: string }[]} props.images - An array of image objects.
 * @param {number} props.selectedImageIndex - The index of the currently selected image.
 * @param {(index: number) => void} props.onSelectImage - Callback when an image is selected.
 */
interface ImageThumbnailsGalleryProps {
  images: { src: string; alt: string }[]
  selectedImageIndex: number
  onSelectImage: (index: number) => void
}

export function ImageThumbnailsGallery({ images, selectedImageIndex, onSelectImage }: ImageThumbnailsGalleryProps) {
  // You might want to add scroll logic here if the list is very long
  // For simplicity, we'll just render them in a scrollable div.

  return (
    <div className="relative w-full">
      <div className="flex overflow-x-auto gap-2 py-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelectImage(index)}
            className={cn(
              "flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden border-2 transition-all duration-200",
              index === selectedImageIndex ? "border-black" : "border-transparent hover:border-gray-300",
            )}
            aria-label={`View image ${index + 1}: ${image.alt}`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            {index === selectedImageIndex && (
              <div className="absolute inset-0 ring-2 ring-black rounded-md" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
      {/* Optional navigation arrows for large lists, not strictly needed for small sets */}
      {/* <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow-md">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow-md">
        <ChevronRight className="w-4 h-4" />
      </button> */}
    </div>
  )
}
