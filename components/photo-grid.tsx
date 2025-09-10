"use client"

import { useState } from "react"
import Image from "next/image"
import { ItemCard } from "./item-card"
import { ImageLightbox } from "./image-lightbox"

interface Photo {
  id: string
  src: string
  alt: string
  title: string
  author: string
  envatoUrl?: string
  tags?: string[]
}

interface PhotoGridProps {
  photos: Photo[]
  isLoading: boolean
  hasQuery: boolean
  hasMore?: boolean
  onLoadMore?: () => void
  isLoadingMore?: boolean
}

export function PhotoGrid({ photos, isLoading, hasQuery, hasMore, onLoadMore, isLoadingMore }: PhotoGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const handleLightboxClose = () => {
    setLightboxOpen(false)
  }

  const handleLightboxNavigate = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1920px]:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  // Empty state - no query yet
  if (!hasQuery) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-6">
          {/* Stacked Photo Cards */}
          <div className="mb-6 lg:mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/empty-state-photos.png"
                alt="Stack of colorful photo cards"
                width={280}
                height={180}
                className="object-contain w-64 h-auto sm:w-80 md:w-96 lg:w-[420px] xl:w-[480px]"
              />
            </div>
          </div>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-bold text-[#191919] font-poly-median lg:text-2xl mb-2">
            📸 Got words? I've got the pictures.
          </h3>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#707070] mb-6 lg:mb-8 font-poly-neutral lg:text-base">
            Type what's in your head and I'll bring the visuals.
          </p>

          {/* Arrow pointing down */}
          <div className="flex justify-center">
            <Image
              src="/empty-state-arrow.png"
              alt="Arrow pointing to input"
              width={60}
              height={80}
              className="object-contain w-14 h-auto sm:w-16 md:w-18 lg:w-20 xl:w-24"
            />
          </div>
        </div>
      </div>
    )
  }

  // No results found
  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#191919] mb-2">No photos found</h3>
          <p className="text-[#707070]">Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  // Results grid
  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1920px]:grid-cols-6 gap-4">
          {photos.map((photo, index) => (
            <ItemCard
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              author={photo.author}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>

        {/* Load More Button - Hidden for now */}
        {/* {hasMore && onLoadMore && (
          <div className="flex justify-center mt-8">
            <Button
              variant="secondary"
              onClick={onLoadMore}
              disabled={isLoadingMore}
              iconTrailing={ChevronRight}
              className="!px-6 !py-3"
            >
              {isLoadingMore ? "Loading..." : "Load more photos"}
            </Button>
          </div>
        )} */}
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={photos}
        currentIndex={currentImageIndex}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
    </>
  )
}
