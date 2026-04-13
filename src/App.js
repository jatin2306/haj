import logo from './assets/logo.png';
import heroBg from './assets/hero-bg.jpeg';
import './App.css';

/** Content aligned to “AWAY TO MAKKAH CONTENTS - Google Docs.pdf” */
const CONTACT = {
  addressLines: ['Clifton', 'Bedfordshire'],
  office: '01582 616064',
  mobile: '07838 648097',
  whatsapp: '07838 648097',
  email: 'info@awaytomakkah.com',
};

const PACKAGES = [
  {
    id: '4-star-june-2026',
    title: '4 Star June Umrah Package 2026',
    tier: '4★',
    dates: '17 June – 30 June',
    madinah: '5 nights in 4* Shaza Regency Madinah',
    makkah: '5 nights in 4* Emaar Grand Makkah',
    includes: [
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
    ],
    prices: { quad: 555, triple: 655, twin: 755 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote:
      'Flights are not included with this package. Please call our agents for flights',
    earlyBird: null,
  },
  {
    id: '5-star-june-2026',
    title: '5 Star June Umrah Package 2026',
    tier: '5★',
    dates: '17 June – 30 June',
    madinah: '5 nights in 5* Jaydan Madinah',
    makkah: '5 nights in 5* Hilton Convention Makkah',
    includes: [
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
    ],
    prices: { quad: 695, triple: 795, twin: 895 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote:
      'Flights are not included with this package. Please call our agents for flights',
    earlyBird: null,
  },
  {
    id: '5-star-summer-2026',
    title: '5 Star Summer Holidays Umrah Package',
    tier: '5★',
    dates: '05 August – 15 August',
    madinah: '4 nights in 5* Worth Peninsula Madinah',
    makkah: '5 nights in 5* Address Hotel Makkah',
    includes: [
      'Flights with Qatar Airways (35 kg luggage allowance)',
      'Jummah in Makkah & Madinah',
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
      'Taif guided day tour',
      'Badr guided day tour',
    ],
    prices: { quad: 1399, triple: 1499, twin: 1599 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote: null,
    earlyBird: '10% early bird discount if booked before 01 June',
  },
  {
    id: '4-star-sept-2026',
    title: '4 Star September Umrah Package 2026',
    tier: '4★',
    dates: '05 September – 30 September',
    madinah: '5 nights in 4* Emaar Royal Madinah',
    makkah: '5 nights in 4* Emaar Grand Makkah',
    includes: [
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
    ],
    prices: { quad: 595, triple: 695, twin: 795 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote:
      'Flights are not included with this package. Please call our agents for flights',
    earlyBird: null,
  },
  {
    id: '5-star-oct-2026',
    title: '5 Star October Holidays Umrah Package',
    tier: '5★',
    dates: '17 October – 03 November',
    madinah: '5 nights in 5* Worth Peninsula Madinah',
    makkah: '5 nights in 5* Address Hotel Makkah',
    includes: [
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
    ],
    prices: { quad: 799, triple: 899, twin: 999 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote:
      'Flights are not included with this package. Please call our agents for flights',
    earlyBird: '10% early bird discount if booked before 01 June',
  },
  {
    id: '5-star-dec-2026',
    title: '5 Star December Holidays Umrah Package',
    tier: '5★',
    dates: '18 December – 03 January 2027',
    madinah: '5 nights in 5* Emaar Royal Madinah',
    makkah: '5 nights in 5* Marriott Hotel Makkah',
    includes: [
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
    ],
    prices: { quad: 799, triple: 920, twin: 1120 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote:
      'Flights are not included with this package. Please call our agents for flights',
    earlyBird: '10% early bird discount if booked before 01 June',
  },
  {
    id: '4-star-jan-2027',
    title: '4 Star January Umrah Package 2027',
    tier: '4★',
    dates: '12 January – 30 January',
    madinah: '5 nights in 4* Shaza Regency Madinah',
    makkah: '5 nights in 4* Emaar Grand Makkah',
    includes: [
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
    ],
    prices: { quad: 695, triple: 795, twin: 895 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote:
      'Flights are not included with this package. Please call our agents for flights',
    earlyBird: null,
  },
  {
    id: '5-star-jan-2027',
    title: '5 Star January Umrah Package 2027',
    tier: '5★',
    dates: '12 January – 30 January',
    madinah: '5 nights in 5* Jaydan Madinah',
    makkah: '5 nights in 5* Hilton Convention Makkah',
    includes: [
      'Guided ziyarah tours in Makkah',
      'Guided ziyarah tours in Madinah',
      'E-waiver visa (British passport)',
      'Full ground transport',
    ],
    prices: { quad: 795, triple: 895, twin: 995 },
    deposit: 250,
    breakfast: true,
    kids: 'Kids under 6yrs stay free with parents inc bb',
    flightsNote:
      'Flights are not included with this package. Please call our agents for flights',
    earlyBird: null,
  },
];

const BLOG_POSTS = [
  {
    title: 'Umrah Entry Exit Dates 2026 | When Does Umrah Close For Hajj 2026',
    excerpt:
      'The last entry date for pilgrims to offer their Umrah 2026 in Saudi Arabia is expected to be 3rd April 2026, with the last day of Umrah visa issuance 20th March 2026. Saudi authorities have declared that all pilgrims are required to depart by 18 April 2026, after which Makkah prepares for Hajj 2026.',
  },
  {
    title: 'Umrah 2026 Essentials Dates that You Need to Know',
    excerpt:
      'Final entry deadline: 3 April 2026 (15 Shawwal 1447). Mandatory departure: 18 April 2026 (1 Dhu al-Qadah 1447). UK nationals or tourist visa holders are recommended to depart from Makkah by 13 April 2026.',
  },
  {
    title: 'How to Plan a Stress-Free Umrah Journey in 2026/27',
    excerpt:
      'Careful planning helps with visa processing, itinerary management, and accommodations near revered sites. Evaluate your budget, research package inclusions, compare itineraries, and consult advisors to finalize a choice that balances value and spiritual focus.',
  },
  {
    title: 'Masjid Quba — First Mosque in Islam',
    excerpt:
      'The first mosque built by the Prophet Muhammad (peace be upon him) after the Hijrah from Makkah to Madinah. Visiting Quba is a common Sunnah for those visiting Madinah; the Prophet (peace be upon him) said that prayer there brings a reward like that of an Umrah.',
  },
];

const WHY_CHOOSE = [
  'Over 15 years of trusted experience',
  'Personalised Umrah packages',
  'Local guides in Makkah & Madinah',
  'Dedicated customer support',
  'A service built on trust, care, and sincerity',
];

function App() {
  const waHref = `https://wa.me/44${CONTACT.whatsapp.replace(/\s/g, '').slice(1)}`;
  const telOffice = `tel:+44${CONTACT.office.replace(/\s/g, '').slice(1)}`;
  const telMobile = `tel:+44${CONTACT.mobile.replace(/\s/g, '').slice(1)}`;

  return (
    <>
      <a className="skipLink" href="#content">
        Skip to content
      </a>

      <header className="nav">
        <div className="container navInner">
          <div className="brand">
            <img
              className="brandLogo"
              src={logo}
              alt="A Way to Makkah Umrah Services"
              loading="eager"
              decoding="async"
            />
          </div>

          <nav className="navLinks" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#packages">Packages</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="navCtas">
            <a className="btn btnGhost" href="#packages">
              View packages
            </a>
            <a className="btn btnPrimary" href="#contact">
              Contact us
            </a>
          </div>
        </div>
      </header>

      <div className="tt">
      <main id="content">
        <section className="hero" aria-label="Home">
          <div
            className="heroBg"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(247, 248, 252, 0.25), rgba(247, 248, 252, 0.98)), url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="container heroGrid">
            <div className="heroCopy">
              <div className="pill">
                <span className="dot" aria-hidden="true" />
                Over 15 years serving pilgrims
              </div>
              <h1 className="heroTitle">Your Journey to Makkah Starts Here</h1>
              <p className="heroLead">
                At A Way to Makkah, we combine experience, care, and excellence to deliver a
                truly seamless Umrah journey. From the moment you book with us, every detail
                is handled — so you can focus on your worship and spiritual connection.
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
                We provide everything you need for a stress-free and spiritually fulfilling
                journey to Makkah and Madinah.
              </p>
              <ul className="checkList">
                <li>
                  <span className="check" aria-hidden="true" />
                  <span>
                    <strong>Accommodation</strong> — Comfortable hotels close to the holy sites.
                  </span>
                </li>
                <li>
                  <span className="check" aria-hidden="true" />
                  <span>
                    <strong>Visa processing</strong> — We take care of the full visa process.
                  </span>
                </li>
                <li>
                  <span className="check" aria-hidden="true" />
                  <span>
                    <strong>Flights</strong> — Well-planned, reliable flights tailored to your
                    schedule (where included).
                  </span>
                </li>
                <li>
                  <span className="check" aria-hidden="true" />
                  <span>
                    <strong>Transfers</strong> — Airport and local transport from arrival to
                    departure.
                  </span>
                </li>
                <li>
                  <span className="check" aria-hidden="true" />
                  <span>
                    <strong>Ziyarah tours</strong> — Guided visits to landmarks with experienced
                    local guides.
                  </span>
                </li>
              </ul>

              <div className="heroCardDivider" />

              <div className="miniForm" id="contact-quick" aria-label="Contact">
                <div className="miniFormTitle">Speak to our team</div>
                <p className="miniFormNote" style={{ marginBottom: 12 }}>
                  Office {CONTACT.office} · Mobile {CONTACT.mobile}
                </p>
                <a className="btn btnPrimary btnFull" href="#contact">
                  Contact details
                </a>
                <div className="miniFormNote">{CONTACT.email}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="services" aria-label="Services">
          <div className="container">
            <div className="sectionHead">
              <div>
                <div className="kicker">Comfort you can rely on</div>
                <h2 className="h2">Stay close. Stay comfortable.</h2>
                <p className="muted">
                  We carefully select hotels that provide easy access to the Haram and the
                  Prophet&apos;s Mosque, clean and peaceful environments, options for every
                  budget, and a relaxing space after long days of worship.
                </p>
              </div>
            </div>

            <div className="whyGrid">
              <div className="whyCard">
                <h3 className="whyTitle">Why choose A Way to Makkah?</h3>
                <ul className="whyList">
                  {WHY_CHOOSE.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="whyCard soft">
                <h3 className="whyTitle">Begin your spiritual journey today</h3>
                <p className="muted" style={{ maxWidth: 'none' }}>
                  Let A Way to Makkah take care of the details, so you can focus on what truly
                  matters. Your journey. Your worship. Your peace.
                </p>
                <a className="btn btnPrimary" href="#packages" style={{ marginTop: 14 }}>
                  Explore packages
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-label="About us">
          <div className="container split">
            <div className="splitCopy">
              <div className="kicker">About us</div>
              <h2 className="h2">A Way to Makkah Umrah Services</h2>
              <p className="muted">
                At A Way to Makkah Umrah Services, we are dedicated to helping Muslims fulfil
                their sacred journey to Makkah and Madinah with ease, comfort, and peace of
                mind.
              </p>
              <p className="muted">
                With over 15 years of experience, we specialise in providing personalised Hajj
                and Umrah packages tailored to meet the unique needs of each pilgrim. Whether
                you are travelling alone, with family, or in a group, we ensure your journey is
                smooth, well-organised, and spiritually enriching.
              </p>
              <p className="muted">
                We take pride in offering dedicated local guides in Makkah and Madinah, who are
                there to support you throughout your stay. From guidance on rituals to
                on-the-ground assistance, our team ensures you feel confident, informed, and
                cared for at every step.
              </p>
              <p className="muted">
                Our packages also include guided tours to visit historical sites and significant
                locations in Makkah and Madinah, allowing you to deepen your understanding of
                Islamic history while enhancing your spiritual experience.
              </p>
              <p className="muted">
                Our services include visa assistance, flight bookings, carefully selected hotel
                accommodations close to the Haram, and reliable ground transportation. Every
                detail is managed with professionalism so you can focus entirely on your
                worship.
              </p>
              <p className="muted">
                What sets us apart is our commitment to sincerity, trust, and customer care. We
                strive to build lasting relationships with our clients by delivering a service
                that is transparent, reliable, and centred around your spiritual needs.
              </p>

              <div className="vmvGrid">
                <div className="vmv">
                  <div className="vmvLabel">Our vision</div>
                  <p className="vmvText">
                    To be a trusted name in Hajj and Umrah services, known for excellence, care,
                    and integrity.
                  </p>
                </div>
                <div className="vmv">
                  <div className="vmvLabel">Our mission</div>
                  <p className="vmvText">
                    To provide a seamless and spiritually fulfilling journey through personalised
                    service and expert guidance.
                  </p>
                </div>
                <div className="vmv">
                  <div className="vmvLabel">Our values</div>
                  <ul className="vmvList">
                    <li>Integrity and honesty</li>
                    <li>Personalised customer care</li>
                    <li>Spiritual responsibility</li>
                    <li>Quality and reliability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="splitMedia" aria-hidden="true">
              <div className="mediaCard">
                <div className="mediaTop">
                  <div className="mediaChip">Your journey</div>
                  <div className="mediaChip soft">Trusted care</div>
                </div>
                <div className="mediaTitle">Your journey to Makkah begins with us.</div>
                <div className="mediaText">
                  Dedicated support, clear communication, and guidance so you can travel with
                  confidence.
                </div>
                <div className="mediaBottom">
                  <div className="mediaMetric">
                    <div className="mediaMetricValue">Visa</div>
                    <div className="mediaMetricLabel">Assistance</div>
                  </div>
                  <div className="mediaMetric">
                    <div className="mediaMetricValue">Ground</div>
                    <div className="mediaMetricLabel">Transport</div>
                  </div>
                </div>
              </div>
              <div className="mediaGlow" />
            </div>
          </div>
        </section>

        <section className="section alt" id="packages" aria-label="Umrah packages">
          <div className="container">
            <div className="sectionHead">
              <div>
                <div className="kicker">Packages</div>
                <h2 className="h2">Umrah packages — dates and prices</h2>
                <p className="muted">
                  Prices shown are per person for room sharing as stated. £
                  {PACKAGES[0].deposit}.00 deposit with payment plan applies where listed.
                  Breakfast included unless otherwise stated on your booking. Confirm flight
                  arrangements with our agents for packages that do not include flights.
                </p>
              </div>
            </div>

            <div className="packageGrid">
              {PACKAGES.map((p) => (
                <article key={p.id} className="packageCard">
                  <div className="packageCardHead">
                    <span className="packageTier">{p.tier}</span>
                    <h3 className="packageCardTitle">{p.title}</h3>
                    <div className="packageDates">Travel dates: {p.dates}</div>
                  </div>
                  <div className="packageStays">
                    <div className="packageStay">
                      <span className="packageStayLabel">Madinah</span>
                      {p.madinah}
                    </div>
                    <div className="packageStay">
                      <span className="packageStayLabel">Makkah</span>
                      {p.makkah}
                    </div>
                  </div>
                  <ul className="packageIncludes">
                    {p.includes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <div className="priceGrid" aria-label="Prices per person">
                    <div className="priceCell">
                      <div className="priceLabel">Quad sharing</div>
                      <div className="priceValue">£{p.prices.quad.toFixed(2)}</div>
                    </div>
                    <div className="priceCell">
                      <div className="priceLabel">Triple sharing</div>
                      <div className="priceValue">£{p.prices.triple.toFixed(2)}</div>
                    </div>
                    <div className="priceCell">
                      <div className="priceLabel">Twin sharing</div>
                      <div className="priceValue">£{p.prices.twin.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="packageFoot">
                    <div>£{p.deposit.toFixed(2)} deposit with payment plan</div>
                    {p.breakfast ? <div>Breakfast included</div> : null}
                    <div>{p.kids}</div>
                    {p.earlyBird ? <div className="earlyBird">{p.earlyBird}</div> : null}
                    {p.flightsNote ? (
                      <div className="packageNote">{p.flightsNote}</div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="blog" aria-label="Blog">
          <div className="container">
            <div className="sectionHead">
              <div>
                <div className="kicker">Blog</div>
                <h2 className="h2">Guidance for your journey</h2>
                <p className="muted">
                  Short summaries from our articles. Dates and rules can change — always confirm
                  with official sources and our team before you travel.
                </p>
              </div>
            </div>
            <div className="blogGrid">
              {BLOG_POSTS.map((post) => (
                <article key={post.title} className="blogCard">
                  <h3 className="blogTitle">{post.title}</h3>
                  <p className="blogExcerpt">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="contact" aria-label="Contact">
          <div className="container">
            <div className="sectionHead">
              <div>
                <div className="kicker">Contact</div>
                <h2 className="h2">Get in touch</h2>
                <p className="muted">
                  Call or message us for package availability, flights, and payment plans.
                </p>
              </div>
            </div>
            <div className="contactGrid">
              <div className="contactCard">
                <div className="contactBlock">
                  <div className="contactLabel">Address</div>
                  <div className="contactValue">
                    {CONTACT.addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
                <div className="contactBlock">
                  <div className="contactLabel">Office</div>
                  <a className="contactLink" href={telOffice}>
                    {CONTACT.office}
                  </a>
                </div>
                <div className="contactBlock">
                  <div className="contactLabel">Mobile</div>
                  <a className="contactLink" href={telMobile}>
                    {CONTACT.mobile}
                  </a>
                </div>
                <div className="contactBlock">
                  <div className="contactLabel">WhatsApp</div>
                  <a className="contactLink" href={waHref}>
                    {CONTACT.whatsapp}
                  </a>
                </div>
                <div className="contactBlock">
                  <div className="contactLabel">Email</div>
                  <a
                    className="contactLink"
                    href={`mailto:${CONTACT.email}`}
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
              <div className="contactAside">
                <p className="muted" style={{ maxWidth: 'none' }}>
                  For packages where flights are not included, please call our agents to arrange
                  flights. We are here to help with e-waiver visa (British passport) packages and
                  ground arrangements as set out in each offer.
                </p>
                <div className="cta contactCta">
                  <div>
                    <div className="ctaTitle">Ready to book?</div>
                    <div className="ctaText">
                      Speak to us about room sharing, deposits, and travel dates.
                    </div>
                  </div>
                  <div className="ctaActions">
                    <a className="btn btnPrimary" href={telOffice}>
                      Call office
                    </a>
                    <a className="btn btnGhost" href={`mailto:${CONTACT.email}`}>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" aria-label="Footer">
        <div className="container footerGrid">
          <div>
            <div className="brand brandFooter">
              <img
                className="brandLogo brandLogoFooter"
                src={logo}
                alt="A Way to Makkah Umrah Services"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="footerText">
              A Way to Makkah Umrah Services — Hajj and Umrah packages with personalised care,
              local guides in Makkah and Madinah, and support you can rely on.
            </div>
          </div>

          <div className="footerCols">
            <div className="footerCol">
              <div className="footerTitle">Explore</div>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#packages">Packages</a>
              <a href="#blog">Blog</a>
            </div>
            <div className="footerCol">
              <div className="footerTitle">Contact</div>
              <a href="#contact">Get in touch</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={telOffice}>Office {CONTACT.office}</a>
            </div>
            <div className="footerCol">
              <div className="footerTitle">Location</div>
              <span className="footerStatic">
                {CONTACT.addressLines.join(', ')}
              </span>
            </div>
          </div>
        </div>
        <div className="container footerBottom">
          <div>
            © {new Date().getFullYear()} A Way to Makkah Umrah Services. All rights reserved.
          </div>
          <div className="footerBottomLinks">
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default App;
