import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AT Art Gallery · Contemporary art in Faisalabad',
    template: '%s · AT Art Gallery',
  },
  description:
    'A gallery for the art of Faisalabad. Eight works on the current hang, a live programme of exhibitions and artist talks, and an open door in Madina Town.',
  metadataBase: new URL('https://atartgallery.pk'),
  openGraph: {
    title: 'AT Art Gallery · Contemporary art in Faisalabad',
    description:
      'Eight works on the current hang, a live programme of exhibitions and artist talks, and an open door in Madina Town.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'AT Art Gallery',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#F3EDE3',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <span data-sc-progress aria-hidden="true" />
        <div className="sc-grain page-grain" aria-hidden="true" />
        <noscript>
          <style>{`
            [data-sc-cue], [data-sc-in], [data-sc-stagger] > * { opacity: 1 !important; transform: none !important; }
            [data-sc-reveal] { clip-path: none !important; }
            .loupe__stage { position: relative !important; height: auto !important; }
          `}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
