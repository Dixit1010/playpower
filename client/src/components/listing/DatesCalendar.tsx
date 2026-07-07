import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getMonthGrid, MONTH_NAMES, WEEKDAY_LABELS } from '../../lib/calendar'
import type { Listing } from '../../api/listings'

interface DatesCalendarProps {
  dateRange: NonNullable<Listing['dateRange']>
  nights?: number
  location: string
}

function formatShort(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function normalizeMonth(year: number, monthIndex: number) {
  const d = new Date(year, monthIndex, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

function Month({
  year,
  monthIndex,
  checkIn,
  checkOut,
}: {
  year: number
  monthIndex: number
  checkIn: string
  checkOut: string
}) {
  const { year: y, month } = normalizeMonth(year, monthIndex)
  const cells = getMonthGrid(y, month)

  return (
    <div className="flex-1">
      <p className="mb-4 text-center font-medium text-ink">
        {MONTH_NAMES[month]} {y}
      </p>
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-ink-muted">
        {WEEKDAY_LABELS.map((label, i) => (
          <span key={`${label}-${i}`}>{label}</span>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <span key={`empty-${i}`} />
          const inRange = cell.iso >= checkIn && cell.iso <= checkOut
          const isEndpoint = cell.iso === checkIn || cell.iso === checkOut
          return (
            <span
              key={cell.iso}
              className={`flex h-9 w-9 items-center justify-center justify-self-center rounded-full text-sm ${
                isEndpoint ? 'bg-ink text-white' : inRange ? 'bg-neutral-200 text-ink' : 'text-ink'
              }`}
            >
              {cell.date}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function DatesCalendar({ dateRange, nights, location }: DatesCalendarProps) {
  const checkInDate = new Date(dateRange.checkIn)
  const baseYear = checkInDate.getFullYear()
  const baseMonth = checkInDate.getMonth()

  const [monthOffset, setMonthOffset] = useState(0)

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">
        {nights} night{nights === 1 ? '' : 's'} in {location.split(',')[0]}
      </h2>
      <p className="mt-1 text-ink-muted">
        {formatShort(dateRange.checkIn)} - {formatShort(dateRange.checkOut)}
      </p>

      <div className="mt-6 flex items-start gap-8">
        <button
          type="button"
          aria-label="Previous month"
          disabled={monthOffset <= 0}
          onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
          className="mt-8 rounded-full p-2 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <Month year={baseYear} monthIndex={baseMonth + monthOffset} checkIn={dateRange.checkIn} checkOut={dateRange.checkOut} />
        <Month
          year={baseYear}
          monthIndex={baseMonth + monthOffset + 1}
          checkIn={dateRange.checkIn}
          checkOut={dateRange.checkOut}
        />
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonthOffset((o) => o + 1)}
          className="mt-8 rounded-full p-2 hover:bg-neutral-100"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 text-right">
        <button type="button" className="text-sm font-semibold underline">
          Clear dates
        </button>
      </div>
    </div>
  )
}

export default DatesCalendar
