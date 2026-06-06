import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import MarketingLayout from './layouts/MarketingLayout';
import SEO, {
  galleryPageSchema,
  hotelsListSchema,
  organizationSchema,
  packagesListSchema,
  pageSchemas,
  websiteSchema,
  DEFAULT_TITLE,
} from './components/SEO';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import HotelsSection from './components/sections/HotelsSection';
import PackagesSection from './components/sections/PackagesSection';
// import HajjExperienceSection from './components/sections/HajjExperienceSection';
import BlogSection from './components/sections/BlogSection';
import BlogListingPage from './components/sections/BlogListingPage';
import BlogPostById from './components/sections/BlogPostById';
import BlogNotFound from './components/sections/BlogNotFound';
import ContactSection from './components/sections/ContactSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import RequireAdmin from './admin/RequireAdmin';
import NotFoundPage from './pages/NotFoundPage';
import HajjPackage2027Page from './pages/HajjPackage2027Page';
import {
  CONTACT,
  HAJJ_PACKAGES,
  HOTELS,
  UMRAH_PACKAGES,
  WHY_CHOOSE,
  TESTIMONIALS,
} from './data/siteData';

const AdminLoginPage = lazy(() => import('./admin/AdminLoginPage'));
const AdminShell = lazy(() => import('./admin/AdminShell'));
const AdminBlogsPage = lazy(() => import('./admin/AdminBlogsPage'));

function HomePage() {
  const { waHref, telOffice, telMobile } = useOutletContext();

  const homeSchema = [
    organizationSchema({ testimonials: TESTIMONIALS }),
    websiteSchema(),
    ...pageSchemas({
      path: '/',
      name: DEFAULT_TITLE,
      description:
        'Trusted Hajj & Umrah packages from Bedfordshire, UK. Hotels near Haram, visa help, guided ziyarah, flights and full support.',
      breadcrumbs: [{ name: 'Home', url: '/' }],
    }),
    packagesListSchema([...HAJJ_PACKAGES, ...UMRAH_PACKAGES]),
  ];

  return (
    <main id="content">
      <SEO
        path="/"
        schema={homeSchema}
      />
      <HeroSection contact={CONTACT} />
      <ServicesSection whyChoose={WHY_CHOOSE} />
      <AboutSection />
      <PackagesSection
        sectionId="hajj-packages"
        kicker="Hajj"
        heading="Hajj packages — 1448 / 2027"
        ariaLabel="Hajj 2027 packages"
        intro={
          <>
            Prices shown are per person for quad room sharing. £
            {HAJJ_PACKAGES[0].deposit.toFixed(2)} deposit with payment plan. Full itinerary and flights
            are confirmed when you book. A Bangladeshi passport is required — see each package for
            registration deadlines.
          </>
        }
        packages={HAJJ_PACKAGES}
        waHref={waHref}
      />
      <PackagesSection
        sectionClassName="section"
        packages={UMRAH_PACKAGES}
        waHref={waHref}
      />
      {/* <HajjExperienceSection telHref={telMobile} phoneDisplay={CONTACT.mobile} /> */}
      <BlogSection />
      <ContactSection
        contact={CONTACT}
        waHref={waHref}
        telOffice={telOffice}
        telMobile={telMobile}
      />
      <TestimonialsSection testimonials={TESTIMONIALS} />
    </main>
  );
}

function GalleryPage() {
  const title = 'Umrah Gallery — Photos from Makkah & Madinah';
  const description =
    'Browse photos from our Umrah journeys to Makkah and Madinah. See highlights from our guided tours, hotels near the Haram, and pilgrim experiences.';

  return (
    <main id="content">
      <SEO
        title={title}
        description={description}
        path="/gallery"
        schema={[
          ...pageSchemas({
            path: '/gallery',
            name: title,
            description,
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Gallery', url: '/gallery' },
            ],
          }),
          galleryPageSchema(),
        ]}
      />
      <GallerySection />
    </main>
  );
}

function HotelsPage() {
  const title = 'Hotels near Haram — Makkah & Madinah Stays';
  const description =
    "Explore our handpicked hotels near the Haram in Makkah and the Prophet's Mosque in Madinah. Comfortable stays for your Hajj and Umrah journey.";

  return (
    <main id="content">
      <SEO
        title={title}
        description={description}
        path="/hotels"
        schema={[
          ...pageSchemas({
            path: '/hotels',
            name: title,
            description,
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Hotels', url: '/hotels' },
            ],
          }),
          hotelsListSchema(HOTELS),
        ]}
      />
      <HotelsSection hotels={HOTELS} />
    </main>
  );
}

function BlogPage() {
  const { slug } = useParams();
  if (!slug) return <BlogNotFound />;
  return <BlogPostById routeRef={slug} />;
}

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminShell />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminBlogsPage />} />
        </Route>

        <Route path="/*" element={<MarketingLayout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="hajj-package-2027" element={<HajjPackage2027Page />} />
          <Route path="blog" element={<BlogListingPage />} />
          <Route path="blog/:slug" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App({ location, helmetContext = {} }) {
  const routes = <AppRoutes />;

  return (
    <HelmetProvider context={helmetContext}>
      {location != null ? (
        <StaticRouter location={location}>{routes}</StaticRouter>
      ) : (
        <BrowserRouter>{routes}</BrowserRouter>
      )}
    </HelmetProvider>
  );
}
