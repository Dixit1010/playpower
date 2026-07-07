import { Leaf } from 'lucide-react'

interface RatingSummaryProps {
  rating: number
}

function RatingSummary({ rating }: RatingSummaryProps) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="flex items-center gap-6">
        <Leaf size={40} className="-scale-x-100 text-ink" aria-hidden="true" />
        <span className="text-6xl font-semibold text-ink">{rating.toFixed(2)}</span>
        <Leaf size={40} className="text-ink" aria-hidden="true" />
      </div>
      <p className="mt-4 text-2xl font-semibold text-ink">Guest favourite</p>
      <p className="mt-1 max-w-sm text-ink-muted">
        This home is a guest favourite based on ratings, reviews and reliability
      </p>
      <button type="button" className="mt-3 text-sm font-semibold underline">
        How reviews work
      </button>
    </div>
  )
}

export default RatingSummary
