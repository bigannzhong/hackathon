"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * A simple image carousel component.
 * @param {object} props - Component props.
 * @param {string[]} props.images - An array of image URLs.
 * @param {number} props.width - The width of the carousel images.
 * @param {number} props.height - The height of the carousel images.
 */
interface CarouselProps {
  images: { src: string; alt: string }[]
  width?: number
  height?: number
}

export function Carousel({ images, width = 200, height = 200 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-md text-gray-500">No images</div>
    )
  }

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="overflow-hidden rounded-md">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={width}
                height={height}
                className="w-full object-cover rounded-md"
                style={{ aspectRatio: `${width}/${height}` }}
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}
    </div>
  )
}
