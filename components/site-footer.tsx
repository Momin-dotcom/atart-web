import { galleryInfo } from '@/lib/gallery-data'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Arrow } from '@/components/arrow'

type SiteFooterProps = {
  dark?: boolean
}

export function SiteFooter({ dark = false }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={`site-footer${dark ? ' site-footer--dark tone-dark' : ''}`}
    >
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div>
            <Link href="/" aria-label="AT Art Gallery, home">
              <Logo />
            </Link>
            <p className="site-footer__blurb">
              An independent gallery for the art of Faisalabad, with a changing
              hang, a live programme, and an open door in Madina Town.
            </p>
          </div>

          <div className="site-footer__nav">
            <div>
              <h3>Explore</h3>
              <ul>
                <li>
                  <Link href="/#works">The current hang</Link>
                </li>
                <li>
                  <Link href="/#programme">Programme</Link>
                </li>
                <li>
                  <Link href="/#about">About the gallery</Link>
                </li>
                <li>
                  <Link href="/#visit">Plan a visit</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3>Contact</h3>
              <ul>
                <li>
                  <a href={galleryInfo.phoneHref}>{galleryInfo.phone}</a>
                </li>
                <li>
                  <a
                    href={galleryInfo.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions <Arrow />
                  </a>
                </li>
                <li>
                  <a
                    href={galleryInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram <Arrow />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {galleryInfo.name}. {galleryInfo.city}.
          </p>
          <p>
            {galleryInfo.shortAddress} · Daily, {galleryInfo.hoursShort}
          </p>
        </div>
      </div>
    </footer>
  )
}
