import { ShieldCheck } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import type { Listing } from '../../api/listings'

interface HostProfileProps {
  hostProfile: Listing['hostProfile']
}

function HostProfile({ hostProfile }: HostProfileProps) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-ink">Meet your host</h2>

      <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-6">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-line-soft p-6">
          <Avatar name={hostProfile.name} src={hostProfile.avatarUrl} size={72} />
          <p className="font-semibold text-ink">{hostProfile.name}</p>
          <p className="text-sm text-ink-muted">Host</p>
          <div className="mt-2 w-full divide-y divide-line-soft text-center text-sm">
            {hostProfile.reviewCount !== undefined && (
              <p className="py-2">
                <span className="block font-semibold text-ink">{hostProfile.reviewCount.toLocaleString()}</span>
                Reviews
              </p>
            )}
            {hostProfile.rating !== undefined && (
              <p className="py-2">
                <span className="block font-semibold text-ink">{hostProfile.rating}★</span>
                Rating
              </p>
            )}
            {hostProfile.yearsHosting !== undefined && (
              <p className="py-2">
                <span className="block font-semibold text-ink">{hostProfile.yearsHosting}</span>
                Years hosting
              </p>
            )}
          </div>
        </div>

        <div>
          {hostProfile.coHosts.length > 0 && (
            <div>
              <p className="mb-3 font-semibold text-ink">Co-Hosts</p>
              <div className="grid grid-cols-3 gap-4">
                {hostProfile.coHosts.map((coHost) => (
                  <div key={coHost.name} className="flex items-center gap-2">
                    <Avatar name={coHost.name} src={coHost.avatarUrl} size={32} />
                    <span className="text-sm text-ink">{coHost.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 font-semibold text-ink">Host details</p>
            {hostProfile.responseRate && <p className="text-sm text-ink-soft">Response rate: {hostProfile.responseRate}</p>}
            {hostProfile.responseTime && <p className="text-sm text-ink-soft">Responds {hostProfile.responseTime}</p>}
          </div>

          <Button variant="dark" className="mt-4">
            Message host
          </Button>

          <p className="mt-4 flex items-start gap-2 text-xs text-ink-muted">
            <ShieldCheck size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            To help protect your payment, always use Airbnb to send money and communicate with hosts.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HostProfile
