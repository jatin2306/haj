import { API_BASE, parseJsonResponse } from './blogsApi';
import { getAdminToken, adminLogout } from '../admin/auth';

function handleAuthFailure(res) {
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    if (typeof window !== 'undefined') {
      window.location.assign(`${window.location.origin}/admin/login`);
    }
  }
}

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: String(email).trim(), password }),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) {
    throw new Error(json?.message || `Login failed (${res.status})`);
  }
  return json?.data ?? null;
}

export async function fetchAdminBlogsList() {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/blogs/manage`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  await handleAuthFailure(res);
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json?.message || 'Failed to load blogs');
  const list = json?.data?.blogs;
  return Array.isArray(list) ? list : [];
}

export async function fetchAdminBlogById(id) {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/blogs/manage/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  await handleAuthFailure(res);
  const json = await parseJsonResponse(res);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(json?.message || 'Failed to load blog');
  return json?.data?.blog ?? null;
}

export async function postBlogMultipart(formData) {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  await handleAuthFailure(res);
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json?.message || 'Save failed');
  return json?.data?.blog ?? json?.data ?? null;
}

/** Build FormData for tourtravels blog upsert (blog_photos field names only). */
export function buildBlogUpsertFormData(payload) {
  const fd = new FormData();
  if (payload.id != null) fd.append('id', String(payload.id));
  if (payload.is_deleted === true) {
    fd.append('is_deleted', 'true');
    return fd;
  }

  fd.append('heading', payload.heading ?? '');
  fd.append('description', payload.description ?? '');
  if (payload.category != null) fd.append('category', String(payload.category));
  if (payload.author != null) fd.append('author', String(payload.author));
  fd.append('read_time_minutes', String(payload.read_time_minutes ?? 5));
  if (payload.published_at) {
    fd.append('published_at', payload.published_at);
  } else if (payload.id != null && payload.clear_published_at) {
    fd.append('published_at', '');
  }
  fd.append('is_active', payload.is_active !== false ? 'true' : 'false');

  const photos = (Array.isArray(payload.blog_photos) ? payload.blog_photos : []).filter((item) => {
    if (!item) return false;
    const img = item.image;
    return img instanceof File || (img != null && String(img).trim() !== '');
  });
  photos.forEach((item, i) => {
    const img = item.image;
    if (img instanceof File) {
      fd.append(`blog_photos[${i}][image]`, img);
    } else {
      fd.append(`blog_photos[${i}][image]`, String(img).trim());
    }
    fd.append(`blog_photos[${i}][type]`, item.type ?? 'gallery');
    if (item.display_order != null && item.display_order !== '') {
      fd.append(`blog_photos[${i}][display_order]`, String(item.display_order));
    }
  });

  return fd;
}
