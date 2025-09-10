import Image from "next/image"

/**
 * A card component for displaying an author's circular avatar and name.
 * @param {object} props - Component props.
 * @param {string} props.imageUrl - The URL for the author's avatar image.
 * @param {string} props.authorName - The name of the author.
 */
interface AuthorCardProps {
  imageUrl: string
  authorName: string
}

export function AuthorCard({ imageUrl, authorName }: AuthorCardProps) {
  return (
    <div className="flex flex-col items-center text-center w-[120px] flex-shrink-0">
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border border-gray-200">
        <Image
          src={imageUrl || "/abstract-author-card-fallback.png"}
          alt={authorName}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className="text-sm font-medium text-[#191919]">{authorName}</p>
    </div>
  )
}
