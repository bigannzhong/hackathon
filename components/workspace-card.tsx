"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * A card component for displaying a workspace with preview images and metadata.
 * @param {object} props - Component props.
 * @param {string} props.id - The unique identifier for the workspace.
 * @param {string} props.name - The name of the workspace.
 * @param {number} props.assetCount - The number of assets in the workspace.
 * @param {string[]} props.previewImages - Array of image URLs to display as preview.
 * @param {string} [props.href] - Optional URL to navigate to when clicked.
 */
interface WorkspaceCardProps {
  id: string
  name: string
  assetCount: number
  previewImages: string[]
  href?: string
}

export function WorkspaceCard({ id, name, assetCount, previewImages, href = `/workspace/${id}` }: WorkspaceCardProps) {
  const displayImages = previewImages.slice(0, 4) // Show maximum 4 preview images
  const isEmpty = assetCount === 0

  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
        {/* Preview Images Grid */}
        <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
          {isEmpty ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-400">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm">No items</p>
              </div>
            </div>
          ) : (
            <div className={cn(
              "grid gap-1 p-2 h-full",
              displayImages.length === 1 ? "grid-cols-1" :
              displayImages.length === 2 ? "grid-cols-2" :
              displayImages.length === 3 ? "grid-cols-2 grid-rows-2" :
              "grid-cols-2 grid-rows-2"
            )}>
              {displayImages.map((imageUrl, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "relative rounded overflow-hidden bg-gray-200",
                    displayImages.length === 3 && index === 0 ? "row-span-2" : ""
                  )}
                >
                  <Image
                    src={imageUrl || "/placeholder.svg?height=150&width=150"}
                    alt={`${name} preview ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Workspace Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-[#191919] mb-1 group-hover:text-[#B037A6] transition-colors">
            {name}
          </h3>
          <p className="text-sm text-[#707070]">
            {assetCount} {assetCount === 1 ? 'asset' : assetCount === 0 ? 'item' : 'assets'}
          </p>
        </div>
      </div>
    </Link>
  )
}
