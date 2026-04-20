/** Text and image helpers for Tour & Travels blog API payloads. */

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
  return decoded.replace(/\s+/g, ' ').trim();
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

/** Canonical post id from API list/detail payloads (field name varies by backend). */
export function getBlogPostId(blog) {
  if (blog == null) return null;
  const raw = blog.id ?? blog.blog_id ?? blog.blogId;
  if (raw == null || raw === '') return null;
  return raw;
}

/** Public blog article URL — always use the real id so detail fetch hits `GET /blogs/:id` correctly. */
export function getBlogPath(blog) {
  const postId = getBlogPostId(blog);
  if (postId == null) return '/#blog';
  return `/blog/${encodeURIComponent(String(postId))}`;
}

export function getExcerpt(item) {
  const desc = item?.description ?? '';
  const plain = cleanText(desc);
  return plain ? `${plain.slice(0, 180)}${plain.length > 180 ? '…' : ''}` : '';
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
