function ContactSection({ contact, waHref, telOffice, telMobile }) {
  return (
    <section className="section alt" id="contact" aria-label="Contact">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">Contact</div>
            <h2 className="h2">Get in touch</h2>
            <p className="muted">
              Call or message us for package availability, flights, and payment
              plans.
            </p>
          </div>
        </div>
        <div className="contactGrid">
          <div className="contactCard">
            <div className="contactBlock">
              <div className="contactLabel">Address</div>
              <div className="contactValue">
                {contact.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
            <div className="contactBlock">
              <div className="contactLabel">Office</div>
              <a className="contactLink" href={telOffice}>
                {contact.office}
              </a>
            </div>
            <div className="contactBlock">
              <div className="contactLabel">Mobile</div>
              <a className="contactLink" href={telMobile}>
                {contact.mobile}
              </a>
            </div>
            <div className="contactBlock">
              <div className="contactLabel">WhatsApp</div>
              <a className="contactLink" href={waHref}>
                {contact.whatsapp}
              </a>
            </div>
            <div className="contactBlock">
              <div className="contactLabel">Email</div>
              <a className="contactLink" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </div>
          <div className="contactAside">
            <p className="muted" style={{ maxWidth: 'none' }}>
              For packages where flights are not included, please call our
              agents to arrange flights. We are here to help with e-waiver visa
              (British passport) packages and ground arrangements as set out in
              each offer.
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
                <a className="btn btnGhost" href={`mailto:${contact.email}`}>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
