export type Artwork = {
  slug: string
  title: string
  artist: string
  medium: string
  mediumGroup: 'Painting' | 'Mixed Media' | 'Works on Paper'
  collection: 'City Stories' | 'Heritage Lines' | 'New Voices'
  year: string
  image: string
  thumb: string
  size: string
}

export const artworks: Artwork[] = [
  {
    slug: 'crimson-reverie',
    title: 'Crimson Reverie',
    artist: 'Aliyah Khan',
    medium: 'Oil on canvas',
    mediumGroup: 'Painting',
    collection: 'New Voices',
    year: '2023',
    image: '/artwork/works/crimson-reverie.jpg',
    thumb: '/artwork/works/crimson-reverie-thumb.jpg',
    size: '90 × 120 cm',
  },
  {
    slug: 'golden-threads',
    title: 'Golden Threads',
    artist: 'Imran Qureshi',
    medium: 'Gouache & gold leaf',
    mediumGroup: 'Works on Paper',
    collection: 'Heritage Lines',
    year: '2022',
    image: '/artwork/works/golden-threads.jpg',
    thumb: '/artwork/works/golden-threads-thumb.jpg',
    size: '60 × 80 cm',
  },
  {
    slug: 'the-weaver',
    title: 'The Weaver',
    artist: 'Sana Malik',
    medium: 'Oil on canvas',
    mediumGroup: 'Painting',
    collection: 'New Voices',
    year: '2024',
    image: '/artwork/works/the-weaver.jpg',
    thumb: '/artwork/works/the-weaver-thumb.jpg',
    size: '75 × 100 cm',
  },
  {
    slug: 'word-and-colour',
    title: 'Word & Colour',
    artist: 'Farhan Ali',
    medium: 'Acrylic & ink',
    mediumGroup: 'Mixed Media',
    collection: 'City Stories',
    year: '2023',
    image: '/artwork/works/word-and-colour.jpg',
    thumb: '/artwork/works/word-and-colour-thumb.jpg',
    size: '100 × 100 cm',
  },
  {
    slug: 'clock-tower-at-dusk',
    title: 'Clock Tower at Dusk',
    artist: 'Zeeshan Haider',
    medium: 'Oil on board',
    mediumGroup: 'Painting',
    collection: 'City Stories',
    year: '2021',
    image: '/artwork/works/clock-tower-at-dusk.jpg',
    thumb: '/artwork/works/clock-tower-at-dusk-thumb.jpg',
    size: '50 × 70 cm',
  },
  {
    slug: 'still-life-in-red',
    title: 'Still Life in Red',
    artist: 'Nadia Rehman',
    medium: 'Oil on canvas',
    mediumGroup: 'Painting',
    collection: 'Heritage Lines',
    year: '2022',
    image: '/artwork/works/still-life-in-red.jpg',
    thumb: '/artwork/works/still-life-in-red-thumb.jpg',
    size: '65 × 85 cm',
  },
  {
    slug: 'fractured-light',
    title: 'Fractured Light',
    artist: 'Bilal Ahmed',
    medium: 'Acrylic on canvas',
    mediumGroup: 'Mixed Media',
    collection: 'New Voices',
    year: '2024',
    image: '/artwork/works/fractured-light.jpg',
    thumb: '/artwork/works/fractured-light-thumb.jpg',
    size: '110 × 140 cm',
  },
  {
    slug: 'punjab-fields',
    title: 'Punjab Fields',
    artist: 'Hina Shah',
    medium: 'Oil on canvas',
    mediumGroup: 'Painting',
    collection: 'City Stories',
    year: '2023',
    image: '/artwork/works/punjab-fields.jpg',
    thumb: '/artwork/works/punjab-fields-thumb.jpg',
    size: '80 × 120 cm',
  },
]

export const featuredArtwork = artworks[0]

export function getArtwork(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug)
}

export function getRelatedArtworks(slug: string, limit = 3) {
  const current = getArtwork(slug)
  if (!current) return artworks.slice(0, limit)

  const sameCollection = artworks.filter(
    (artwork) => artwork.slug !== slug && artwork.collection === current.collection,
  )
  const rest = artworks.filter(
    (artwork) =>
      artwork.slug !== slug && artwork.collection !== current.collection,
  )

  return [...sameCollection, ...rest].slice(0, limit)
}

export const collectionOptions = [
  'All',
  'City Stories',
  'Heritage Lines',
  'New Voices',
] as const

export const mediumOptions = [
  'All',
  'Painting',
  'Mixed Media',
  'Works on Paper',
] as const

export type CollectionFilter = (typeof collectionOptions)[number]
export type MediumFilter = (typeof mediumOptions)[number]

export const exhibitions = [
  {
    title: 'Threads of Heritage',
    date: 'Opening 18 July 2026',
    description:
      'A group exhibition celebrating traditional miniature techniques reimagined by a new generation of Faisalabad artists.',
    status: 'Upcoming',
  },
  {
    title: 'Colour of the City',
    date: '2 – 30 June 2026',
    description:
      'Urban landscapes and street life capturing the energy of Faisalabad, its markets, and its clock tower.',
    status: 'On View',
  },
  {
    title: 'Artist Talk: The Living Line',
    date: '24 May 2026 · 5 PM',
    description:
      'An evening conversation with contemporary calligraphers on the meeting point of script and abstraction.',
    status: 'Past',
  },
] as const

export const galleryInfo = {
  name: 'AT Art Gallery',
  city: 'Faisalabad',
  rating: '4.8',
  reviews: '201',
  followers: '6,918',
  posts: '818',
  address:
    'Ground Floor, 19-Z Commercial Market, Block Z, Madina Town, Faisalabad 38000',
  shortAddress: '19-Z Commercial Market, Madina Town',
  phone: '0300 4442717',
  phoneHref: 'tel:+923004442717',
  smsHref: 'sms:+923004442717',
  hours: '12 PM – 8 PM',
  hoursShort: '12 to 8, daily',
  instagram: 'atartgalleryfaisalabad',
  instagramUrl: 'https://instagram.com/atartgalleryfaisalabad',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=AT+Art+Gallery+19-Z+Commercial+Market+Madina+Town+Faisalabad',
  mapEmbedUrl:
    'https://www.google.com/maps?q=AT+Art+Gallery+19-Z+Commercial+Market+Madina+Town+Faisalabad&output=embed',
}
