import Photo from '../ui/Photo'
import type { Listing } from '../../api/listings'

interface SleepingArrangementsProps {
  arrangements: Listing['sleepingArrangements']
}

function SleepingArrangements({ arrangements }: SleepingArrangementsProps) {
  if (arrangements.length === 0) return null

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-ink">Where you'll sleep</h2>
      <div className="grid grid-cols-2 gap-4">
        {arrangements.map((area) => (
          <div key={area.room}>
            <Photo src={area.photoUrl} alt={area.room} className="h-48 w-full rounded-card" />
            <p className="mt-2 font-medium text-ink">{area.room}</p>
            <p className="text-sm text-ink-muted">{area.bedInfo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SleepingArrangements
