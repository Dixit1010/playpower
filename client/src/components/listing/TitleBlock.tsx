import { Share, Heart } from 'lucide-react'

interface TitleBlockProps {
  title: string
}

function TitleBlock({ title }: TitleBlockProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      <div className="flex shrink-0 items-center gap-4 text-sm font-medium">
        <button type="button" className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-neutral-100">
          <Share size={16} aria-hidden="true" />
          Share
        </button>
        <button type="button" className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-neutral-100">
          <Heart size={16} aria-hidden="true" />
          Save
        </button>
      </div>
    </div>
  )
}

export default TitleBlock
