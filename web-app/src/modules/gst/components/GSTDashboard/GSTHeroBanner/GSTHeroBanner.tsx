import './GSTHeroBanner.css'

export const GSTHeroBanner = () => {
  return (
    <section className="gst-hero-banner" aria-labelledby="gst-hero-title">
      <div className="gst-hero-banner__header">
        <h1 id="gst-hero-title" className="gst-hero-banner__title">
          Goods &amp; Services Tax
        </h1>
        <p className="gst-hero-banner__description">
          Registration through to annual compliance, handled by your dedicated GST executive.
          Track your active filings, manage compliance, or start a new GST application.
        </p>
      </div>
    </section>
  )
}
