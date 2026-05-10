import logo from '../../assets/logo.png';
import hajjPhotoLeft from '../../assets/Umrah photos/20240427_094931.jpg';
import hajjPhotoRight from '../../assets/Umrah photos/20230810_183443.jpg';
import './hajjExperienceSection.css';

const BN_NOTICE =
  'হজের জন্য শুধুমাত্র বাংলাদেশি পাসপোর্টধারীরাই আবেদন করতে পারবেন। আবেদনের শেষ তারিখ অক্টোবর শেষ পর্যন্ত।';

function HajjExperienceSection({ telHref, phoneDisplay }) {
  const phone = phoneDisplay || '07838 648097';

  return (
    <section
      className="section hajjExperienceSection"
      id="hajj-experience"
      aria-label="Hajj Experience 2027 packages"
    >
      <div className="hajjExperienceShell">
        <header className="hajjExperienceHero">
          <div className="hajjExperiencePattern" aria-hidden />
          <div className="hajjExperienceHeroInner">
            <p className="hajjExperienceKicker">Once in a lifetime</p>
            <h2 className="hajjExperienceTitle">Hajj experience</h2>
            <p className="hajjExperienceYear">Hajj 1448 / 2027</p>
          </div>
        </header>

        <div className="hajjExperienceDivider" role="presentation">
          <span className="hajjExperienceDividerLine" aria-hidden />
          <span className="hajjExperienceDividerText">Our packages</span>
          <span className="hajjExperienceDividerLine" aria-hidden />
        </div>

        <div className="hajjExperienceMain">
          <div className="hajjExperiencePackages">
            <article className="hajjPackageCard">
              <div className="hajjPackageCardHead">Shifting 5★</div>
              <div className="hajjPackageCardBody">
                <span className="hajjPackageBasis">Quad basis</span>
                <span className="hajjPackagePrice">
                  £8449<sup className="hajjPackageAsterisk">*</sup>
                </span>
              </div>
            </article>
            <article className="hajjPackageCard">
              <div className="hajjPackageCardHead">Non-shifting</div>
              <div className="hajjPackageCardBody">
                <span className="hajjPackageBasis">Deluxe</span>
                <span className="hajjPackagePrice">
                  £6549<sup className="hajjPackageAsterisk">*</sup>
                </span>
              </div>
            </article>
            <p className="hajjRegistration">
              <span className="hajjRegistrationIcon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
                  <path
                    d="M7 3v2M17 3v2M4 9h16M6 5h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Last date of registration mid-October 2026
            </p>
          </div>

          <aside className="hajjNotice" aria-label="Eligibility notice">
            <div className="hajjNoticePanel">
              <p className="hajjNoticeText" lang="bn">
                {BN_NOTICE}
              </p>
            </div>
            <div className="hajjPassportBadge" aria-hidden="true">
              <svg viewBox="0 0 120 160" className="hajjPassportSvg">
                <defs>
                  <linearGradient id="hajjPassportGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a5c3a" />
                    <stop offset="100%" stopColor="#0d3d24" />
                  </linearGradient>
                </defs>
                <rect x="4" y="8" width="112" height="144" rx="10" fill="url(#hajjPassportGreen)" />
                <rect x="14" y="22" width="92" height="52" rx="4" fill="#f5e6c8" opacity="0.92" />
                <rect x="14" y="86" width="92" height="54" rx="4" fill="rgba(255,255,255,0.12)" />
                <text x="60" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="system-ui, sans-serif">
                  Passport
                </text>
              </svg>
            </div>
          </aside>
        </div>

        <div className="hajjPhotoStrip" aria-hidden="true">
          <div className="hajjPhotoStripCell hajjPhotoStripCell--left">
            <img src={hajjPhotoLeft} alt="" loading="lazy" decoding="async" />
          </div>
          <div className="hajjPhotoStripCell hajjPhotoStripCell--right">
            <img src={hajjPhotoRight} alt="" loading="lazy" decoding="async" />
          </div>
        </div>

        <footer className="hajjExperienceFooter">
          <a className="hajjFooterPhone" href={telHref}>
            Call us: <strong>{phone}</strong>
          </a>
          <div className="hajjFooterBrand">
            <img src={logo} alt="" className="hajjFooterLogo" width="40" height="40" />
            <div className="hajjFooterBrandText">
              <span className="hajjFooterBrandName">Away to Makkah</span>
              <span className="hajjFooterBrandTag">Umrah services</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default HajjExperienceSection;
