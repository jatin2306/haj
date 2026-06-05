import { Link } from 'react-router-dom';
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
            <Link to="/#about">About</Link>
            <Link to="/#services">Services</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/#packages">Packages</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footerCol">
            <div className="footerTitle">Contact</div>
            <Link to="/#contact">Get in touch</Link>
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
          <Link to="/#contact">Contact</Link>
        </div>
        <p className="footerCredit">
          Designed and developed by{' '}
          <a
            href="https://brandinglift.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            brandinglift.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
