/** Text and image helpers for Tour & Travels blog API payloads. */
const REPLACEMENT_CHAR_REGEX = /\uFFFD+/g;

export function sanitizeBrokenText(value) {
  if (!value || typeof value !== 'string') return '';
  return value
    .replace(REPLACEMENT_CHAR_REGEX, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getCardImage(item) {
  if (item?.cover_photo && typeof item.cover_photo === 'string' && !item.cover_photo.startsWith('C:\\')) {
    return item.cover_photo;
  }
  const photos = item?.blog_photos;
  if (Array.isArray(photos) && photos.length > 0) {
    const cover = photos.find((p) => p?.image_type === 'cover');
    const url = cover?.image_url ?? photos[0]?.image_url;
    if (url && typeof url === 'string' && !url.startsWith('C:\\')) return url;
  }
  return null;
}

export function decodeHtmlEntities(value) {
  if (!value || typeof value !== 'string') return '';
  if (typeof document === 'undefined') {
    return value
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  const textarea = document.createElement('textarea');
  let decoded = value;
  for (let i = 0; i < 2; i += 1) {
    textarea.innerHTML = decoded;
    decoded = textarea.value;
  }
  return decoded;
}

export function cleanText(value) {
  if (!value || typeof value !== 'string') return '';
  const withoutTags = value.replace(/<[^>]*>/g, ' ');
  const decoded = decodeHtmlEntities(withoutTags);
  return sanitizeBrokenText(decoded);
}

/** URL segment derived from heading (used only to match legacy / slug URLs, not for new links). */
export function blogSlugFromHeading(heading) {
  const plain = cleanText(heading || '');
  if (!plain) return '';
  return plain
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Normalise admin/user slug input for url_slug. */
export function normalizeUrlSlug(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Preferred public URL segment: url_slug → legacy slug → heading slug → id. */
export function getBlogUrlSlug(blog) {
  const custom = blog?.url_slug ?? blog?.slug;
  if (custom != null && String(custom).trim()) {
    const normalized = normalizeUrlSlug(custom);
    if (normalized) return normalized;
  }

  const fromHeading = blogSlugFromHeading(blog?.heading);
  if (fromHeading) return fromHeading;

  const postId = getBlogPostId(blog);
  if (postId != null) return String(postId);

  return '';
}

/** Canonical post id from API list/detail payloads (field name varies by backend). */
export function getBlogPostId(blog) {
  if (blog == null) return null;
  const raw = blog.id ?? blog.blog_id ?? blog.blogId;
  if (raw == null || raw === '') return null;
  return raw;
}

function publishedAtTime(blog) {
  const t = blog?.published_at ? new Date(blog.published_at).getTime() : Number.NaN;
  return Number.isNaN(t) ? null : t;
}

/** Newest published posts first; same order used on home preview and /blog listing. */
export function sortPublishedBlogsNewestFirst(list) {
  return [...list].sort((a, b) => {
    const ta = publishedAtTime(a);
    const tb = publishedAtTime(b);

    if (ta != null && tb != null && ta !== tb) return tb - ta;
    if (ta != null && tb == null) return -1;
    if (ta == null && tb != null) return 1;

    const ida = Number(getBlogPostId(a)) || 0;
    const idb = Number(getBlogPostId(b)) || 0;
    return idb - ida;
  });
}

/** Public blog article URL — uses url_slug when set, otherwise fallbacks. */
export function getBlogPath(blog) {
  const slug = getBlogUrlSlug(blog);
  if (!slug) return '/blog';
  return `/blog/${encodeURIComponent(slug)}`;
}

export function getExcerpt(item) {
  const desc = item?.description ?? '';
  const plain = cleanText(desc);
  return plain ? `${plain.slice(0, 180)}${plain.length > 180 ? '…' : ''}` : '';
}

export function sanitizeBlogHtml(value) {
  if (!value || typeof value !== 'string') return '';
  return value.replace(REPLACEMENT_CHAR_REGEX, ' ').replace(/\u00A0/g, ' ');
}

export function formatBlogDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}
