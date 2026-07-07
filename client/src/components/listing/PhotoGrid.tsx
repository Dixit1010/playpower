import { LayoutGrid } from 'lucide-react'
import Photo from '../ui/Photo'
import type { Photo as PhotoData } from '../../api/listings'

interface PhotoGridProps {
  photos: PhotoData[]
  onOpenPhotoTour: (startIndex: number) => void
}

function Tile({
  photo,
  index,
  className,
  onOpenPhotoTour,
}: {
  photo: PhotoData
  index: number
  className: string
  onOpenPhotoTour: (startIndex: number) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenPhotoTour(index)}
      className={`group relative overflow-hidden ${className}`}
    >
      <Photo src={photo.url} alt={photo.alt} className="h-full w-full" />
      <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
    </button>
  )
}

function PhotoGrid({ photos, onOpenPhotoTour }: PhotoGridProps) {
  const [hero, ...rest] = photos

  return (
    <div className="relative mx-auto grid h-[480px] max-w-content grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-grid">
      {hero && (
        <Tile
          photo={hero}
          index={0}
          className="col-span-2 row-span-2 h-full"
          onOpenPhotoTour={onOpenPhotoTour}
        />
      )}
      {rest.slice(0, 4).map((photo, i) => (
        <Tile
          key={photo.url}
          photo={photo}
          index={i + 1}
          className="col-span-1 row-span-1 h-full"
          onOpenPhotoTour={onOpenPhotoTour}
        />
      ))}

      <button
        type="button"
        onClick={() => onOpenPhotoTour(0)}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-ink bg-white px-3 py-2 text-sm font-semibold shadow-card hover:bg-neutral-50"
      >
        <LayoutGrid size={16} aria-hidden="true" />
        Show all photos
      </button>
    </div>
  )
}

export default PhotoGrid
