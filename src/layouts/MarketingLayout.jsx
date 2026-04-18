import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CONTACT } from '../data/siteData';

export default function MarketingLayout() {
  const waHref = `https://wa.me/44${CONTACT.whatsapp.replace(/\s/g, '').slice(1)}`;
  const telOffice = `tel:+44${CONTACT.office.replace(/\s/g, '').slice(1)}`;
  const telMobile = `tel:+44${CONTACT.mobile.replace(/\s/g, '').slice(1)}`;

  return (
    <>
      <a className="skipLink" href="#content">
        Skip to content
      </a>
      <Header />
      <div className="tt">
        <Outlet context={{ waHref, telOffice, telMobile }} />
        <Footer contact={CONTACT} telOffice={telOffice} telMobile={telMobile} />
      </div>
    </>
  );
}
