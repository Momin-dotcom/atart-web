'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Arrow } from '@/components/arrow'
import { Logo } from '@/components/logo'
import { featuredArtwork, galleryInfo } from '@/lib/gallery-data'

type LandingEntry = {
  label: string
  index: string
  href: string
  note: string
  tone: 'charcoal' | 'rust' | 'paper' | 'clay'
  image: string
}

const entries: LandingEntry[] = [
  {
    label: 'Work',
    index: '01',
    href: '#works',
    note: 'The current hang',
    tone: 'charcoal',
    image: '/artwork/works/word-and-colour.jpg',
  },
  {
    label: 'Story',
    index: '02',
    href: '#about',
    note: 'About the gallery',
    tone: 'rust',
    image: '/artwork/works/the-weaver.jpg',
  },
  {
    label: 'Calendar',
    index: '03',
    href: '#programme',
    note: 'Talks, openings, dates',
    tone: 'paper',
    image: '/artwork/works/clock-tower-at-dusk.jpg',
  },
  {
    label: 'Contact',
    index: '04',
    href: '#visit',
    note: 'Plan a visit',
    tone: 'clay',
    image: '/artwork/gallery-interior.jpg',
  },
]

export function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const menuId = useId()

  useEffect(() => {
    if (!menuOpen) return

    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [menuOpen])

  return (
    <>
      <section className="landing" id="top" aria-labelledby="landing-title">
        <div className="landing__panel">
          <div className="landing__top">
            <a href="#top" className="landing__brand" aria-label="AT Art Gallery, top of page">
              <Logo />
            </a>

            <button
              type="button"
              className="landing__menu-btn"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen(true)}
            >
              <span className="landing__menu-lines" aria-hidden="true">
                <i />
                <i />
              </span>
              Menu
            </button>
          </div>

          <div className="landing__copy">
            <p className="landing__eyebrow">
              {galleryInfo.name} · {galleryInfo.city}
            </p>

            <h1 className="landing__title" id="landing-title">
              Follow
              <br />
              the art<span aria-hidden="true">.</span>
            </h1>

            <p className="landing__quote">
              No doubt the artist is the child of his time; but woe to him if he
              is also its disciple, or even its favourite.
            </p>

            <a className="landing__enter" href="#works">
              Enter the gallery <Arrow />
            </a>
          </div>

          <figure className="landing__thumb">
            <a href="#works" className="landing__thumb-link">
              <span className="landing__thumb-frame">
                <img
                  src={featuredArtwork.thumb}
                  alt={`${featuredArtwork.title} by ${featuredArtwork.artist}`}
                  width={480}
                  height={320}
                />
              </span>
              <figcaption className="landing__thumb-caption">
                <span>Home</span> / The most popular galleries
              </figcaption>
            </a>
          </figure>
        </div>

        <nav className="landing__rail" aria-label="Gallery sections">
          {entries.map((entry, i) => (
            <a
              key={entry.href}
              className={`landing-bar landing-bar--${entry.tone}`}
              href={entry.href}
              style={{ animationDelay: `${140 + i * 90}ms` }}
            >
              <img
                className="landing-bar__img"
                src={entry.image}
                alt=""
                aria-hidden="true"
                loading="eager"
              />
              <span className="landing-bar__wash" aria-hidden="true" />
              <span className="landing-bar__scrim" aria-hidden="true" />

              <span className="landing-bar__index" aria-hidden="true">
                {entry.index}
              </span>

              <span className="landing-bar__label">{entry.label}</span>

              <span className="landing-bar__note" aria-hidden="true">
                {entry.note}
              </span>

              <span className="landing-bar__go" aria-hidden="true">
                View <Arrow />
              </span>
            </a>
          ))}
        </nav>
      </section>

      {menuOpen && (
        <div
          className="landing-menu"
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery menu"
        >
          <div className="landing-menu__bar">
            <a href="#top" onClick={() => setMenuOpen(false)} aria-label="AT Art Gallery, top of page">
              <Logo />
            </a>
            <button
              type="button"
              className="landing-menu__close"
              onClick={() => setMenuOpen(false)}
              ref={closeRef}
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className="landing-menu__list" aria-label="Menu">
            {entries.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                className="landing-menu__row"
                onClick={() => setMenuOpen(false)}
              >
                <span className="landing-menu__num">{entry.index}</span>
                <span className="landing-menu__label">{entry.label}</span>
                <span className="landing-menu__note">{entry.note}</span>
                <Arrow />
              </a>
            ))}
          </nav>

          <div className="landing-menu__foot">
            <p>
              {galleryInfo.shortAddress} · Open daily, {galleryInfo.hoursShort}
            </p>
            <nav aria-label="Contact links">
              <a href={galleryInfo.phoneHref}>{galleryInfo.phone}</a>
              <a
                href={galleryInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a href={galleryInfo.directionsUrl} target="_blank" rel="noopener noreferrer">
                Directions <Arrow />
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
