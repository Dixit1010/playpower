import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Photo from '../ui/Photo'
import type { NearbyListing } from '../../api/listings'

interface NearbyListingsProps {
  listings: NearbyListing[]
}

const PAGE_SIZE = 4

function NearbyListings({ listings }: NearbyListingsProps) {
  const [page, setPage] = useState(0)
  const pageCount = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
  const visible = listings.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">More stays nearby</h2>
        <div className="flex items-center gap-3 text-sm text-ink-muted">
          <span>
            {page + 1}/{pageCount}
          </span>
          <button
            type="button"
            aria-label="Previous stays"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-full border border-line p-1.5 disabled:opacity-40"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next stays"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="rounded-full border border-line p-1.5 disabled:opacity-40"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {visible.map((item) => (
          <div key={item.title}>
            <Photo src={item.photoUrl} alt={item.title} className="h-40 w-full rounded-card" />
            <p className="mt-2 truncate text-sm font-medium text-ink">{item.title}</p>
            <p className="text-sm text-ink-soft">
              ₹{item.price.toLocaleString('en-IN')} ·{' '}
              <span className="inline-flex items-center gap-0.5">
                <Star size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                {item.rating}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NearbyListings
