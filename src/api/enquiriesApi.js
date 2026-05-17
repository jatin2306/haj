import { API_BASE, parseJsonResponse } from './blogsApi';
import { CONTACT } from '../data/siteData';

export function buildEnquiryMailto(payload) {
  const subject = encodeURIComponent(
    payload.packageTitle
      ? `Enquiry: ${payload.packageTitle}`
      : 'Website enquiry — A Way to Makkah',
  );
  const lines = [
    `Name: ${payload.name}`,
    payload.email ? `Email: ${payload.email}` : null,
    `Phone: ${payload.phone}`,
    payload.packageTitle ? `Package: ${payload.packageTitle}` : null,
    payload.source ? `Source: ${payload.source}` : null,
    '',
    payload.message || '(No message provided)',
  ].filter(Boolean);

  const body = encodeURIComponent(lines.join('\n'));
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

export async function submitEnquiry(payload) {
  const res = await fetch(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await parseJsonResponse(res);

  if (res.ok) {
    return { ok: true, via: 'api' };
  }

  const msg = json?.message || `Request failed (${res.status})`;
  const err = new Error(msg);
  err.status = res.status;
  throw err;
}
