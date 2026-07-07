import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useArrowKeys } from '../../hooks/useArrowKeys'
import type { Photo } from '../../api/listings'

interface LightboxProps {
  photos: Photo[]
  index: number
  onIndexChange: (index: number) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

function Lightbox({ photos, index, onIndexChange, open, onOpenChange }: LightboxProps) {
  const goPrev = () => onIndexChange((index - 1 + photos.length) % photos.length)
  const goNext = () => onIndexChange((index + 1) % photos.length)

  useArrowKeys(open, goPrev, goNext)

  const photo = photos[index]

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && photo && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-label={`Photo viewer, image ${index + 1} of ${photos.length}`}>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center focus:outline-none"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Dialog.Title className="sr-only">{photo.alt}</Dialog.Title>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close photo viewer"
                    className="absolute right-6 top-6 z-10 rounded-full p-2 text-white hover:bg-white/10"
                  >
                    <X size={24} aria-hidden="true" />
                  </button>
                </Dialog.Close>

                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 transition-transform hover:scale-105 hover:bg-white disabled:opacity-30"
                  disabled={photos.length <= 1}
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={photo.url}
                    src={photo.url}
                    alt={photo.alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-[90vh] max-w-[90vw] object-contain"
                  />
                </AnimatePresence>

                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 transition-transform hover:scale-105 hover:bg-white disabled:opacity-30"
                  disabled={photos.length <= 1}
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>

                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                  {index + 1} / {photos.length}
                </span>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default Lightbox
