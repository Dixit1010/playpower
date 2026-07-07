import { Sparkles, CheckCircle2, DoorOpen, MessageCircle, MapPin, Tag } from 'lucide-react'
import type { Listing } from '../../api/listings'

interface RatingBreakdownProps {
  breakdown: Listing['ratingBreakdown']
}

const STATS: { key: keyof Listing['ratingBreakdown']; label: string; icon: typeof Sparkles }[] = [
  { key: 'cleanliness', label: 'Cleanliness', icon: Sparkles },
  { key: 'accuracy', label: 'Accuracy', icon: CheckCircle2 },
  { key: 'checkIn', label: 'Check-in', icon: DoorOpen },
  { key: 'communication', label: 'Communication', icon: MessageCircle },
  { key: 'location', label: 'Location', icon: MapPin },
  { key: 'value', label: 'Value', icon: Tag },
]

function RatingBreakdown({ breakdown }: RatingBreakdownProps) {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div>
        <p className="mb-3 text-sm font-medium text-ink">Overall rating</p>
        <div className="flex flex-col gap-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 text-xs text-ink-muted">
              <span className="w-2">{star}</span>
              <div className="h-1 flex-1 rounded-full bg-neutral-200">
                <div
                  className="h-1 rounded-full bg-ink"
                  style={{ width: star === Math.round(breakdown.overall) ? '95%' : star < breakdown.overall ? '4%' : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4">
        {STATS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between gap-2 pr-6">
            <span className="text-sm text-ink">{label}</span>
            <span className="flex items-center gap-1 text-sm font-medium text-ink">
              {breakdown[key].toFixed(1)}
              <Icon size={14} aria-hidden="true" />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RatingBreakdown
