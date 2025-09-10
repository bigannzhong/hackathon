"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button" // Assuming Button component is available

/**
 * A pagination component for navigating through pages of content.
 * @param {object} props - Component props.
 * @param {number} props.currentPage - The current active page number (1-indexed).
 * @param {number} props.totalPages - The total number of pages available.
 * @param {(page: number) => void} props.onPageChange - Callback function when a page is selected.
 */
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = []
  // Display a limited range of pages around the current page
  const maxPagesToShow = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  // Adjust startPage if endPage is at totalPages but we don't have enough pages before
  if (endPage === totalPages && endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex items-center justify-center gap-2 py-4" aria-label="Pagination">
      <Button
        variant="tertiary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="!h-8 !px-3 !py-1 !text-sm !rounded-md"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="tertiary" onClick={() => onPageChange(1)} className="!h-8 !px-3 !py-1 !text-sm !rounded-md">
            1
          </Button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "neutral" : "tertiary"}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "!h-8 !px-3 !py-1 !text-sm !rounded-md",
            page === currentPage ? "!bg-[#191919] !text-white" : "!bg-transparent !text-[#191919] hover:!bg-gray-100",
          )}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
          <Button
            variant="tertiary"
            onClick={() => onPageChange(totalPages)}
            className="!h-8 !px-3 !py-1 !text-sm !rounded-md"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="tertiary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="!h-8 !px-3 !py-1 !text-sm !rounded-md"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  )
}
