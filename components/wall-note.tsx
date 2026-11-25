export function WallNote() {
  return (
    <section className="wall-note" aria-label="A note on looking">
      <div className="wall-note__inner">
        <blockquote data-sc-in>
          “A painting is not finished when the brush stops.
          <br />
          <em>It is finished when you stand still.</em>”
        </blockquote>

        <div className="wall-note__aside">
          <p className="label">Wall note, room one</p>
          <p>
            The next room is darker and closer. Nothing to buy, nowhere to
            hurry. Just one painting and the time to look at how it was made.
          </p>
        </div>
      </div>
    </section>
  )
}
