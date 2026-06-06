/**
 * Generates public/sitemap.xml at build time.
 * Includes static routes + published blog posts from the API.
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://awaytomakkah.com';
const API_BASE = (
  process.env.REACT_APP_API_URL || 'https://tourntravels-backend.onrender.com/api'
).replace(/\/$/, '');

const OUTPUT = path.join(__dirname, '..', 'public', 'sitemap.xml');

const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/hajj-package-2027', changefreq: 'monthly', priority: '0.9' },
  { path: '/hotels', changefreq: 'monthly', priority: '0.8' },
  { path: '/gallery', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toLastmod(dateStr) {
  if (dateStr) {
    const d = new Date(dateStr);
    if (!Number.isNaN(d.getTime())) {
      return d.toISOString().slice(0, 10);
    }
  }
  return new Date().toISOString().slice(0, 10);
}

function buildUrlEntry({ path: pagePath, lastmod, changefreq, priority }) {
  const loc = `${SITE_URL}${pagePath === '/' ? '' : pagePath}`;
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
  ];
  if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) lines.push(`    <priority>${priority}</priority>`);
  lines.push('  </url>');
  return lines.join('\n');
}

async function fetchPublishedBlogs() {
  const res = await fetch(`${API_BASE}/blogs`);
  if (!res.ok) {
    throw new Error(`Blogs API returned ${res.status}`);
  }
  const json = await res.json();
  const list = json?.data?.blogs;
  return Array.isArray(list) ? list : [];
}

function getBlogId(blog) {
  const raw = blog?.id ?? blog?.blog_id ?? blog?.blogId;
  if (raw == null || raw === '') return null;
  return String(raw);
}

function normalizeUrlSlug(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function blogSlugFromHeading(heading) {
  const plain = String(heading ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!plain) return '';
  return plain
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getBlogUrlSlug(blog) {
  const custom = blog?.url_slug ?? blog?.slug;
  if (custom != null && String(custom).trim()) {
    const normalized = normalizeUrlSlug(custom);
    if (normalized) return normalized;
  }

  const fromHeading = blogSlugFromHeading(blog?.heading);
  if (fromHeading) return fromHeading;

  const id = getBlogId(blog);
  return id ? String(id) : '';
}

async function main() {
  const buildDate = new Date().toISOString().slice(0, 10);
  const entries = STATIC_PAGES.map((page) =>
    buildUrlEntry({
      path: page.path,
      lastmod: buildDate,
      changefreq: page.changefreq,
      priority: page.priority,
    }),
  );

  try {
    const blogs = await fetchPublishedBlogs();
    const seen = new Set();

    for (const blog of blogs) {
      const id = getBlogId(blog);
      if (!id || seen.has(id)) continue;
      seen.add(id);

      entries.push(
        buildUrlEntry({
          path: `/blog/${encodeURIComponent(getBlogUrlSlug(blog))}`,
          lastmod: toLastmod(blog.updated_at || blog.published_at),
          changefreq: 'monthly',
          priority: '0.6',
        }),
      );
    }

    console.log(`Sitemap: added ${seen.size} blog post(s).`);
  } catch (err) {
    console.warn(`Sitemap: could not fetch blogs (${err.message}). Static pages only.`);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(OUTPUT, xml, 'utf8');
  console.log(`Sitemap written to ${OUTPUT} (${entries.length} URL(s)).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
