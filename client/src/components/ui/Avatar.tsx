import { useState } from 'react'

interface AvatarProps {
  name: string
  src?: string
  size?: number
}

function Avatar({ name, src, size = 48 }: AvatarProps) {
  const [broken, setBroken] = useState(false)
  const initial = name.trim().charAt(0).toUpperCase()
  const style = { width: size, height: size }

  if (src && !broken) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        className="rounded-full object-cover"
        onError={() => setBroken(true)}
      />
    )
  }

  return (
    <div
      style={style}
      className="flex items-center justify-center rounded-full bg-ink text-white font-medium"
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}

export default Avatar
