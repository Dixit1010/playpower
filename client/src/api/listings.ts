export interface Photo {
  room: string
  url: string
  alt: string
}

export interface Review {
  name: string
  avatarUrl?: string
  tenure?: string
  timeAgo?: string
  rating: number
  text: string
}

export interface NearbyListing {
  title: string
  photoUrl: string
  price: number
  rating: number
}

export interface Listing {
  _id: string
  title: string
  propertyType: string
  location: string
  guestCount: number
  bedroomCount: number
  bedCount: number
  bathroomCount: number

  rating: number
  reviewCount: number
  isGuestFavourite: boolean

  promo?: { text: string; termsText: string; ctaLabel: string }
  host: { name: string; avatarUrl?: string; yearsHosting?: number }
  highlights: { icon?: string; title: string; description: string }[]
  translationNotice?: string
  description: string

  sleepingArrangements: { room: string; bedInfo: string; photoUrl: string }[]

  amenities: { icon?: string; label: string }[]
  totalAmenitiesCount?: number

  price: { amount: number; currency: string; nights?: number }
  dateRange?: { checkIn: string; checkOut: string }
  cancellationPolicy?: string

  ratingBreakdown: {
    overall: number
    cleanliness: number
    accuracy: number
    checkIn: number
    communication: number
    location: number
    value: number
  }
  categoryTags: { label: string; count: number }[]
  reviews: Review[]

  neighborhood: { area: string; highlights: string }
  coordinates: { lat: number; lng: number }

  hostProfile: {
    name: string
    avatarUrl?: string
    reviewCount?: number
    rating?: number
    yearsHosting?: number
    responseRate?: string
    responseTime?: string
    coHosts: { name: string; avatarUrl?: string }[]
  }

  thingsToKnow: {
    cancellationPolicy: string[]
    houseRules: string[]
    safetyAndProperty: string[]
  }

  nearbyListings: NearbyListing[]
  photos: Photo[]
}

const API_URL = import.meta.env.VITE_API_URL ?? ''

export async function getListing(): Promise<Listing> {
  const res = await fetch(`${API_URL}/api/listing`)
  if (!res.ok) throw new Error(`Failed to load listing: ${res.status}`)
  return res.json()
}
