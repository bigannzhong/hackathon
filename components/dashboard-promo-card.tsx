"use client"

import Image from "next/image"
import { Button } from "./button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react" // For the "Try it out" icon

/**
 * A flexible promotional card for the dashboard.
 * @param {object} props - Component props.
 * @param {string} props.title - The main title of the card.
 * @param {string} props.description - The descriptive text.
 * @param {string} props.buttonLabel - The label for the call-to-action button.
 * @param {string} props.imageUrl - The URL for the card image.
 * @param {string} props.imageAlt - The alt text for the image.
 * @param {() => void} props.onButtonClick - Callback function for the button click.
 * @param {string} [props.price] - Optional price string (e.g., "$16.50/month").
 * @param {string} [props.subPrice] - Optional sub-price string (e.g., "USD $198 billed annually").
 * @param {string} [props.badgeLabel] - Optional label for a badge (e.g., "New").
 * @param {boolean} [props.reverseLayout] - If true, image is on left, text on right.
 */
interface DashboardPromoCardProps {
  title: string
  description: string
  buttonLabel: string
  imageUrl: string
  imageAlt: string
  onButtonClick: () => void
  price?: string
  subPrice?: string
  badgeLabel?: string
  reverseLayout?: boolean
}

export function DashboardPromoCard({
  title,
  description,
  buttonLabel,
  imageUrl,
  imageAlt,
  onButtonClick,
  price,
  subPrice,
  badgeLabel,
  reverseLayout = false,
}: DashboardPromoCardProps) {
  return (
    <div
      className={cn(
        "flex rounded-md overflow-hidden shadow-sm border border-gray-200 bg-white",
        reverseLayout ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Text Content Section */}
      <div className="flex flex-col justify-center p-6 gap-4 flex-1">
        {badgeLabel && (
          <Badge type="positive" variant="outline" className="self-start">
            {badgeLabel}
          </Badge>
        )}
        {price && <p className="text-2xl font-bold text-[#191919]">{price}</p>}
        {subPrice && <p className="text-sm text-gray-600">{subPrice}</p>}
        <h3 className="text-xl font-bold leading-tight text-[#191919]">{title}</h3>
        <p className="text-base text-gray-700">{description}</p>
        <Button
          variant="primary"
          onClick={onButtonClick}
          className="self-start !bg-[#9CEE69] !text-[#1A4200] !h-10 !px-4 !py-0"
          iconLeading={badgeLabel === "New" ? Play : undefined} // Add play icon for "New" badge
        >
          {buttonLabel}
        </Button>
      </div>

      {/* Image Section */}
      <div className="relative flex-shrink-0 w-[200px] h-[200px]">
        <Image src={imageUrl || "/placeholder.svg"} alt={imageAlt} layout="fill" objectFit="cover" />
      </div>
    </div>
  )
}
