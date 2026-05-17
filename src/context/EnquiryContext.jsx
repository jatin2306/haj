import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import EnquiryModal from '../components/forms/EnquiryModal';

const VISIT_POPUP_KEY = 'tt_visit_enquiry_shown';
const VISIT_POPUP_DELAY_MS = 2800;

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [modal, setModal] = useState({
    open: false,
    packageId: null,
    packageTitle: null,
    source: 'modal',
    heading: null,
    intro: null,
  });

  const openEnquiry = useCallback((options = {}) => {
    setModal({
      open: true,
      packageId: options.packageId ?? null,
      packageTitle: options.packageTitle ?? null,
      source: options.source ?? 'modal',
      heading: options.heading ?? null,
      intro: options.intro ?? null,
    });
  }, []);

  const closeEnquiry = useCallback(() => {
    setModal((current) => ({ ...current, open: false }));
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(VISIT_POPUP_KEY)) return undefined;

    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem(VISIT_POPUP_KEY)) return;
      sessionStorage.setItem(VISIT_POPUP_KEY, '1');
      openEnquiry({
        source: 'popup',
        heading: 'Enquire now',
        intro:
          'Tell us about your travel dates and group size. Our team will reply with availability and payment options.',
      });
    }, VISIT_POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [openEnquiry]);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry }),
    [openEnquiry, closeEnquiry],
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal modal={modal} onClose={closeEnquiry} />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error('useEnquiry must be used within EnquiryProvider');
  }
  return ctx;
}
