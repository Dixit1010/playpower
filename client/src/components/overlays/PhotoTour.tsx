import { useMemo } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Photo from '../ui/Photo'
import type { Photo as PhotoData } from '../../api/listings'

interface PhotoTourProps {
  title: string
  photos: PhotoData[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onPhotoClick: (index: number) => void
}

function groupByRoom(photos: PhotoData[]) {
  const groups: { room: string; photos: { photo: PhotoData; index: number }[] }[] = []
  photos.forEach((photo, index) => {
    const room = photo.room || 'Photos'
    const existing = groups.find((g) => g.room === room)
    if (existing) existing.photos.push({ photo, index })
    else groups.push({ room, photos: [{ photo, index }] })
  })
  return groups
}

function PhotoTour({ title, photos, open, onOpenChange, onPhotoClick }: PhotoTourProps) {
  const groups = useMemo(() => groupByRoom(photos), [photos])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-40 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-0 z-40 overflow-y-auto bg-white focus:outline-none"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Dialog.Title className="sr-only">{title} — all photos</Dialog.Title>

                <div className="sticky top-0 z-10 flex items-center border-b border-line-soft bg-white px-6 py-4">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close photo tour"
                      className="rounded-full p-2 hover:bg-neutral-100"
                    >
                      <X size={20} aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="mx-auto max-w-3xl px-6 py-8">
                  {groups.map((group) => (
                    <section key={group.room} className="mb-10">
                      <h3 className="mb-3 text-lg font-semibold text-ink">{group.room}</h3>
                      <div className="flex flex-col gap-4">
                        {group.photos.map(({ photo, index }) => (
                          <button
                            key={photo.url}
                            type="button"
                            onClick={() => onPhotoClick(index)}
                            className="group overflow-hidden rounded-card"
                          >
                            <Photo
                              src={photo.url}
                              alt={photo.alt}
                              className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          </button>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default PhotoTour
