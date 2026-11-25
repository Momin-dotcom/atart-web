import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  artworks,
  galleryInfo,
  getArtwork,
  getRelatedArtworks,
} from '@/lib/gallery-data'
import { ScrollEngine } from '@/components/scroll-engine'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Arrow, ArrowLeft } from '@/components/arrow'

type WorkPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }))
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const artwork = getArtwork(slug)

  if (!artwork) {
    return { title: 'Work not found' }
  }

  const description = `${artwork.title} by ${artwork.artist}, ${artwork.medium}, ${artwork.year}. Part of the current hang at AT Art Gallery, Faisalabad.`

  return {
    title: `${artwork.title} by ${artwork.artist}`,
    description,
    openGraph: {
      title: `${artwork.title} by ${artwork.artist}`,
      description,
      type: 'article',
      images: [{ url: artwork.image, alt: `${artwork.title} by ${artwork.artist}` }],
    },
  }
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const artwork = getArtwork(slug)

  if (!artwork) notFound()

  const number = artworks.findIndex((work) => work.slug === artwork.slug) + 1
  const related = getRelatedArtworks(artwork.slug, 3)
  const smsBody = `Hello AT Art Gallery. I would like to ask about "${artwork.title}" by ${artwork.artist} (${artwork.year}).`
  const smsHref = `${galleryInfo.smsHref}?body=${encodeURIComponent(smsBody)}`

  const artworkSchema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    creator: { '@type': 'Person', name: artwork.artist },
    artMedium: artwork.medium,
    dateCreated: artwork.year,
    image: `https://atartgallery.pk${artwork.image}`,
    url: `https://atartgallery.pk/works/${artwork.slug}`,
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'The current hang at AT Art Gallery',
    },
  }

  return (
    <>
      <ScrollEngine />
      <SiteHeader />

      <main id="main" className="work-page">
        <div className="work-page__inner">
          <Link className="work-page__back" href="/#works">
            <ArrowLeft /> All works
          </Link>

          <div className="work-hero">
            <figure className="work-hero__figure">
              <div className="work-hero__frame">
                <div className="art-frame__window">
                  <img
                    className="work-hero__img"
                    src={artwork.image}
                    alt={`${artwork.title} by ${artwork.artist}`}
                    width={1024}
                    height={1024}
                  />
                </div>
              </div>
              <figcaption className="work-hero__caption">
                <span>No. {String(number).padStart(2, '0')} / 08</span>
                <span>
                  {artwork.collection} · {artwork.year}
                </span>
              </figcaption>
            </figure>

            <div className="work-hero__copy">
              <p className="label label--rust">
                {artwork.collection} · Current hang
              </p>
              <h1 className="work-hero__title">{artwork.title}</h1>
              <p className="work-hero__artist">
                {artwork.artist}
                <span>{artwork.year}</span>
              </p>

              <dl className="work-specs">
                <div>
                  <dt>Medium</dt>
                  <dd>{artwork.medium}</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{artwork.size}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>{artwork.year}</dd>
                </div>
                <div>
                  <dt>Collection</dt>
                  <dd>{artwork.collection}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>On the current hang</dd>
                </div>
              </dl>

              <div className="work-hero__actions">
                <a className="btn btn--solid" href={smsHref}>
                  Enquire by message <Arrow />
                </a>
                <a className="btn" href={galleryInfo.phoneHref}>
                  Call the gallery
                </a>
              </div>

              <p className="work-hero__note">
                This work is part of the current hang in Madina Town. Entry is
                free during opening hours. Availability and viewing arrangements
                are confirmed directly by the gallery; nothing is sold on this
                page.
              </p>
            </div>
          </div>

          <section className="more-works" aria-labelledby="more-works-title">
            <div className="more-works__head">
              <h2 id="more-works-title">More from the hang</h2>
              <Link href="/#works">See all eight</Link>
            </div>

            <div className="more-works__grid">
              {related.map((work) => (
                <a className="more-work" href={`/works/${work.slug}`} key={work.slug}>
                  <div className="more-work__frame">
                    <img
                      src={work.thumb}
                      alt={`${work.title} by ${work.artist}`}
                      loading="lazy"
                      width={720}
                      height={720}
                    />
                  </div>
                  <h3>{work.title}</h3>
                  <p>
                    {work.artist} · {work.year}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artworkSchema) }}
      />
    </>
  )
}
