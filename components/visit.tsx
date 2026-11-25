'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { galleryInfo } from '@/lib/gallery-data'
import { Arrow } from '@/components/arrow'

export function Visit() {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [openedHref, setOpenedHref] = useState('')

  const message = useMemo(() => {
    const who = name.trim() ? `My name is ${name.trim()}. ` : ''
    const body = note.trim() || 'I would like to ask about a work in the gallery.'
    return `Hello AT Art Gallery. ${who}${body}`
  }, [name, note])

  const smsHref = `${galleryInfo.smsHref}?body=${encodeURIComponent(message)}`

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!note.trim()) {
      setStatus('Write a short note first, then open it in your messages app.')
      setOpenedHref('')
      return
    }

    setOpenedHref(smsHref)
    setStatus(
      'Opening your messaging app with this note. Nothing is sent until you press send there.',
    )

    try {
      window.location.href = smsHref
    } catch {
      setStatus(
        `Your messaging app did not open. Call the gallery instead on ${galleryInfo.phone}.`,
      )
    }
  }

  return (
    <section
      className="visit tone-dark"
      id="visit"
      aria-labelledby="visit-title"
    >
      <div className="visit__inner">
        <p className="label label--rust">Plan a visit</p>
        <h2 id="visit-title">
          The door is open. <em>Come and stand in front of it.</em>
        </h2>
        <p className="visit__intro">
          The gallery is on the ground floor in Madina Town, open every day from
          12 to 8. Entry is free. Call ahead if you are travelling for a
          particular work or event.
        </p>

        <div className="visit__grid">
          <div>
            <dl className="visit__details">
              <div className="detail-row">
                <dt>Address</dt>
                <dd>
                  <a
                    href={galleryInfo.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {galleryInfo.address}
                  </a>
                </dd>
              </div>
              <div className="detail-row">
                <dt>Hours</dt>
                <dd>Daily, {galleryInfo.hours}</dd>
              </div>
              <div className="detail-row">
                <dt>Phone</dt>
                <dd>
                  <a href={galleryInfo.phoneHref}>{galleryInfo.phone}</a>
                </dd>
              </div>
              <div className="detail-row">
                <dt>Instagram</dt>
                <dd>
                  <a
                    href={galleryInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{galleryInfo.instagram}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="visit__actions">
              <a
                className="btn btn--solid"
                href={galleryInfo.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <Arrow />
              </a>
              <a className="btn btn--ghost" href={galleryInfo.phoneHref}>
                Call the gallery
              </a>
            </div>
          </div>

          <div className="visit__map">
            <iframe
              title="Map showing AT Art Gallery in Madina Town, Faisalabad"
              src={galleryInfo.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="visit__map-caption">
              <span>19-Z Commercial Market, Madina Town</span>
              <a
                href={galleryInfo.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps <Arrow />
              </a>
            </div>
          </div>
        </div>

        <div className="visit__note">
          <div>
            <h3>
              Ask before <em>you visit.</em>
            </h3>
            <p className="visit__note-copy">
              Write a note here and open it in your phone&apos;s messaging app,
              addressed to the gallery. This page does not send or store
              anything itself.
            </p>
          </div>

          <form className="inquiry-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor="visit-name">Your name</label>
                <input
                  id="visit-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Optional"
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="visit-note">Your note</label>
                <textarea
                  id="visit-note"
                  name="note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="I would like to ask about Crimson Reverie."
                  rows={3}
                  aria-describedby="visit-form-note"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn--rust" type="submit">
                Open in Messages <Arrow />
              </button>
              <a className="btn btn--ghost" href={galleryInfo.phoneHref}>
                Or call {galleryInfo.phone}
              </a>
            </div>

            <p className="form-note" id="visit-form-note">
              Nothing is sent from this page. Your phone opens a draft message
              addressed to {galleryInfo.phone}, and you choose whether to send
              it.
            </p>

            {status && (
              <p className="form-status" role="status" aria-live="polite">
                {status}
                {openedHref && (
                  <>
                    {' '}
                    <a href={openedHref}>Open the draft again.</a>
                  </>
                )}
              </p>
            )}
          </form>
        </div>

        <div className="visit__closing">
          <p>
            The best way to see it is <em>in the room.</em>
          </p>
          <a
            className="btn btn--solid"
            href={galleryInfo.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Plan the route <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
