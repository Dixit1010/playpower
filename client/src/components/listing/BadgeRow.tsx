import StarRating from '../ui/StarRating'
import Button from '../ui/Button'
import type { Listing } from '../../api/listings'

interface BadgeRowProps {
  listing: Listing
}

function BadgeRow({ listing }: BadgeRowProps) {
  if (!listing.isGuestFavourite && !listing.promo) return null

  return (
    <div className="grid grid-cols-2 gap-4">
      {listing.isGuestFavourite && (
        <div className="rounded-card border border-line-soft bg-neutral-50 p-4">
          <p className="font-semibold text-ink">Guest favourite</p>
          <p className="mt-1 text-sm text-ink-muted">
            One of the most loved homes on Airbnb, according to guests
          </p>
          <div className="mt-3">
            <StarRating rating={listing.rating} count={listing.reviewCount} />
          </div>
        </div>
      )}

      {listing.promo && (
        <div className="flex items-center justify-between rounded-card border border-line-soft p-4">
          <div>
            <p className="font-semibold text-ink">{listing.promo.text}</p>
            <p className="text-sm text-ink-muted underline">{listing.promo.termsText}</p>
          </div>
          <Button pill className="px-4 py-2">
            {listing.promo.ctaLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export default BadgeRow
