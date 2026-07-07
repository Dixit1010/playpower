import { Plus, Minus, Maximize, Search, MapPin } from 'lucide-react'
import type { Listing } from '../../api/listings'

interface LocationMapProps {
  neighborhood: Listing['neighborhood']
}

function LocationMap({ neighborhood }: LocationMapProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-ink">Where you'll be</h2>

      <div className="relative h-80 overflow-hidden rounded-card bg-[#e8ecef]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(120deg, #cfe0e8 40%, #e8ecef 40%), repeating-linear-gradient(0deg, transparent 0 38px, rgba(0,0,0,0.04) 38px 39px), repeating-linear-gradient(90deg, transparent 0 38px, rgba(0,0,0,0.04) 38px 39px)',
          }}
          aria-hidden="true"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink p-2 text-white shadow-card">
          <MapPin size={20} aria-hidden="true" />
        </div>
        <span className="absolute bottom-3 left-3 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
          {neighborhood.area}
        </span>
        <div className="absolute right-3 top-3 flex flex-col divide-y divide-line overflow-hidden rounded-md bg-white shadow-sm">
          <button type="button" aria-label="Zoom in" className="p-2 hover:bg-neutral-100">
            <Plus size={16} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Zoom out" className="p-2 hover:bg-neutral-100">
            <Minus size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          <button type="button" aria-label="Expand map" className="rounded-md bg-white p-2 shadow-sm hover:bg-neutral-100">
            <Maximize size={16} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Search this area" className="rounded-md bg-white p-2 shadow-sm hover:bg-neutral-100">
            <Search size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-muted">Exact location will be provided after booking.</p>

      <h3 className="mt-6 font-semibold text-ink">Neighbourhood highlights</h3>
      <p className="mt-1 text-ink-soft">{neighborhood.highlights}</p>
      <button type="button" className="mt-1 font-semibold text-ink underline">
        Show more &gt;
      </button>
    </div>
  )
}

export default LocationMap
