import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'dark'
  pill?: boolean
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-rausch to-rausch-darker text-white hover:brightness-95 shadow-sm',
  outline: 'bg-white text-ink border border-ink hover:bg-neutral-50',
  dark: 'bg-ink text-white hover:bg-black',
}

function Button({ variant = 'outline', pill = false, className = '', ...props }: ButtonProps) {
  const radius = pill ? 'rounded-full' : 'rounded-lg'
  return (
    <button
      className={`inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${radius} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

export default Button
