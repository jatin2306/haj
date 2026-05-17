import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'A Way to Makkah Umrah Services';
const SITE_URL = 'https://awaytomakkah.com';
const DEFAULT_TITLE = 'Hajj & Umrah Packages from UK | A Way to Makkah';
const DEFAULT_DESCRIPTION =
  'Trusted Hajj & Umrah packages from Bedfordshire, UK. 15+ years experience — hotels near Haram, visa help, guided ziyarah, flights & full support.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({
  title,
  description,
  path = '',
  image,
  type = 'website',
  schema,
  noindex = false,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = `${SITE_URL}${path}`;
  const pageImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* Primary */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Schema / JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}

/* ── Reusable schema generators ─────────────────────────────── */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/facioncc.png`,
    description: DEFAULT_DESCRIPTION,
    telephone: ['+441582616064', '+447838648097'],
    email: 'info@awaytomakkah.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Clifton',
      addressRegion: 'Bedfordshire',
      addressCountry: 'GB',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    sameAs: [],
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

export function blogPostSchema(post) {
  const title = post?.heading || 'Blog post';
  const datePublished = post?.published_at || new Date().toISOString();
  const author = post?.author || SITE_NAME;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    datePublished,
    dateModified: post?.updated_at || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/facioncc.png`,
      },
    },
    image: post?.cover_photo || DEFAULT_IMAGE,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post?.id || ''}`,
    },
  };
}

export function packageSchema(pkg) {
  return {
    '@type': 'Product',
    name: pkg.title,
    description: `${pkg.title} — ${pkg.dates}. Madinah: ${pkg.madinah}. Makkah: ${pkg.makkah}.`,
    brand: { '@type': 'Organization', name: SITE_NAME },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: Math.min(...Object.values(pkg.prices)),
      highPrice: Math.max(...Object.values(pkg.prices)),
      offerCount: Object.keys(pkg.prices).length,
      availability: 'https://schema.org/InStock',
    },
  };
}

export function packagesListSchema(packages) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: packages.map((pkg, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: packageSchema(pkg),
    })),
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION };
