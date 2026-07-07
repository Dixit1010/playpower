import { Schema, model } from 'mongoose'

const opts = { _id: false }

const PhotoSchema = new Schema(
  { room: String, url: { type: String, required: true }, alt: { type: String, required: true } },
  opts,
)

const HighlightSchema = new Schema(
  { icon: String, title: { type: String, required: true }, description: { type: String, required: true } },
  opts,
)

const SleepingAreaSchema = new Schema(
  { room: { type: String, required: true }, bedInfo: { type: String, required: true }, photoUrl: { type: String, required: true } },
  opts,
)

const AmenitySchema = new Schema({ icon: String, label: { type: String, required: true } }, opts)

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    avatarUrl: String,
    tenure: String,
    timeAgo: String,
    rating: { type: Number, required: true },
    text: { type: String, required: true },
  },
  opts,
)

const CoHostSchema = new Schema({ name: { type: String, required: true }, avatarUrl: String }, opts)

const CategoryTagSchema = new Schema({ label: { type: String, required: true }, count: { type: Number, required: true } }, opts)

const NearbyListingSchema = new Schema(
  {
    title: { type: String, required: true },
    photoUrl: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
  },
  opts,
)

const ListingSchema = new Schema({
  title: { type: String, required: true },
  propertyType: { type: String, required: true },
  location: { type: String, required: true },
  guestCount: { type: Number, required: true },
  bedroomCount: { type: Number, required: true },
  bedCount: { type: Number, required: true },
  bathroomCount: { type: Number, required: true },

  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  isGuestFavourite: { type: Boolean, default: false },

  promo: {
    text: String,
    termsText: String,
    ctaLabel: String,
  },

  host: {
    name: { type: String, required: true },
    avatarUrl: String,
    yearsHosting: Number,
  },

  highlights: { type: [HighlightSchema], default: [] },
  translationNotice: String,
  description: { type: String, required: true },

  sleepingArrangements: { type: [SleepingAreaSchema], default: [] },

  amenities: { type: [AmenitySchema], default: [] },
  totalAmenitiesCount: Number,

  price: { amount: { type: Number, required: true }, currency: { type: String, default: '₹' }, nights: Number },
  dateRange: { checkIn: String, checkOut: String },
  cancellationPolicy: String,

  ratingBreakdown: {
    overall: Number,
    cleanliness: Number,
    accuracy: Number,
    checkIn: Number,
    communication: Number,
    location: Number,
    value: Number,
  },
  categoryTags: { type: [CategoryTagSchema], default: [] },
  reviews: { type: [ReviewSchema], default: [] },

  neighborhood: { area: String, highlights: String },
  coordinates: { lat: { type: Number, required: true }, lng: { type: Number, required: true } },

  hostProfile: {
    name: { type: String, required: true },
    avatarUrl: String,
    reviewCount: Number,
    rating: Number,
    yearsHosting: Number,
    responseRate: String,
    responseTime: String,
    coHosts: { type: [CoHostSchema], default: [] },
  },

  thingsToKnow: {
    cancellationPolicy: { type: [String], default: [] },
    houseRules: { type: [String], default: [] },
    safetyAndProperty: { type: [String], default: [] },
  },

  nearbyListings: { type: [NearbyListingSchema], default: [] },

  photos: { type: [PhotoSchema], default: [] },
})

export const Listing = model('Listing', ListingSchema)
