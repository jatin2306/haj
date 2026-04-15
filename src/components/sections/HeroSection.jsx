import heroBg from '../../assets/home.jpeg';

function HeroSection({ contact }) {
  return (
    <section className="hero" aria-label="Home">
      <div
        className="heroBg"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11, 15, 23, 0.34), rgba(11, 15, 23, 0.5)), url(${heroBg})`,
        }}
        aria-hidden="true"
      />
      <div className="container heroGrid">
        <div className="heroCopy">
          <div className="pill">
            <span className="dot" aria-hidden="true" />
            Over 15 years serving pilgrims
          </div>
          <h1 className="heroTitle">
            Your Journey to Makkah&nbsp;!
            <br />
            Starts Here
          </h1>
          <p className="heroLead">
            At A Way to Makkah, we combine experience, care, and excellence to
            deliver a truly seamless Umrah journey. From the moment you book
            with us, every detail is taken care of, so you can focus fully on
            your worship and spiritual connection.
          </p>

          <div className="heroActions">
            <a className="btn btnPrimary" href="#packages">
              View Umrah packages
            </a>
            <a className="btn btnSoft" href="#about">
              About us
            </a>
          </div>

          <div className="heroStats" role="list" aria-label="Highlights">
            <div className="stat" role="listitem">
              <div className="statValue">15+ years</div>
              <div className="statLabel">Experience</div>
            </div>
            <div className="stat" role="listitem">
              <div className="statValue">Makkah &amp; Madinah</div>
              <div className="statLabel">Local guides</div>
            </div>
            <div className="stat" role="listitem">
              <div className="statValue">Personalised</div>
              <div className="statLabel">Packages</div>
            </div>
          </div>
        </div>

        <div className="heroCard" aria-label="Package summary">
          <div className="heroCardTop">
            <div className="heroCardTitle">Complete Umrah packages</div>
            <div className="heroCardBadge">Designed around you</div>
          </div>
          <p className="heroCardIntro">
            We provide everything you need for a stress-free and spiritually
            fulfilling journey to Makkah and Madinah.
          </p>
          <ul className="checkList">
            <li>
              <span className="check" aria-hidden="true" />
              <span>
                <strong>Accommodation</strong> - Comfortable hotels close to
                the holy sites.
              </span>
            </li>
            <li>
              <span className="check" aria-hidden="true" />
              <span>
                <strong>Visa processing</strong> - We take care of the full visa
                process.
              </span>
            </li>
            <li>
              <span className="check" aria-hidden="true" />
              <span>
                <strong>Flights</strong> - Well-planned, reliable flights
                tailored to your schedule (where included).
              </span>
            </li>
            <li>
              <span className="check" aria-hidden="true" />
              <span>
                <strong>Transfers</strong> - Airport and local transport from
                arrival to departure.
              </span>
            </li>
            <li>
              <span className="check" aria-hidden="true" />
              <span>
                <strong>Ziyarah tours</strong> - Guided visits to landmarks with
                experienced local guides.
              </span>
            </li>
          </ul>

          <div className="heroCardDivider" />

          <div className="miniForm" id="contact-quick" aria-label="Contact">
            <div className="miniFormTitle">Speak to our team</div>
            <p className="miniFormNote" style={{ marginBottom: 12 }}>
              Office {contact.office} · Mobile {contact.mobile}
            </p>
            <a className="btn btnPrimary btnFull" href="#contact">
              Contact details
            </a>
            <div className="miniFormNote">{contact.email}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
