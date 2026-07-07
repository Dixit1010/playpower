import { Search, Globe, Menu, CircleUserRound } from 'lucide-react'
import IconButton from '../ui/IconButton'

function Logo() {
  return (
    <div className="flex items-center gap-2 text-rausch">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 2c1.9 3.6 8 15.4 8 19.4 0 4.6-3.6 8.6-8 8.6s-8-4-8-8.6C8 17.4 14.1 5.6 16 2z" />
      </svg>
      <span className="text-xl font-bold">airbnb</span>
    </div>
  )
}

function Header() {
  return (
    <header className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
      <Logo />

      <div className="flex items-center divide-x divide-line rounded-full border border-line shadow-sm">
        <button type="button" className="px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 rounded-l-full">
          Anywhere
        </button>
        <button type="button" className="px-4 py-2.5 text-sm font-medium hover:bg-neutral-50">
          Anytime
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-r-full px-4 py-2 text-sm text-ink-muted hover:bg-neutral-50"
        >
          Add guests
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rausch text-white">
            <Search size={14} aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button type="button" className="rounded-full px-4 py-2.5 text-sm font-medium hover:bg-neutral-100">
          Become a host
        </button>
        <IconButton label="Choose a language and region">
          <Globe size={18} aria-hidden="true" />
        </IconButton>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-line py-1.5 pl-3 pr-1.5 shadow-sm hover:shadow-md"
        >
          <Menu size={16} aria-hidden="true" />
          <CircleUserRound size={28} aria-hidden="true" className="text-ink-muted" />
          <span className="sr-only">Open user menu</span>
        </button>
      </div>
    </header>
  )
}

export default Header
