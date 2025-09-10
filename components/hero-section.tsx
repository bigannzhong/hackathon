import type React from "react"
import { Chip } from "./chip"

/**
 * A hero section component for displaying a main title, description, and related tags.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.title - The main title content, allowing for rich text (e.g., colored parts).
 * @param {string} props.description - The descriptive text.
 * @param {Array<{ label: string; icon: 'fire' | 'trending' | 'none' }>} props.tags - An array of tag objects.
 */
interface HeroSectionProps {
  title: React.ReactNode
  description: string
  tags: { label: string; icon: "fire" | "trending" | "none" }[]
}

export function HeroSection({ title, description, tags }: HeroSectionProps) {
  return (
    <div className="bg-brand-softserve p-10 rounded-lg">
      <h1 className="text-5xl font-poly-median mt-4 mb-4 leading-tight text-brand-content-primary">{title}</h1>
      <p className="text-brand-content-secondary text-lg mb-6 max-w-3xl font-poly-neutral">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Chip key={index} icon={tag.icon} size="medium">
            {tag.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}
