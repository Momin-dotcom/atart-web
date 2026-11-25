import { exhibitions, galleryInfo } from '@/lib/gallery-data'
import { Arrow } from '@/components/arrow'

export function Programme() {
  return (
    <section
      className="section programme"
      id="programme"
      aria-labelledby="programme-title"
    >
      <div className="section__inner">
        <div className="programme__head">
          <div className="section-head" data-sc-in>
            <p className="label label--rust">Programme</p>
            <h2 id="programme-title">Dates on the wall.</h2>
            <p>
              Exhibitions, openings, and conversations as they are scheduled.
              Status is kept plain: what is on view, what comes next, and what
              has already happened.
            </p>
          </div>

          <a
            className="btn"
            href={galleryInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow the programme <Arrow />
          </a>
        </div>

        <div className="ledger">
          {exhibitions.map((exhibition) => (
            <article className="event" key={exhibition.title}>
              <p className="event__date">{exhibition.date}</p>
              <div className="event__body">
                <h3 className="event__title">{exhibition.title}</h3>
                <p className="event__desc">{exhibition.description}</p>
              </div>
              <p className="event__status" data-status={exhibition.status}>
                {exhibition.status}
              </p>
            </article>
          ))}
        </div>

        <div className="programme__foot">
          <p>
            Dates can move. Call the gallery before travelling for a specific
            event.
          </p>
          <a href={galleryInfo.phoneHref}>
            {galleryInfo.phone} <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
