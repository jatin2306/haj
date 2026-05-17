export const EMPTY_ENQUIRY = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(values, options = {}) {
  const { requireMessage = true, requireEmail = true } = options;
  const errors = {};
  const name = String(values.name ?? '').trim();
  const email = String(values.email ?? '').trim();
  const phone = String(values.phone ?? '').trim();
  const message = String(values.message ?? '').trim();

  if (!name) {
    errors.name = 'Please enter your name';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (requireEmail) {
    if (!email) {
      errors.email = 'Please enter your email';
    } else if (!EMAIL_RE.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
  } else if (email && !EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!phone) {
    errors.phone = 'Please enter your phone number';
  } else if (phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (requireMessage && !message) {
    errors.message = 'Please tell us how we can help';
  }

  return errors;
}
