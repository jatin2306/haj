import emailjs from '@emailjs/browser';
import { CONTACT } from '../data/siteData';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID;
const CONFIRMATION_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_CONFIRMATION_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export function isEmailJsConfigured() {
  return Boolean(
    SERVICE_ID && ADMIN_TEMPLATE_ID && CONFIRMATION_TEMPLATE_ID && PUBLIC_KEY,
  );
}

function buildTemplateParams(payload) {
  const { name, email, phone, message, packageTitle, source } = payload;

  return {
    user_name: name,
    user_email: email || '',
    user_phone: phone || '',
    user_message: message || '',
    package_title: packageTitle || '',
    source: source || 'contact',
    admin_email: CONTACT.email,
    reply_to: email || '',
  };
}

/** Contact Us — sends enquiry details to your inbox. */
export async function sendEnquiryToAdmin(payload) {
  await emailjs.send(
    SERVICE_ID,
    ADMIN_TEMPLATE_ID,
    {
      ...buildTemplateParams(payload),
      to_name: 'A Way to Makkah',
      to_email: CONTACT.email,
    },
    { publicKey: PUBLIC_KEY },
  );
}

/** Auto-Reply — thanks the visitor after they submit the form. */
export async function sendContactConfirmation(payload) {
  const { name, email } = payload;
  if (!email) return;

  await emailjs.send(
    SERVICE_ID,
    CONFIRMATION_TEMPLATE_ID,
    {
      ...buildTemplateParams(payload),
      to_name: name,
      to_email: email,
    },
    { publicKey: PUBLIC_KEY },
  );
}

/** Runs contact + auto-reply emails in sequence. */
export async function submitEnquiryViaEmailJs(payload) {
  await sendEnquiryToAdmin(payload);

  if (payload.email) {
    try {
      await sendContactConfirmation(payload);
    } catch {
      // Enquiry reached you; auto-reply failure should not block success.
    }
  }
}
