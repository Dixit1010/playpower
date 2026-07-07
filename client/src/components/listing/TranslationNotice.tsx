interface TranslationNoticeProps {
  notice?: string
}

function TranslationNotice({ notice }: TranslationNoticeProps) {
  if (!notice) return null

  const [statement, action] = notice.split('. ')

  return (
    <p className="text-sm text-ink-muted">
      {statement}.{' '}
      {action && <button type="button" className="underline">{action}</button>}
    </p>
  )
}

export default TranslationNotice
