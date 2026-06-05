const TOKEN_KEY = 'tourtravels_admin_token';

function getStorage() {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage;
}

export function getAdminToken() {
  return getStorage()?.getItem(TOKEN_KEY) ?? null;
}

export function setAdminToken(token) {
  const storage = getStorage();
  if (!storage) return;
  if (token) storage.setItem(TOKEN_KEY, token);
  else storage.removeItem(TOKEN_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}

export function adminLogout() {
  getStorage()?.removeItem(TOKEN_KEY);
}
