import EnquiryForm from '../forms/EnquiryForm';
import SocialLinks from '../ui/SocialLinks';

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
              plans — or send an enquiry using the form.
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
            <div className="contactBlock">
              <div className="contactLabel">Social</div>
              <SocialLinks
                className="contactSocialLinks"
                linkClassName="socialLink contactSocialLink"
              />
            </div>
          </div>
          <div className="contactAside">
            <div className="contactFormCard">
              <div className="contactFormTitle">Contact us</div>
              <p className="muted contactFormIntro">
                Share your travel dates and questions. We will respond as soon as
                we can.
              </p>
              <EnquiryForm source="contact" submitLabel="Send message" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
