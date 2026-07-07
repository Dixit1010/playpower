import { useState } from 'react'
import { Star } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import type { Review } from '../../api/listings'

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > 160
  const preview = isLong && !expanded ? `${review.text.slice(0, 160)}…` : review.text

  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar name={review.name} src={review.avatarUrl} size={44} />
        <div>
          <p className="font-medium text-ink">{review.name}</p>
          <p className="text-xs text-ink-muted">{review.tenure}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-ink-muted">
        <span className="flex" aria-hidden="true">
          {Array.from({ length: review.rating }, (_, i) => (
            <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <span className="sr-only">{review.rating} out of 5 stars</span>
        {review.timeAgo && <span className="text-xs">· {review.timeAgo}</span>}
      </div>
      <p className="mt-2 text-ink-soft">{preview}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 font-semibold text-ink underline"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

interface ReviewsGridProps {
  reviews: Review[]
  totalCount: number
}

function ReviewsGrid({ reviews, totalCount }: ReviewsGridProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {reviews.map((review) => (
          <ReviewCard key={`${review.name}-${review.timeAgo}`} review={review} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline">Show all {totalCount} reviews</Button>
      </div>
    </div>
  )
}

export default ReviewsGrid
