import { useEffect, useRef, useState } from 'react'
import { getListing, type Listing } from '../api/listings'
import Header from '../components/listing/Header'
import PhotoGrid from '../components/listing/PhotoGrid'
import TitleBlock from '../components/listing/TitleBlock'
import BadgeRow from '../components/listing/BadgeRow'
import HostRow from '../components/listing/HostRow'
import Highlights from '../components/listing/Highlights'
import TranslationNotice from '../components/listing/TranslationNotice'
import Description from '../components/listing/Description'
import SleepingArrangements from '../components/listing/SleepingArrangements'
import Amenities from '../components/listing/Amenities'
import BookingWidget from '../components/listing/BookingWidget'
import DatesCalendar from '../components/listing/DatesCalendar'
import RatingSummary from '../components/listing/RatingSummary'
import RatingBreakdown from '../components/listing/RatingBreakdown'
import CategoryTags from '../components/listing/CategoryTags'
import ReviewsGrid from '../components/listing/ReviewsGrid'
import LocationMap from '../components/listing/LocationMap'
import HostProfile from '../components/listing/HostProfile'
import ThingsToKnow from '../components/listing/ThingsToKnow'
import NearbyListings from '../components/listing/NearbyListings'
import Footer from '../components/listing/Footer'
import SectionDivider from '../components/ui/SectionDivider'
import PhotoTour from '../components/overlays/PhotoTour'
import Lightbox from '../components/overlays/Lightbox'
import { useOverlayParams } from '../hooks/useOverlayParams'

function ListingPage() {
  const [listing, setListing] = useState<Listing | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { tourOpen, photoIndex, openTour, closeTour, openPhoto, setPhotoIndex, closePhoto } = useOverlayParams()

  const tourTriggerRef = useRef<HTMLElement | null>(null)
  const photoTriggerRef = useRef<HTMLElement | null>(null)

  function handleOpenTour() {
    tourTriggerRef.current = document.activeElement as HTMLElement
    openTour()
  }

  function handleOpenPhoto(index: number) {
    photoTriggerRef.current = document.activeElement as HTMLElement
    openPhoto(index)
  }

  const tourWasOpen = useRef(false)
  useEffect(() => {
    if (tourWasOpen.current && !tourOpen) tourTriggerRef.current?.focus()
    tourWasOpen.current = tourOpen
  }, [tourOpen])

  const photoIsOpen = photoIndex !== null
  const photoWasOpen = useRef(false)
  useEffect(() => {
    if (photoWasOpen.current && !photoIsOpen) photoTriggerRef.current?.focus()
    photoWasOpen.current = photoIsOpen
  }, [photoIsOpen])

  useEffect(() => {
    getListing()
      .then(setListing)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>
  }

  if (!listing) {
    return <p className="p-8 text-center text-ink-muted">Loading…</p>
  }

  return (
    <div>
      <Header />

      <main className="mx-auto max-w-content px-6 pb-16">
        <PhotoGrid photos={listing.photos} onOpenPhotoTour={handleOpenTour} />

        <div className="mt-8 grid grid-cols-[1fr_380px] gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <TitleBlock title={listing.title} />
              <p className="mt-2 text-ink-soft">{listing.propertyType}</p>
              <p className="text-ink-soft">
                {listing.guestCount} guests · {listing.bedroomCount} bedroom · {listing.bedCount} bed ·{' '}
                {listing.bathroomCount} bathroom
              </p>
            </div>

            <SectionDivider />
            <BadgeRow listing={listing} />

            <SectionDivider />
            <HostRow name={listing.host.name} avatarUrl={listing.host.avatarUrl} yearsHosting={listing.host.yearsHosting} />

            <SectionDivider />
            <Highlights highlights={listing.highlights} />

            <SectionDivider />
            <TranslationNotice notice={listing.translationNotice} />
            <Description text={listing.description} />

            <SectionDivider />
            <SleepingArrangements arrangements={listing.sleepingArrangements} />

            <SectionDivider />
            <Amenities amenities={listing.amenities} totalCount={listing.totalAmenitiesCount} />

            {listing.dateRange && (
              <>
                <SectionDivider />
                <DatesCalendar dateRange={listing.dateRange} nights={listing.price.nights} location={listing.location} />
              </>
            )}
          </div>

          <div>
            <BookingWidget listing={listing} />
            <button type="button" className="mt-4 block w-full text-center text-sm underline text-ink-muted">
              Report this listing
            </button>
          </div>
        </div>

        <SectionDivider />
        <RatingSummary rating={listing.rating} />
        <div className="flex flex-col gap-8">
          <RatingBreakdown breakdown={listing.ratingBreakdown} />
          <CategoryTags tags={listing.categoryTags} />
          <ReviewsGrid reviews={listing.reviews} totalCount={listing.reviewCount} />
        </div>

        <SectionDivider />
        <LocationMap neighborhood={listing.neighborhood} />

        <SectionDivider />
        <HostProfile hostProfile={listing.hostProfile} />

        <SectionDivider />
        <ThingsToKnow thingsToKnow={listing.thingsToKnow} />

        <SectionDivider />
        <NearbyListings listings={listing.nearbyListings} />
      </main>

      <Footer />

      <PhotoTour
        title={listing.title}
        photos={listing.photos}
        open={tourOpen}
        onOpenChange={(next) => (next ? handleOpenTour() : closeTour())}
        onPhotoClick={handleOpenPhoto}
      />

      <Lightbox
        photos={listing.photos}
        index={photoIndex ?? 0}
        onIndexChange={setPhotoIndex}
        open={photoIndex !== null}
        onOpenChange={(next) => {
          if (!next) closePhoto()
        }}
      />
    </div>
  )
}

export default ListingPage
