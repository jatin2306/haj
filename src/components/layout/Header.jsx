import { useCallback, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#packages', label: 'Packages' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#blog', label: 'Blog' },
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
          <a className="brand" href="/" onClick={closeMenu}>
            <img
              className="brandLogo"
              src={logo}
              alt="A Way to Makkah Umrah Services"
              loading="eager"
              decoding="async"
            />
          </a>

          <nav className="navLinks" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="navCtas">
            <a className="btn btnGhost" href="/hotels">
              View hotels
            </a>
            <a className="btn btnPrimary" href="/#contact">
              Contact us
            </a>
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
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={closeMenu}>
                {label}
              </a>
            ))}
          </div>
          <div className="navMobileCtas">
            <a className="btn btnGhost btnFull" href="/hotels" onClick={closeMenu}>
              View hotels
            </a>
            <a className="btn btnPrimary btnFull" href="/#contact" onClick={closeMenu}>
              Contact us
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
