import { blogSlugFromHeading, normalizeUrlSlug } from '../utils/blogContent';

const DEFAULT_API_BASE = 'https://tourntravels-backend.onrender.com/api';

export const API_BASE = (process.env.REACT_APP_API_URL || DEFAULT_API_BASE).replace(/\/$/, '');

export async function parseJsonResponse(res) {
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return json;
}

export async function fetchPublishedBlogs() {
  const res = await fetch(`${API_BASE}/blogs`);
  const json = await parseJsonResponse(res);
  if (!res.ok) {
    const msg = json?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  const list = json?.data?.blogs;
  return Array.isArray(list) ? list : [];
}

export async function fetchBlogById(id) {
  const res = await fetch(`${API_BASE}/blogs/${id}`);
  const json = await parseJsonResponse(res);
  if (res.status === 404) return null;
  if (!res.ok) {
    const msg = json?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return json?.data?.blog ?? null;
}

/**
 * Load one published blog for the public `/blog/:slug` route.
 * Accepts numeric id, url_slug, legacy slug, or a heading-derived slug.
 */
export async function fetchBlogByRouteRef(ref) {
  const s = String(ref ?? '').trim();
  if (!s) return null;

  if (/^\d+$/.test(s)) {
    return fetchBlogById(parseInt(s, 10));
  }

  const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(s)}`);
  const json = await parseJsonResponse(res);
  if (res.ok && json?.data?.blog) {
    return json.data.blog;
  }
  if (!res.ok && res.status !== 404) {
    const msg = json?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  const want = normalizeUrlSlug(s) || s.toLowerCase();
  const list = await fetchPublishedBlogs();
  for (const blog of list) {
    if (!blog?.id) continue;
    const urlSlug = blog.url_slug && normalizeUrlSlug(blog.url_slug);
    if (urlSlug && urlSlug === want) {
      return fetchBlogById(blog.id);
    }
    const legacySlug = blog.slug && normalizeUrlSlug(blog.slug);
    if (legacySlug && legacySlug === want) {
      return fetchBlogById(blog.id);
    }
    if (blogSlugFromHeading(blog.heading) === want) {
      return fetchBlogById(blog.id);
    }
  }
  return null;
}
