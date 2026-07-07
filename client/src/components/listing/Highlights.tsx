import { Trees, Snowflake, KeyRound, type LucideIcon } from 'lucide-react'
import type { Listing } from '../../api/listings'

const ICONS: Record<string, LucideIcon> = {
  outdoor: Trees,
  cool: Snowflake,
  'self-checkin': KeyRound,
}

interface HighlightsProps {
  highlights: Listing['highlights']
}

function Highlights({ highlights }: HighlightsProps) {
  return (
    <ul className="flex flex-col gap-6">
      {highlights.map((highlight) => {
        const Icon = (highlight.icon && ICONS[highlight.icon]) || KeyRound
        return (
          <li key={highlight.title} className="flex items-start gap-4">
            <Icon size={24} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
            <div>
              <p className="font-medium text-ink">{highlight.title}</p>
              <p className="text-sm text-ink-muted">{highlight.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Highlights
