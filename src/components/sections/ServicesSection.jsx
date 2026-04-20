import { Link } from 'react-router-dom';

function ServicesSection({ whyChoose }) {
  return (
    <section className="section alt" id="services" aria-label="Services">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">Comfort you can rely on</div>
            <h2 className="h2">Stay close. Stay comfortable.</h2>
            <p className="muted">
              We carefully select hotels that provide easy access to the Haram
              and the Prophet&apos;s Mosque, clean and peaceful environments,
              options for every budget, and a relaxing space after long days of
              worship.
            </p>
          </div>
        </div>

        <div className="whyGrid">
          <div className="whyCard">
            <h3 className="whyTitle">Why choose A Way to Makkah?</h3>
            <ul className="whyList">
              {whyChoose.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="whyCard soft">
            <h3 className="whyTitle">Begin your spiritual journey today</h3>
            <p className="muted" style={{ maxWidth: 'none' }}>
              Let A Way to Makkah take care of the details, so you can focus on
              what truly matters. Your journey. Your worship. Your peace.
            </p>
            <Link className="btn btnPrimary" to="/#packages" style={{ marginTop: 14 }}>
              Explore packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
