const SESSION_KEY = 'awaytomakkah_admin_session';

function expectedCredentials() {
  return {
    username: process.env.REACT_APP_ADMIN_USERNAME || 'admin',
    password: process.env.REACT_APP_ADMIN_PASSWORD || 'admin',
  };
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function adminLogin(username, password) {
  const { username: u, password: p } = expectedCredentials();
  if (username === u && password === p) {
    sessionStorage.setItem(SESSION_KEY, '1');
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY);
}
