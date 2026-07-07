import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  label: string
  variant?: 'ghost' | 'solid'
}

function IconButton({ children, label, variant = 'ghost', className = '', ...props }: IconButtonProps) {
  const styles =
    variant === 'solid'
      ? 'bg-white text-ink shadow-card hover:bg-neutral-100'
      : 'text-ink hover:bg-neutral-100'

  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
