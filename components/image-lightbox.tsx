"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download, Bookmark, Blend } from "lucide-react"
import { IconButton } from "./icon-button"

interface LightboxImage {
  id: string
  src: string
  alt: string
  title: string
  author: string
  envatoUrl?: string
}

interface ImageLightboxProps {
  isOpen: boolean
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate?: (index: number) => void
}

export function ImageLightbox({ isOpen, images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const currentImage = images[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (currentIndex > 0 && onNavigate) {
            onNavigate(currentIndex - 1)
          }
          break
        case "ArrowRight":
          if (currentIndex < images.length - 1 && onNavigate) {
            onNavigate(currentIndex + 1)
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      modalRef.current?.focus()
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Reset loading state when image changes
  useEffect(() => {
    setImageLoading(true)
  }, [currentIndex])

  if (!isOpen || !currentImage) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0 && onNavigate) {
      onNavigate(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1 && onNavigate) {
      onNavigate(currentIndex + 1)
    }
  }

  const toSentenceCase = (str: string) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={handleOverlayClick}
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </>
      )}

      {/* Main Content */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col">
        {/* Image Container */}
        <div className="relative flex-1 flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <Image
            ref={imageRef}
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            width={800}
            height={600}
            className="max-w-full max-h-full object-contain"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            priority
          />
        </div>

        {/* Image Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
          <div className="flex items-end justify-between">
            {/* Image Details */}
            <div className="flex-1 min-w-0">
              <h2 id="lightbox-title" className="text-white text-lg font-semibold mb-1 truncate">
                {currentImage.title}
              </h2>
              <p className="text-white/80 text-sm">by {toSentenceCase(currentImage.author)}</p>
              {images.length > 1 && (
                <p className="text-white/60 text-xs mt-1">
                  {currentIndex + 1} of {images.length}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-4">
              <IconButton
                icon={Blend}
                variant="default"
                size="default"
                aria-label="Blend image"
                onClick={(e) => e.stopPropagation()}
              />
              <IconButton
                icon={Bookmark}
                variant="default"
                size="default"
                aria-label="Bookmark image"
                onClick={(e) => e.stopPropagation()}
              />
              <IconButton
                icon={Download}
                variant="default"
                size="default"
                aria-label="Download image"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
