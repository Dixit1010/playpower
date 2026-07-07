import { useState } from 'react'

interface DescriptionProps {
  text: string
}

function Description({ text }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 220
  const preview = isLong && !expanded ? `${text.slice(0, 220)}…` : text

  return (
    <div>
      <p className="whitespace-pre-line text-ink-soft">{preview}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 font-semibold text-ink underline"
        >
          {expanded ? 'Show less' : 'Show more'} <span aria-hidden="true">{expanded ? '<' : '>'}</span>
        </button>
      )}
    </div>
  )
}

export default Description
