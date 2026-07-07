import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChefHat,
  Wifi,
  Laptop,
  ParkingCircle,
  Waves,
  Bath,
  PawPrint,
  Camera,
  AlertTriangle,
  Siren,
  X,
  type LucideIcon,
} from 'lucide-react'
import Button from '../ui/Button'
import type { Listing } from '../../api/listings'

const ICONS: Record<string, LucideIcon> = {
  kitchen: ChefHat,
  wifi: Wifi,
  workspace: Laptop,
  parking: ParkingCircle,
  pool: Waves,
  'hot-tub': Bath,
  pets: PawPrint,
  camera: Camera,
  'co-alarm': AlertTriangle,
  'smoke-alarm': Siren,
}

interface AmenitiesProps {
  amenities: Listing['amenities']
  totalCount?: number
}

function AmenityRow({ amenity }: { amenity: Listing['amenities'][number] }) {
  const Icon = (amenity.icon && ICONS[amenity.icon]) || Wifi
  return (
    <div className="flex items-center gap-4 py-3">
      <Icon size={24} className="text-ink" aria-hidden="true" />
      <span className="text-ink-soft">{amenity.label}</span>
    </div>
  )
}

function Amenities({ amenities, totalCount }: AmenitiesProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-ink">What this place offers</h2>
      <div className="grid grid-cols-2 gap-x-8">
        {amenities.map((amenity) => (
          <AmenityRow key={amenity.label} amenity={amenity} />
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button variant="outline" className="mt-6">
            Show all {totalCount ?? amenities.length} amenities
          </Button>
        </Dialog.Trigger>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="fixed left-1/2 top-1/2 max-h-[85vh] w-[560px] overflow-y-auto rounded-2xl bg-white p-8 shadow-popover"
                  initial={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
                  animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                  exit={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Dialog.Title className="text-xl font-semibold">What this place offers</Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close"
                        className="rounded-full p-2 hover:bg-neutral-100"
                      >
                        <X size={20} aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="flex flex-col divide-y divide-line-soft">
                    {amenities.map((amenity) => (
                      <AmenityRow key={amenity.label} amenity={amenity} />
                    ))}
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  )
}

export default Amenities
