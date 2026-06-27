import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { EnquiryProvider } from '../context/EnquiryContext';
import { CONTACT } from '../data/siteData';
import { scrollToTop } from '../utils/scrollToTop';

export default function MarketingLayout() {
  const { pathname, hash } = useLocation();
  const waHref = `https://wa.me/44${CONTACT.whatsapp.replace(/\s/g, '').slice(1)}`;
  const telOffice = `tel:+44${CONTACT.office.replace(/\s/g, '').slice(1)}`;
  const telMobile = `tel:+44${CONTACT.mobile.replace(/\s/g, '').slice(1)}`;

  useEffect(() => {
    if (hash) return;
    scrollToTop({ behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    if (!hash || hash.length < 2) return;
    const id = hash.slice(1);
    const t = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(t);
  }, [pathname, hash]);

  return (
    <EnquiryProvider>
      <a className="skipLink" href="#content">
        Skip to content
      </a>
      <Header />
      <div className="tt">
        <Outlet context={{ waHref, telOffice, telMobile }} />
        <Footer contact={CONTACT} telOffice={telOffice} telMobile={telMobile} />
      </div>
    </EnquiryProvider>
  );
}
