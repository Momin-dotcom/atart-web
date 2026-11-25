'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { artworks, featuredArtwork, galleryInfo } from '@/lib/gallery-data'
import { Logo } from '@/components/logo'
import { Arrow } from '@/components/arrow'

type NavLink = {
  label: string
  hash: string
}

const navLinks: NavLink[] = [
  { label: 'Works', hash: '#works' },
  { label: 'Programme', hash: '#programme' },
  { label: 'About', hash: '#about' },
  { label: 'Visit', hash: '#visit' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [tucked, setTucked] = useState(false)
  const [activeWork, setActiveWork] = useState(0)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()

  const onHome = pathname === '/'
  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`)
  const preview = artworks[activeWork] ?? featuredArtwork

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      setTucked(
        pathname === '/' && window.scrollY < window.innerHeight * 0.7,
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header
        className={`site-header${scrolled ? ' is-scrolled' : ''}${
          tucked ? ' is-tucked' : ''
        }`}
      >
        <div className="site-header__inner">
        <Link href="/" aria-label="AT Art Gallery, home" onClick={close}>
          <Logo />
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={hrefFor(link.hash)}
              aria-current={
                link.hash === '#works' && pathname.startsWith('/works')
                  ? 'true'
                  : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="index-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="index-sheet"
          onClick={() => setOpen(true)}
        >
          <span className="index-glyph" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          Index
          <span className="index-trigger__count" aria-hidden="true">
            08
          </span>
        </button>
      </div>
      </header>

      {open && (
        <div
          className="index-overlay"
          id="index-sheet"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="index-overlay__bar">
            <Link href="/" onClick={close} aria-label="AT Art Gallery, home">
              <Logo />
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={close}
              ref={closeRef}
            >
              Close
            </button>
          </div>

          <div className="index-overlay__body">
            <div>
              <p className="label label--rust">The current hang</p>
              <h2 className="index-overlay__title" id={titleId}>
                Index of works
              </h2>

              <div className="index-list">
                {artworks.map((artwork, index) => (
                  <a
                    className="index-row"
                    key={artwork.slug}
                    href={`/works/${artwork.slug}`}
                    onMouseEnter={() => setActiveWork(index)}
                    onFocus={() => setActiveWork(index)}
                    onClick={close}
                  >
                    <span className="index-row__num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{artwork.title}</h3>
                      <p>{artwork.artist}</p>
                    </div>
                    <span className="index-row__year">{artwork.year}</span>
                  </a>
                ))}
              </div>
            </div>

            <aside className="index-preview" aria-live="polite">
              <div className="index-preview__frame">
                <img
                  src={preview.thumb}
                  alt={`${preview.title} by ${preview.artist}`}
                  width={720}
                  height={720}
                />
              </div>
              <p className="index-preview__caption">
                <span>{preview.title}</span>
                <span>{preview.collection}</span>
              </p>
            </aside>
          </div>

          <div className="index-overlay__foot">
            <p>
              {galleryInfo.shortAddress} · Open daily, {galleryInfo.hoursShort}
            </p>
            <nav aria-label="Gallery links">
              <a href={galleryInfo.phoneHref}>{galleryInfo.phone}</a>
              <a
                href={galleryInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a href={hrefFor('#visit')} onClick={close}>
                Plan a visit <Arrow />
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
