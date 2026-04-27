import './App.css';
import './admin/admin.css';
import { BrowserRouter, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import MarketingLayout from './layouts/MarketingLayout';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import HotelsSection from './components/sections/HotelsSection';
import PackagesSection from './components/sections/PackagesSection';
// import HajjExperienceSection from './components/sections/HajjExperienceSection';
import BlogSection from './components/sections/BlogSection';
import BlogPostById from './components/sections/BlogPostById';
import BlogNotFound from './components/sections/BlogNotFound';
import ContactSection from './components/sections/ContactSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import AdminLoginPage from './admin/AdminLoginPage';
import AdminShell from './admin/AdminShell';
import AdminBlogsPage from './admin/AdminBlogsPage';
import RequireAdmin from './admin/RequireAdmin';
import NotFoundPage from './pages/NotFoundPage';
import HajjPackage2027Page from './pages/HajjPackage2027Page';
import { CONTACT, PACKAGES, HOTELS, WHY_CHOOSE, TESTIMONIALS } from './data/siteData';

function HomePage() {
  const { waHref, telOffice, telMobile } = useOutletContext();
  return (
    <main id="content">
      <HeroSection contact={CONTACT} />
      <ServicesSection whyChoose={WHY_CHOOSE} />
      <AboutSection />
      <PackagesSection packages={PACKAGES} />
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
  return (
    <main id="content">
      <GallerySection />
    </main>
  );
}

function HotelsPage() {
  return (
    <main id="content">
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
        <Route path="blog/:slug" element={<BlogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
