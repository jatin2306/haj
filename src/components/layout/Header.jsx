import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { to: '/#about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/#testimonials', label: 'Testimonials' },
  { to: '/#packages', label: 'Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/#blog', label: 'Blog' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) closeMenu();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeMenu]);

  return (
    <>
      <header className="nav">
        <div className="container navInner">
          <Link className="brand" to="/" onClick={closeMenu}>
            <img
              className="brandLogo"
              src={logo}
              alt="A Way to Makkah Umrah Services"
              loading="eager"
              decoding="async"
            />
          </Link>

          <nav className="navLinks" aria-label="Primary">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="navCtas">
            <Link className="btn btnGhost" to="/hotels">
              View hotels
            </Link>
            <Link className="btn btnPrimary" to="/#contact">
              Contact us
            </Link>
          </div>

          <button
            type="button"
            className="navMenuToggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-panel"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="navMenuToggleLines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`navMobile ${menuOpen ? 'navMobileOpen' : ''}`}
        id="nav-mobile"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <button
          type="button"
          className="navMobileBackdrop"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <nav
          id="nav-mobile-panel"
          className="navMobilePanel"
          aria-label="Mobile menu"
        >
          <div className="navMobilePanelHead">
            <span className="navMobileTitle">Menu</span>
            <button
              type="button"
              className="navMobileClose"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              ×
            </button>
          </div>
          <div className="navMobileLinks">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} onClick={closeMenu}>
                {label}
              </Link>
            ))}
          </div>
          <div className="navMobileCtas">
            <Link className="btn btnGhost btnFull" to="/hotels" onClick={closeMenu}>
              View hotels
            </Link>
            <Link className="btn btnPrimary btnFull" to="/#contact" onClick={closeMenu}>
              Contact us
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
