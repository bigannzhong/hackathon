"use client"

import { Button } from "./button"
import { cn } from "@/lib/utils"

/**
 * A promotional banner for the AI stack.
 * @param {object} props - Component props.
 * @param {string} props.title - The main title of the banner.
 * @param {string} props.description - The descriptive text.
 * @param {string} props.buttonLabel - The label for the call-to-action button.
 * @param {() => void} props.onButtonClick - Callback function for the button click.
 */
interface AiPromoBannerProps {
  title: string
  description: string
  buttonLabel: string
  onButtonClick: () => void
}

export function AiPromoBanner({ title, description, buttonLabel, onButtonClick }: AiPromoBannerProps) {
  return (
    <div className={cn("bg-[#9CEE69] text-[#191919] py-4 px-8 flex items-center justify-between w-full")}>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-base">{description}</p>
      </div>
      <Button variant="neutral" onClick={onButtonClick} className="!bg-[#191919] !text-white !h-10 !px-4 !py-0">
        {buttonLabel}
      </Button>
    </div>
  )
}
