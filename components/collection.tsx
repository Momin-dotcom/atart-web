'use client'

import { useMemo, useState } from 'react'
import {
  artworks,
  collectionOptions,
  mediumOptions,
  type CollectionFilter,
  type MediumFilter,
} from '@/lib/gallery-data'
import { Arrow } from '@/components/arrow'

const collectionCounts = collectionOptions.reduce<Record<string, number>>(
  (counts, option) => {
    counts[option] =
      option === 'All'
        ? artworks.length
        : artworks.filter((artwork) => artwork.collection === option).length
    return counts
  },
  {},
)

const mediumCounts = mediumOptions.reduce<Record<string, number>>(
  (counts, option) => {
    counts[option] =
      option === 'All'
        ? artworks.length
        : artworks.filter((artwork) => artwork.mediumGroup === option).length
    return counts
  },
  {},
)

const artistNames = Array.from(
  new Set(artworks.map((artwork) => artwork.artist)),
).sort((a, b) => a.localeCompare(b))

export function Collection() {
  const [collectionFilter, setCollectionFilter] =
    useState<CollectionFilter>('All')
  const [mediumFilter, setMediumFilter] = useState<MediumFilter>('All')
  const [artistQuery, setArtistQuery] = useState('')

  const filteredArtworks = useMemo(
    () =>
      artworks.filter((artwork) => {
        const matchesCollection =
          collectionFilter === 'All' ||
          artwork.collection === collectionFilter
        const matchesMedium =
          mediumFilter === 'All' || artwork.mediumGroup === mediumFilter
        const matchesArtist =
          artistQuery.trim().length === 0 ||
          artwork.artist
            .toLowerCase()
            .includes(artistQuery.trim().toLowerCase())

        return matchesCollection && matchesMedium && matchesArtist
      }),
    [artistQuery, collectionFilter, mediumFilter],
  )

  const hasFilters =
    collectionFilter !== 'All' || mediumFilter !== 'All' || artistQuery !== ''

  const reset = () => {
    setCollectionFilter('All')
    setMediumFilter('All')
    setArtistQuery('')
  }

  return (
    <section className="section collection" id="works" aria-labelledby="works-title">
      <div className="section__inner">
        <div className="section-head" data-sc-in>
          <p className="label label--rust">The current hang</p>
          <h2 id="works-title">Eight works, one room.</h2>
          <p>
            The full hang, labelled with the same facts you will find on the
            wall. Filter by collection, medium, or artist, then open a work for
            its catalogue entry.
          </p>
        </div>

        <div className="hang-tools" role="group" aria-label="Filter the collection">
          <div className="filter-group" aria-label="Filter by collection">
            {collectionOptions.map((option) => (
              <button
                className="filter-btn"
                type="button"
                key={option}
                onClick={() => setCollectionFilter(option)}
                aria-pressed={collectionFilter === option}
                aria-label={`${option}, ${collectionCounts[option]} ${
                  collectionCounts[option] === 1 ? 'work' : 'works'
                }`}
              >
                {option}
                <span aria-hidden="true">
                  {String(collectionCounts[option]).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>

          <div className="tool-fields">
            <label className="tool-field">
              <span>Artist</span>
              <input
                type="search"
                value={artistQuery}
                onChange={(event) => setArtistQuery(event.target.value)}
                placeholder="Search by name"
                autoComplete="off"
              />
            </label>

            <label className="tool-field">
              <span>Medium</span>
              <select
                value={mediumFilter}
                onChange={(event) =>
                  setMediumFilter(event.target.value as MediumFilter)
                }
              >
                {mediumOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} ({mediumCounts[option]})
                  </option>
                ))}
              </select>
            </label>

            {hasFilters && (
              <button className="tool-reset" type="button" onClick={reset}>
                Reset filters
              </button>
            )}
          </div>
        </div>

        <div className="hang-summary" aria-live="polite">
          <p>
            Showing {String(filteredArtworks.length).padStart(2, '0')} of{' '}
            {String(artworks.length).padStart(2, '0')} works
          </p>
          <p>
            {hasFilters
              ? 'Filtered view'
              : 'The order follows the wall, left to right'}
          </p>
        </div>

        <div className="hang-grid">
          {filteredArtworks.map((artwork, index) => (
            <figure className="work" key={artwork.slug}>
              <a className="work__link" href={`/works/${artwork.slug}`}>
                <div className="work__frame">
                  <div className="work__window">
                    <img
                      src={artwork.thumb}
                      alt={`${artwork.title} by ${artwork.artist}`}
                      loading="lazy"
                      width={720}
                      height={720}
                    />
                  </div>
                </div>

                <div className="work__label">
                  <span className="work__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="work__title">{artwork.title}</h3>
                    <span className="work__artist">{artwork.artist}</span>
                    <span className="work__spec">
                      {artwork.medium} · {artwork.size} · {artwork.year}
                    </span>
                  </div>
                  <span className="work__view">
                    View <Arrow />
                  </span>
                </div>
              </a>
            </figure>
          ))}

          {filteredArtworks.length === 0 && (
            <div className="hang-empty">
              <div>
                <h3>No works match that combination.</h3>
                <p>Try a different medium, collection, or artist name.</p>
              </div>
              <button className="btn" type="button" onClick={reset}>
                Show all eight
              </button>
            </div>
          )}
        </div>

        <div className="artists-index" id="artists">
          <p className="label">Artists in the hang</p>
          <ul aria-label="Filter by artist">
            {artistNames.map((artist) => {
              const active = artistQuery === artist
              return (
                <li key={artist}>
                  <button
                    type="button"
                    data-active={active}
                    aria-pressed={active}
                    onClick={() => setArtistQuery(active ? '' : artist)}
                  >
                    {artist}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
