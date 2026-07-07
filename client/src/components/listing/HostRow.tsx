import Avatar from '../ui/Avatar'

interface HostRowProps {
  name: string
  avatarUrl?: string
  yearsHosting?: number
}

function HostRow({ name, avatarUrl, yearsHosting }: HostRowProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar name={name} src={avatarUrl} size={56} />
      <div>
        <p className="font-semibold text-ink">Hosted by {name}</p>
        {yearsHosting !== undefined && (
          <p className="text-sm text-ink-muted">{yearsHosting} years hosting</p>
        )}
      </div>
    </div>
  )
}

export default HostRow
