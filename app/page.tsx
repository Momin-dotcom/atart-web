import { ScrollEngine } from '@/components/scroll-engine'
import { SiteHeader } from '@/components/site-header'
import { Landing } from '@/components/landing'
import { Collection } from '@/components/collection'
import { WallNote } from '@/components/wall-note'
import { Loupe } from '@/components/loupe'
import { Programme } from '@/components/programme'
import { About } from '@/components/about'
import { Visit } from '@/components/visit'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <>
      <ScrollEngine />
      <SiteHeader />
      <main id="main">
        <Landing />
        <Collection />
        <WallNote />
        <Loupe />
        <Programme />
        <About />
        <Visit />
      </main>
      <SiteFooter dark />
    </>
  )
}
