import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import HotelsSection from './components/sections/HotelsSection';
import PackagesSection from './components/sections/PackagesSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import { CONTACT, PACKAGES, BLOG_POSTS, HOTELS, WHY_CHOOSE } from './data/siteData';

function App() {
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
        <main id="content">
          <HeroSection contact={CONTACT} />
          <ServicesSection whyChoose={WHY_CHOOSE} />
          <AboutSection />
          <HotelsSection hotels={HOTELS} />
          <PackagesSection packages={PACKAGES} />
          <BlogSection posts={BLOG_POSTS} />
          <ContactSection
            contact={CONTACT}
            waHref={waHref}
            telOffice={telOffice}
            telMobile={telMobile}
          />
        </main>

        <Footer contact={CONTACT} telOffice={telOffice} />
      </div>
    </>
  );
}

export default App;
