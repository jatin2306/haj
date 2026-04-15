import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="nav">
      <div className="container navInner">
        <a className="brand" href="/">
          <img
            className="brandLogo"
            src={logo}
            alt="A Way to Makkah Umrah Services"
            loading="eager"
            decoding="async"
          />
        </a>

        <nav className="navLinks" aria-label="Primary">
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#testimonials">Testimonials</a>
          <a href="/#packages">Packages</a>
          <a href="/gallery">Gallery</a>
          <a href="/#blog">Blog</a>
        </nav>

        <div className="navCtas">
          <a className="btn btnGhost" href="/#hotels">
            View hotels
          </a>
          <a className="btn btnPrimary" href="/#contact">
            Contact us
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
