"use client"

import type React from "react"
import { useState } from "react"
import { Info, X, TriangleAlert, CheckCircle, CircleDot, Star, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A message component for displaying alerts or information, with an optional close button.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content of the message.
 * @param {'info' | 'caution' | 'positive' | 'critical' | 'promotion' | 'prompt'} props.type - The type of message (determines color and icon).
 * @param {() => void} [props.onClose] - Optional callback for when the close button is clicked.
 */
interface MessageProps {
  children: React.ReactNode
  type: "info" | "caution" | "positive" | "critical" | "promotion" | "prompt"
  onClose?: () => void
}

export function Message({ children, type, onClose }: MessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const typeConfig = {
    info: {
      bg: "bg-[#F0F1FF]",
      border: "border-[#4F5CE8]",
      text: "text-[#4F5CE8]",
      icon: Info,
    },
    caution: {
      bg: "bg-[#FFF5ED]",
      border: "border-[#C24100]",
      text: "text-[#C24100]",
      icon: TriangleAlert,
    },
    positive: {
      bg: "bg-[#EAFFDC]",
      border: "border-[#2E7400]",
      text: "text-[#2E7400]",
      icon: CheckCircle,
    },
    critical: {
      bg: "bg-[#FFECF2]",
      border: "border-[#B9004B]",
      text: "text-[#B9004B]",
      icon: CircleDot,
    },
    promotion: {
      bg: "bg-brand-green",
      border: "border-brand-content-primary",
      text: "text-brand-content-primary",
      icon: Star,
    },
    prompt: {
      bg: "bg-[#F9F9FB]",
      border: "border-brand-content-primary",
      text: "text-brand-content-primary",
      icon: MessageSquare,
    },
  }

  const { bg, border, text, icon: IconComponent } = typeConfig[type]

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <div
      className={cn("flex items-center justify-between p-3 rounded-md border font-poly-neutral", bg, border, text)}
      role="alert"
    >
      <div className="flex items-center">
        <IconComponent className="w-5 h-5 mr-2" />
        <span>{children}</span>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          className={cn(
            "ml-4 p-1 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-current",
            text,
          )}
          aria-label="Close message"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
