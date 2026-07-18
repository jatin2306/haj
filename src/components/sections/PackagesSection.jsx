import { useEnquiry } from '../../context/EnquiryContext';
import packageBg1 from '../../assets/Lutonumrahtours photos/1.jpg';
import packageBg2 from '../../assets/Lutonumrahtours photos/2.jpg';
import packageBg3 from '../../assets/Lutonumrahtours photos/3.jpg';
import packageBg4 from '../../assets/Lutonumrahtours photos/4.jpg';
import packageBg5 from '../../assets/Lutonumrahtours photos/5.jpg';
import packageBg6 from '../../assets/Lutonumrahtours photos/6.jpg';
import packageBg7 from '../../assets/Lutonumrahtours photos/7.jpg';
import packageBg8 from '../../assets/Lutonumrahtours photos/8.jpg';
import packageBg9 from '../../assets/Lutonumrahtours photos/9.jpg';

function packageWhatsAppHref(waHref, packageTitle) {
  const text = encodeURIComponent(`Hi, I'd like to enquire about: ${packageTitle}`);
  return `${waHref}?text=${text}`;
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.882 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const defaultUmrahIntro = (deposit) => (
  <>
    Prices shown are per person for room sharing as stated.
    £{deposit.toFixed(2)} deposit with payment plan applies where listed. Breakfast included unless
    otherwise stated on your booking. Confirm flight arrangements with our agents for packages that do
    not include flights.
  </>
);

function PackagesSection({
  packages,
  sectionId = 'packages',
  sectionClassName = 'section alt',
  kicker = 'Packages',
  heading = 'Umrah packages - dates and prices',
  ariaLabel = 'Umrah packages',
  intro,
  waHref,
}) {
  const { openEnquiry } = useEnquiry();
  const flightsLineBreakText = 'Please call our agents for flights.';
  const priceRows = [
    { key: 'quad', label: 'Quad sharing' },
    { key: 'triple', label: 'Triple sharing' },
    { key: 'twin', label: 'Twin sharing' },
  ];
  const packageBackgrounds = [
    packageBg1,
    packageBg2,
    packageBg3,
    packageBg4,
    packageBg5,
    packageBg6,
    packageBg7,
    packageBg8,
    packageBg9,
  ];

  const renderFlightsNote = (note) => {
    if (!note.includes(flightsLineBreakText)) {
      return note;
    }

    const [firstLine] = note.split(flightsLineBreakText);
    return (
      <>
        {firstLine.trimEnd()}
        <br />
        {flightsLineBreakText}
      </>
    );
  };

  const introContent =
    intro !== undefined ? intro : defaultUmrahIntro(packages[0].deposit);

  return (
    <section className={sectionClassName} id={sectionId} aria-label={ariaLabel}>
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">{kicker}</div>
            <h2 className="h2">{heading}</h2>
            <p className="muted">{introContent}</p>
          </div>
        </div>

        <div className="packageGrid">
          {packages.map((p, index) => (
            <article
              key={p.id}
              className="packageCard"
            >
              <div className="packageCardContent">
                <div className="packageCardHead">
                  <span className="packageTier">{p.tier}</span>
                  <h3 className="packageCardTitle">{p.title}</h3>
                  <div className="packageDates">Travel dates: {p.dates}</div>
                </div>
                <div className="packageStays">
                  <div className="packageStay">
                    <span className="packageStayLabel">Madinah</span>
                    {p.madinah}
                  </div>
                  <div className="packageStay">
                    <span className="packageStayLabel">Makkah</span>
                    {p.makkah}
                  </div>
                </div>
                <ul className="packageIncludes">
                  {p.includes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="priceGrid" aria-label="Prices per person">
                  {priceRows.map(({ key, label }) => {
                    const value = p.prices?.[key];
                    if (typeof value !== 'number') {
                      return null;
                    }

                    return (
                      <div className="priceCell" key={key}>
                        <div className="priceLabel">{label}</div>
                        <div className="priceValue">£{value.toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="packageFoot">
                  <div>£{p.deposit.toFixed(2)} deposit with payment plan</div>
                  {p.mealNote ? <div>{p.mealNote}</div> : null}
                  {p.breakfast ? <div>Breakfast included</div> : null}
                  {p.kids ? <div>{p.kids}</div> : null}
                  {p.earlyBird ? <div className="earlyBird">{p.earlyBird}</div> : null}
                  {p.flightsNote ? (
                    <div className="packageNote">{renderFlightsNote(p.flightsNote)}</div>
                  ) : null}
                  <div className="packageCardActions">
                    <button
                      type="button"
                      className="btn btnPrimary packageEnquireBtn"
                      onClick={() =>
                        openEnquiry({
                          packageId: p.id,
                          packageTitle: p.title,
                          source: 'package',
                        })
                      }
                    >
                      Enquire now
                    </button>
                    {waHref ? (
                      <a
                        className="packageWhatsAppBtn"
                        href={packageWhatsAppHref(waHref, p.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp about ${p.title}`}
                      >
                        <WhatsAppIcon />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
              <div
                className="packageCardMedia"
                style={{
                  backgroundImage: `url(${packageBackgrounds[index % packageBackgrounds.length]})`,
                }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PackagesSection;
