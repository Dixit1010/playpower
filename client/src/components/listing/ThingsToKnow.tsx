import { CalendarX, ScrollText, ShieldAlert } from 'lucide-react'
import type { Listing } from '../../api/listings'

interface ThingsToKnowProps {
  thingsToKnow: Listing['thingsToKnow']
}

const COLUMNS: { key: keyof Listing['thingsToKnow']; title: string; icon: typeof CalendarX }[] = [
  { key: 'cancellationPolicy', title: 'Cancellation policy', icon: CalendarX },
  { key: 'houseRules', title: 'House rules', icon: ScrollText },
  { key: 'safetyAndProperty', title: 'Safety & property', icon: ShieldAlert },
]

function ThingsToKnow({ thingsToKnow }: ThingsToKnowProps) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-ink">Things to know</h2>
      <div className="grid grid-cols-3 gap-8">
        {COLUMNS.map(({ key, title, icon: Icon }) => (
          <div key={key}>
            <div className="mb-3 flex items-center gap-2 font-semibold text-ink">
              <Icon size={20} aria-hidden="true" />
              {title}
            </div>
            <ul className="flex flex-col gap-1 text-sm text-ink-soft">
              {thingsToKnow[key].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <button type="button" className="mt-2 text-sm font-semibold underline">
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThingsToKnow
