export interface CalendarDay {
  date: number
  iso: string
}

function toIsoDate(year: number, monthIndex: number, date: number): string {
  const d = new Date(year, monthIndex, date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function getMonthGrid(year: number, month: number): (CalendarDay | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (CalendarDay | null)[] = Array.from({ length: firstDay }, () => null)
  for (let date = 1; date <= daysInMonth; date++) {
    cells.push({ date, iso: toIsoDate(year, month, date) })
  }
  return cells
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
