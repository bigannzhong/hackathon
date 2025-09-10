import Image from "next/image"

/**
 * A component to display a category with a thumbnail image and a label below it.
 * @param {object} props - Component props.
 * @param {string} props.imageUrl - The URL for the category image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.label - The label for the category.
 * @param {string} props.quantity - The quantity of items in the category.
 */
interface CategoryCardProps {
  imageUrl: string
  alt: string
  label: string
  quantity: string
}

export function CategoryCard({ imageUrl, alt, label, quantity }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-start w-[180px] flex-shrink-0">
      <div className="relative w-full aspect-square rounded-md overflow-hidden mb-2">
        <Image
          src={imageUrl || "/abstract-category-thumbnail-fallback.png"}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <p className="text-[#191919] text-lg font-bold leading-tight">{label}</p>
      <p className="text-[#707070] text-sm">{quantity}</p>
    </div>
  )
}
