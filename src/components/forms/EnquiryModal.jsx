import { useEffect, useId, useRef } from 'react';
import EnquiryForm from './EnquiryForm';

function EnquiryModal({ modal, onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!modal.open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    const timer = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector('.enquiryForm input, .enquiryForm textarea')?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.cancelAnimationFrame(timer);
    };
  }, [modal.open, onClose]);

  if (!modal.open) return null;

  const heading = modal.heading || (modal.packageTitle ? 'Enquire about this package' : 'Enquire now');

  return (
    <div className="enquiryModalRoot" role="presentation">
      <button
        type="button"
        className="enquiryModalBackdrop"
        aria-label="Close enquiry form"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="enquiryModalDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="enquiryModalHead">
          <div>
            <h2 className="enquiryModalTitle" id={titleId}>
              {heading}
            </h2>
            {modal.intro ? <p className="enquiryModalIntro muted">{modal.intro}</p> : null}
          </div>
          <button
            type="button"
            className="enquiryModalClose"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <EnquiryForm
          source={modal.source}
          packageId={modal.packageId}
          packageTitle={modal.packageTitle}
          submitLabel="Send enquiry"
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}

export default EnquiryModal;
