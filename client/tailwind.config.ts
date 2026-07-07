import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rausch: {
          DEFAULT: '#FF385C',
          dark: '#E61E4D',
          darker: '#D70466',
        },
        ink: {
          DEFAULT: '#222222',
          soft: '#484848',
          muted: '#717171',
        },
        line: {
          DEFAULT: '#DDDDDD',
          soft: '#EBEBEB',
        },
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '12px',
        grid: '16px',
      },
      boxShadow: {
        card: '0 6px 16px rgba(0,0,0,0.12)',
        popover: '0 6px 20px rgba(0,0,0,0.2)',
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
} satisfies Config
