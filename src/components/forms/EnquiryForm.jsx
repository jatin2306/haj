import { useEffect, useState } from 'react';
import { isEmailJsConfigured, submitEnquiryViaEmailJs } from '../../api/emailjsApi';
import { EMPTY_ENQUIRY, validateEnquiry } from '../../utils/enquiryValidation';

const MODAL_CLOSE_DELAY_MS = 2800;

function PackageField({ packageTitle }) {
  return (
    <div className="field">
      <div className="fieldLabel">Package</div>
      <div className="enquiryPackageTag">{packageTitle}</div>
    </div>
  );
}

function EnquiryFormSuccess({ variant, onReset, closing }) {
  const isModal = variant === 'modal';

  return (
    <div className="enquiryFormSuccess" role="status" aria-live="polite">
      <div className="enquiryFormSuccessIcon" aria-hidden="true">
        <span className="enquiryFormSuccessCheck">✓</span>
      </div>
      <h3 className="enquiryFormSuccessTitle">Message sent!</h3>
      <p className="enquiryFormSuccessLead">
        Thanks for connecting! We will be back to you soon.
      </p>
      <p className="enquiryFormSuccessNote muted">
        {isModal
          ? closing
            ? 'Closing…'
            : 'This window will close in a moment.'
          : 'We have received your enquiry. A confirmation email is on its way if you provided your email address.'}
      </p>
      {!isModal ? (
        <button type="button" className="btn btnPrimary btnFull" onClick={onReset}>
          Send another message
        </button>
      ) : null}
    </div>
  );
}

function EnquiryForm({
  variant = 'full',
  source = 'contact',
  packageId = null,
  packageTitle = null,
  submitLabel = 'Send enquiry',
  onSuccess,
  closeAfterSuccessMs,
  requireEmail = true,
  requireMessage = true,
}) {
  const [values, setValues] = useState(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [closing, setClosing] = useState(false);

  const isMini = variant === 'mini';
  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';
  const formVariant = closeAfterSuccessMs ? 'modal' : variant;
  const fieldId = (name) => `${source}-${name}`;

  const resetForm = () => {
    setValues({ ...EMPTY_ENQUIRY });
    setErrors({});
    setStatus('idle');
    setFeedback('');
    setClosing(false);
  };

  useEffect(() => {
    if (!isSuccess || !closeAfterSuccessMs || !onSuccess) return undefined;

    const closeTimer = window.setTimeout(() => {
      setClosing(true);
      onSuccess();
    }, closeAfterSuccessMs);

    return () => window.clearTimeout(closeTimer);
  }, [isSuccess, closeAfterSuccessMs, onSuccess]);

  const updateField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateEnquiry(values, { requireEmail, requireMessage });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      setFeedback('');
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim() || undefined,
      phone: values.phone.trim(),
      message: values.message.trim(),
      packageId: packageId || undefined,
      packageTitle: packageTitle || undefined,
      source,
    };

    setStatus('submitting');
    setFeedback('');

    if (!isEmailJsConfigured()) {
      setStatus('error');
      setFeedback(
        'Contact form is temporarily unavailable. Please call or email us directly.',
      );
      return;
    }

    try {
      await submitEnquiryViaEmailJs(payload);
      setStatus('success');
    } catch {
      setStatus('error');
      setFeedback(
        'We could not send your message. Please try again or contact us by phone or email.',
      );
    }
  };

  if (isSuccess) {
    return (
      <EnquiryFormSuccess
        variant={formVariant}
        onReset={resetForm}
        closing={closing}
      />
    );
  }

  return (
    <form
      className={`enquiryForm enquiryForm--${variant}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {packageTitle ? <PackageField packageTitle={packageTitle} /> : null}

      <div className={isMini ? 'miniFormRow' : 'enquiryFormRow'}>
        <div className="field">
          <label className="fieldLabel" htmlFor={fieldId('name')}>
            Name
          </label>
          <input
            id={fieldId('name')}
            className={`fieldInput${errors.name ? ' fieldInputError' : ''}`}
            type="text"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={updateField('name')}
            disabled={isSubmitting}
          />
          {errors.name ? <div className="fieldError">{errors.name}</div> : null}
        </div>
        <div className="field">
          <label className="fieldLabel" htmlFor={fieldId('phone')}>
            Phone
          </label>
          <input
            id={fieldId('phone')}
            className={`fieldInput${errors.phone ? ' fieldInputError' : ''}`}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={updateField('phone')}
            disabled={isSubmitting}
          />
          {errors.phone ? <div className="fieldError">{errors.phone}</div> : null}
        </div>
      </div>

      {!isMini ? (
        <div className="field">
          <label className="fieldLabel" htmlFor={fieldId('email')}>
            Email
          </label>
          <input
            id={fieldId('email')}
            className={`fieldInput${errors.email ? ' fieldInputError' : ''}`}
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={updateField('email')}
            disabled={isSubmitting}
          />
          {errors.email ? <div className="fieldError">{errors.email}</div> : null}
        </div>
      ) : null}

      <div className="field">
        <label className="fieldLabel" htmlFor={fieldId('message')}>
          {isMini ? 'How can we help?' : 'Message'}
        </label>
        <textarea
          id={fieldId('message')}
          className={`fieldTextarea${errors.message ? ' fieldInputError' : ''}`}
          name="message"
          rows={isMini ? 3 : 4}
          value={values.message}
          onChange={updateField('message')}
          disabled={isSubmitting}
          placeholder={
            isMini
              ? 'Travel dates, group size, or questions…'
              : 'Package interest, travel dates, group size…'
          }
        />
        {errors.message ? <div className="fieldError">{errors.message}</div> : null}
      </div>

      {feedback ? (
        <p className={`formFeedback formFeedback--${status}`} role="alert">
          {feedback}
        </p>
      ) : null}

      <button
        className="btn btnPrimary btnFull"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}

export { MODAL_CLOSE_DELAY_MS };
export default EnquiryForm;
