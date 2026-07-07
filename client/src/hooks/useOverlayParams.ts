import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useOverlayParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const tourOpen = searchParams.has('tour')
  const photoIndex = searchParams.has('photo') ? Number(searchParams.get('photo')) : null

  const openTour = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('tour', '1')
      return next
    })
  }, [setSearchParams])

  const closeTour = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('tour')
      next.delete('photo')
      return next
    })
  }, [setSearchParams])

  const openPhoto = useCallback(
    (index: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('photo', String(index))
        return next
      })
    },
    [setSearchParams],
  )

  const setPhotoIndex = useCallback(
    (index: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('photo', String(index))
        return next
      })
    },
    [setSearchParams],
  )

  const closePhoto = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('photo')
      return next
    })
  }, [setSearchParams])

  return { tourOpen, photoIndex, openTour, closeTour, openPhoto, setPhotoIndex, closePhoto }
}
