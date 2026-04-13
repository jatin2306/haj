import logo from '../../assets/logo.png';

function Header() {
  return (
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
  );
}

export default Header;
