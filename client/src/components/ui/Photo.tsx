import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface PhotoProps {
  src: string
  alt: string
  className?: string
}

function Photo({ src, alt, className = '' }: PhotoProps) {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 bg-neutral-100 text-neutral-400 ${className}`}
      >
        <ImageOff size={20} aria-hidden="true" />
        <span className="px-2 text-center text-xs">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setBroken(true)}
    />
  )
}

export default Photo
