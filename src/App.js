import './App.css';
import './admin/admin.css';
import { BrowserRouter, Navigate, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import MarketingLayout from './layouts/MarketingLayout';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import HotelsSection from './components/sections/HotelsSection';
import PackagesSection from './components/sections/PackagesSection';
import BlogSection from './components/sections/BlogSection';
import BlogPostPage from './components/sections/BlogPostPage';
import BlogNotFound from './components/sections/BlogNotFound';
import ContactSection from './components/sections/ContactSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import AdminLoginPage from './admin/AdminLoginPage';
import AdminShell from './admin/AdminShell';
import AdminDashboardPage from './admin/AdminDashboardPage';
import RequireAdmin from './admin/RequireAdmin';
import {
  CONTACT,
  PACKAGES,
  BLOG_POSTS,
  HOTELS,
  WHY_CHOOSE,
  TESTIMONIALS,
  getBlogPostBySlug,
} from './data/siteData';

function HomePage() {
  const { waHref, telOffice, telMobile } = useOutletContext();
  return (
    <main id="content">
      <HeroSection contact={CONTACT} />
      <ServicesSection whyChoose={WHY_CHOOSE} />
      <AboutSection />
      <PackagesSection packages={PACKAGES} />
      <BlogSection posts={BLOG_POSTS} />
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
  const post = slug ? getBlogPostBySlug(slug) : null;
  return post ? <BlogPostPage post={post} /> : <BlogNotFound />;
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
        <Route index element={<AdminDashboardPage />} />
      </Route>

      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
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
