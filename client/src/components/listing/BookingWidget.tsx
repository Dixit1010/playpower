import Button from '../ui/Button'
import type { Listing } from '../../api/listings'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
}

interface BookingWidgetProps {
  listing: Listing
}

function BookingWidget({ listing }: BookingWidgetProps) {
  const { price, dateRange, cancellationPolicy, guestCount, promo } = listing

  return (
    <div className="sticky top-6 rounded-2xl border border-line-soft p-6 shadow-card">
      <p className="text-lg">
        <span className="font-semibold text-ink">
          {price.currency}
          {price.amount.toLocaleString('en-IN')}
        </span>{' '}
        <span className="text-ink-muted">for {price.nights} nights</span>
      </p>

      {promo && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-line-soft px-3 py-2 text-sm">
          <span>
            {promo.text} · <span className="underline text-ink-muted">{promo.termsText}</span>
          </span>
          <button type="button" className="font-semibold underline">
            {promo.ctaLabel}
          </button>
        </div>
      )}

      {dateRange && (
        <div className="mt-4 grid grid-cols-2 divide-x divide-line rounded-lg border border-line">
          <label className="px-3 py-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wide">Check-in</span>
            <span className="text-sm">{formatDate(dateRange.checkIn)}</span>
          </label>
          <label className="px-3 py-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wide">Checkout</span>
            <span className="text-sm">{formatDate(dateRange.checkOut)}</span>
          </label>
        </div>
      )}

      <label className="mt-2 block rounded-lg border border-line px-3 py-2">
        <span className="block text-[10px] font-semibold uppercase tracking-wide">Guests</span>
        <span className="text-sm">{guestCount} guests</span>
      </label>

      {cancellationPolicy && (
        <p className="mt-4 text-sm font-medium text-green-700">{cancellationPolicy}</p>
      )}

      <Button variant="primary" pill className="mt-4 w-full py-3.5 text-base">
        Reserve
      </Button>

      <p className="mt-3 text-center text-sm text-ink-muted">You won't be charged yet</p>
    </div>
  )
}

export default BookingWidget
