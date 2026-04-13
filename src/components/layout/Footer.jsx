import logo from '../../assets/logo.png';

function Footer({ contact, telOffice }) {
  return (
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
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={telOffice}>Office {contact.office}</a>
          </div>
          <div className="footerCol">
            <div className="footerTitle">Location</div>
            <span className="footerStatic">{contact.addressLines.join(', ')}</span>
          </div>
        </div>
      </div>
      <div className="container footerBottom">
        <div>© {new Date().getFullYear()} A Way to Makkah Umrah Services. All rights reserved.</div>
        <div className="footerBottomLinks">
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
