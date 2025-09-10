"use client"
import Image from "next/image"
import { Badge } from "./badge"
import { Button } from "./button"
import { cn } from "@/lib/utils"

/**
 * A promotion module component featuring a badge, title, description, call-to-action button, and an image.
 * @param {object} props - Component props.
 * @param {string} props.badgeLabel - The text for the badge.
 * @param {string} props.title - The main title of the promotion.
 * @param {string} props.description - The descriptive text for the promotion.
 * @param {string} props.buttonLabel - The label for the call-to-action button.
 * @param {string} props.imageUrl - The URL for the promotional image.
 * @param {string} props.imageAlt - The alt text for the promotional image.
 * @param {() => void} props.onButtonClick - Callback function for the button click.
 */
interface PromotionModuleProps {
  badgeLabel: string
  title: string
  description: string
  buttonLabel: string
  imageUrl: string
  imageAlt: string
  onButtonClick: () => void
}

export function PromotionModule({
  badgeLabel,
  title,
  description,
  buttonLabel,
  imageUrl,
  imageAlt,
  onButtonClick,
}: PromotionModuleProps) {
  return (
    <div
      className={cn(
        "flex h-[300px] w-full rounded-md overflow-hidden",
        "bg-[#FFF5ED] text-[#191919]", // Background and text color from anatomy
      )}
    >
      {/* Left Content Section */}
      <div className="flex flex-col justify-center p-8 gap-6 w-1/2">
        <Badge type="promotion" variant="filled" className="self-start w-fit">
          {badgeLabel}
        </Badge>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold leading-tight">{title}</h3>
          <p className="text-base">{description}</p>
        </div>
        <Button variant="secondary" size="default" onClick={onButtonClick} className="self-start">
          {buttonLabel}
        </Button>
      </div>

      {/* Right Image Section */}
      <div className="relative w-1/2 h-full">
        <Image
          src={imageUrl || "/placeholder.svg?height=300&width=425.5&query=abstract geometric shapes"}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="rounded-r-md" // Apply border-radius to the right side of the image
        />
      </div>
    </div>
  )
}
