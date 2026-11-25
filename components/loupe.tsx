'use client'

import { useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { featuredArtwork } from '@/lib/gallery-data'

type LensStyle = CSSProperties & {
  '--lx'?: string
  '--ly'?: string
}

export function Loupe() {
  const surfaceRef = useRef<HTMLDivElement | null>(null)
  const position = useRef({ x: 0.62, y: 0.42 })
  const dragging = useRef(false)

  const moveLens = (x: number, y: number) => {
    const nextX = Math.min(0.97, Math.max(0.03, x))
    const nextY = Math.min(0.97, Math.max(0.03, y))
    position.current = { x: nextX, y: nextY }

    const surface = surfaceRef.current
    if (!surface) return
    surface.style.setProperty('--lx', nextX.toFixed(4))
    surface.style.setProperty('--ly', nextY.toFixed(4))
  }

  const moveFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    moveLens(
      (event.clientX - rect.left) / rect.width,
      (event.clientY - rect.top) / rect.height,
    )
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' || dragging.current) {
      moveFromPointer(event)
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') dragging.current = true
    moveFromPointer(event)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 0.08 : 0.035
    const { x, y } = position.current

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveLens(x - step, y)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveLens(x + step, y)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveLens(x, y - step)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveLens(x, y + step)
    } else if (event.key === 'Home') {
      event.preventDefault()
      moveLens(0.62, 0.42)
    }
  }

  const initialStyle: LensStyle = { '--lx': '0.62', '--ly': '0.42' }

  return (
    <section
      className="loupe tone-dark"
      data-sc-act="pin"
      data-sc-span="3.4"
      aria-labelledby="loupe-title"
    >
      <div className="loupe__stage" data-sc-stage>
        <div className="loupe__copy" data-sc-cue="0.02">
          <p className="label label--rust">Close looking, room two</p>
          <h2 id="loupe-title">
            The paint is <em>still moving.</em>
          </h2>
          <p className="loupe__body">
            Step up to the surface of Crimson Reverie. The lens follows your
            pointer, your finger, or the arrow keys, and shows the brushwork at
            more than twice its printed size.
          </p>

          <dl className="loupe__meta">
            <div>
              <dt>Work</dt>
              <dd>{featuredArtwork.title}</dd>
            </div>
            <div>
              <dt>Artist</dt>
              <dd>{featuredArtwork.artist}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{featuredArtwork.medium}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{featuredArtwork.year}</dd>
            </div>
          </dl>

          <p className="loupe__hint" id="loupe-help">
            Drag, point, or use the arrow keys
          </p>
        </div>

        <figure className="loupe__art" data-sc-cue="0.06">
          <div className="loupe__frame">
            <div
              className="loupe__surface"
              ref={surfaceRef}
              style={initialStyle}
              tabIndex={0}
              role="group"
              aria-label="Inspect the surface of Crimson Reverie with the loupe"
              aria-describedby="loupe-help"
              onPointerMove={onPointerMove}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onPointerLeave={onPointerUp}
              onKeyDown={onKeyDown}
            >
              <img
                src={featuredArtwork.image}
                alt={`Surface detail of ${featuredArtwork.title} by ${featuredArtwork.artist}`}
                width={1024}
                height={1024}
              />
              <span className="loupe__lens" aria-hidden="true">
                <img src={featuredArtwork.image} alt="" width={1024} height={1024} />
              </span>
            </div>
          </div>
          <figcaption className="loupe__caption">
            <span>Lens, ×2.4</span>
            <span>{featuredArtwork.artist}, {featuredArtwork.year}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
