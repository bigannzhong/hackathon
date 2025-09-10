import Image from "next/image"
import Link from "next/link" // Import Link

/**
 * A component to display a category with a thumbnail image and a label below it.
 * @param {object} props - Component props.
 * @param {string} props.imageUrl - The URL for the category image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.label - The label for the category.
 * @param {string} props.quantity - The quantity of items in the category.
 * @param {string} [props.href] - Optional URL to navigate to when the category is clicked.
 */
interface ItemCategoryProps {
  imageUrl: string
  alt: string
  label: string
  quantity?: string // Make quantity optional as it's not always displayed in the dashboard context
  href?: string // New prop for navigation
}

export function ItemCategory({ imageUrl, alt, label, quantity, href = "/search" }: ItemCategoryProps) {
  return (
    <Link href={href} className="flex flex-col items-start w-[180px] flex-shrink-0 group">
      <div className="relative w-full aspect-square rounded-md overflow-hidden mb-2">
        <Image
          src={imageUrl || "/abstract-category-thumbnail-fallback.png"}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="rounded-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="text-[#191919] text-lg font-bold leading-tight">{label}</p>
      {quantity && <p className="text-[#707070] text-sm">{quantity}</p>}
    </Link>
  )
}
