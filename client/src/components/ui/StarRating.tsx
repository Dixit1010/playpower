import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  count?: number
  size?: number
}

function StarRating({ rating, count, size = 14 }: StarRatingProps) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <Star size={size} fill="currentColor" strokeWidth={0} aria-hidden="true" />
      <span>{rating.toFixed(2)}</span>
      {count !== undefined && <span className="text-ink-muted">· {count} Reviews</span>}
    </span>
  )
}

export default StarRating
