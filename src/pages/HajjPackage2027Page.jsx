import SEO, { hajjPackage2027ProductSchema, pageSchemas } from '../components/SEO';
import { HAJJ_PACKAGES } from '../data/siteData';

export default function HajjPackage2027Page() {
  const title = 'Hajj Package 2027 — Deluxe & Luxury from UK';
  const description =
    'Book your Hajj 1448/2027 package. Deluxe from £8,749 and Luxury from £9,849 per person quad sharing. Return flights, Mashaeer support, and expert guidance included.';

  const [deluxe, luxury] = HAJJ_PACKAGES;

  return (
    <main id="content" className="hajjPage">
      <SEO
        title={title}
        description={description}
        path="/hajj-package-2027"
        schema={[
          ...pageSchemas({
            path: '/hajj-package-2027',
            name: title,
            description,
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Hajj Package 2027', url: '/hajj-package-2027' },
            ],
          }),
          hajjPackage2027ProductSchema(),
        ]}
      />
      <section className="hajjHero2027" aria-label="Hajj package 2027">
        <div className="container">
          <div className="hajjPoster">
            <div className="hajjPosterTop">
              <p className="hajjOverline">Hajj 1448 / 2027</p>
              <h1 className="hajjMainTitle">Hajj Packages</h1>
              <p className="hajjSubTitle">A Way to Makkah — Luton&apos;s Premier Hajj Service Provider</p>
            </div>

            <div className="hajjPackagesTitle">Our Packages</div>

            <div className="hajjPackagesGrid">
              <article className="hajjPriceCard">
                <div className="hajjPriceCardHead">{deluxe.title}</div>
                <p className="hajjPriceCardTagline">Balanced &amp; value-focused</p>
                <div className="hajjPriceRow">
                  <span>Quad sharing</span>
                  <strong>£{deluxe.prices.quad.toLocaleString()}</strong>
                </div>
                <div className="hajjPriceRow">
                  <span>Triple sharing</span>
                  <strong>£{deluxe.prices.triple.toLocaleString()}</strong>
                </div>
                <div className="hajjPriceRow">
                  <span>Double sharing</span>
                  <strong>£{deluxe.prices.twin.toLocaleString()}</strong>
                </div>
              </article>

              <article className="hajjNoticeCard">
                <p>Special assistance &amp; guidance for Bangladesh passport holders.</p>
                <p>Prices per person. Qurbani not included.</p>
                <p>Hotel shifting applies during the Hajj journey.</p>
              </article>

              <article className="hajjPriceCard">
                <div className="hajjPriceCardHead">{luxury.title}</div>
                <p className="hajjPriceCardTagline">Premium comfort · Prime location</p>
                <div className="hajjPriceRow">
                  <span>Quad sharing</span>
                  <strong>£{luxury.prices.quad.toLocaleString()}</strong>
                </div>
                <div className="hajjPriceRow">
                  <span>Triple sharing</span>
                  <strong>£{luxury.prices.triple.toLocaleString()}</strong>
                </div>
                <div className="hajjPriceRow">
                  <span>Double sharing</span>
                  <strong>£{luxury.prices.twin.toLocaleString()}</strong>
                </div>
              </article>
            </div>

            <div className="hajjDeadline">
              <span>Contact us for full itinerary &amp; availability</span>
              <strong>awaytomakkah.com</strong>
            </div>

            <div className="hajjPageFooter">
              <a href="tel:+447538935033" className="hajjCallLink">
                Call / WhatsApp: 07538 935 033
              </a>
              <span>A Way to Makkah Umrah Services</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
