import { Helmet } from 'react-helmet-async';
import { getBlogUrlSlug } from '../utils/blogContent';
import { SOCIAL_LINKS } from '../data/siteData';

const SITE_NAME = 'A Way to Makkah Umrah Services';
const SITE_URL = 'https://awaytomakkah.com';
const DEFAULT_TITLE = 'Hajj & Umrah Packages from UK | A Way to Makkah';
const DEFAULT_DESCRIPTION =
  'Trusted Hajj & Umrah packages from Bedfordshire, UK. 15+ years experience — hotels near Haram, visa help, guided ziyarah, flights & full support.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function normalizeSchemaList(schema) {
  if (!schema) return [];
  return Array.isArray(schema) ? schema : [schema];
}

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
  const schemaList = normalizeSchemaList(schema);

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

      {/* Schema / JSON-LD — one script tag per entity */}
      {schemaList.map((item, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

/* ── Reusable schema generators ─────────────────────────────── */

export function organizationSchema({ testimonials } = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: DEFAULT_IMAGE,
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
    sameAs: SOCIAL_LINKS.map(({ href }) => href),
  };

  if (Array.isArray(testimonials) && testimonials.length > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(testimonials.length),
      bestRating: '5',
    };
    schema.review = testimonials.map((item) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: item.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(item.rating || 5),
        bestRating: '5',
      },
      reviewBody: String(item.quote || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 500),
    }));
  }

  return schema;
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-GB',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

export function webPageSchema({ path = '', name, description, pageType = 'WebPage' }) {
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: name || DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    url: `${SITE_URL}${path}`,
    inLanguage: 'en-GB',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'TravelAgency',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => {
      const entry = {
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
      };
      if (item.url) {
        entry.item = `${SITE_URL}${item.url}`;
      }
      return entry;
    }),
  };
}

/** Standard page bundle: WebPage + optional breadcrumbs + extra schemas. */
export function pageSchemas({ path, name, description, breadcrumbs, pageType, extra = [] }) {
  const schemas = [
    webPageSchema({ path, name, description, pageType }),
  ];
  if (breadcrumbs?.length) {
    schemas.push(breadcrumbSchema(breadcrumbs));
  }
  return [...schemas, ...extra];
}

export function blogPostSchema(post) {
  const title = post?.heading || 'Blog post';
  const datePublished = post?.published_at || new Date().toISOString();
  const author = post?.author || SITE_NAME;
  const slug = getBlogUrlSlug(post);

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
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: post?.cover_photo || DEFAULT_IMAGE,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };
}

export function blogListingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'A Way to Makkah Blog',
    description:
      'Hajj and Umrah travel guides, tips, rules, and spiritual advice for pilgrims from the UK.',
    url: `${SITE_URL}/blog`,
    inLanguage: 'en-GB',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

export function packageSchema(pkg) {
  const prices = Object.values(pkg.prices || {});
  const hasPrices = prices.length > 0;

  return {
    '@type': 'Product',
    name: pkg.title,
    description: `${pkg.title} — ${pkg.dates}. Madinah: ${pkg.madinah}. Makkah: ${pkg.makkah}.`,
    brand: { '@type': 'Organization', name: SITE_NAME },
    ...(hasPrices
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'GBP',
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };
}

export function packagesListSchema(packages) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hajj & Umrah Packages',
    itemListElement: packages.map((pkg, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: packageSchema(pkg),
    })),
  };
}

export function hotelsListSchema(hotels) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hotels near Haram — Makkah & Madinah',
    description:
      'Handpicked hotels near the Haram in Makkah and the Prophets Mosque in Madinah.',
    itemListElement: hotels.map((hotel, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Hotel',
        name: hotel.name,
        description: hotel.priceText,
      },
    })),
  };
}

export function galleryPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Umrah Gallery — Photos from Makkah & Madinah',
    description:
      'Photos from Umrah journeys to Makkah and Madinah — guided tours, hotels near the Haram, and pilgrim experiences.',
    url: `${SITE_URL}/gallery`,
    inLanguage: 'en-GB',
  };
}

export function hajjPackage2027ProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Hajj Package 2027 — A Way to Makkah',
    description:
      'Hajj 1448/2027 packages from UK. 5-Star Shifting from £8,449 and Deluxe Non-Shifting from £6,549 per person quad sharing. Bangladeshi passport required.',
    brand: { '@type': 'Organization', name: SITE_NAME },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: 6549,
      highPrice: 8449,
      offerCount: 2,
      availability: 'https://schema.org/InStock',
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION };
