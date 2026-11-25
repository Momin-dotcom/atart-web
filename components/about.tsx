import { galleryInfo } from '@/lib/gallery-data'

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="section__inner">
        <div className="about__grid">
          <div className="about__text" data-sc-in>
            <p className="label label--rust">The room</p>
            <h2 id="about-title">
              A gallery shaped around <em>the work.</em>
            </h2>

            <p className="about__body">
              AT Art Gallery is an independent gallery on the ground floor of
              19-Z Commercial Market in Madina Town. Its programme moves between
              painting, miniature, and mixed media, with room for established
              names and new voices from Faisalabad.
            </p>
            <p className="about__body">
              The doors are open daily from 12 to 8, and entry is free. The
              works in the current hang are documented here, and the gallery is
              glad to answer questions about any of them in person.
            </p>

            <blockquote className="about__quote">
              “Art should feel hand-cut, generous, and alive.”
              <span>A note from the gallery</span>
            </blockquote>
          </div>

          <figure className="about__figure" data-sc-in>
            <div className="about__frame">
              <img
                src="/artwork/gallery-interior.jpg"
                alt="A warm gallery interior with framed paintings and a visitor looking at the wall"
                width={600}
                height={1024}
                loading="lazy"
              />
            </div>
            <figcaption className="about__caption">
              <span>The room, Madina Town</span>
              <span>Open daily, {galleryInfo.hoursShort}</span>
            </figcaption>
          </figure>
        </div>

        <dl className="facts">
          <div className="fact">
            <dt className="fact__value">{galleryInfo.rating}</dt>
            <dd className="fact__label">
              Average Google rating from {galleryInfo.reviews} visitor reviews
            </dd>
          </div>
          <div className="fact">
            <dt className="fact__value">{galleryInfo.followers}</dt>
            <dd className="fact__label">Followers on Instagram</dd>
          </div>
          <div className="fact">
            <dt className="fact__value">{galleryInfo.posts}</dt>
            <dd className="fact__label">Posts shared on the gallery account</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
