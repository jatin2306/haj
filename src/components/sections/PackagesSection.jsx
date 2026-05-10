import packageBg1 from '../../assets/Lutonumrahtours photos/1.jpg';
import packageBg2 from '../../assets/Lutonumrahtours photos/2.jpg';
import packageBg3 from '../../assets/Lutonumrahtours photos/3.jpg';
import packageBg4 from '../../assets/Lutonumrahtours photos/4.jpg';
import packageBg5 from '../../assets/Lutonumrahtours photos/5.jpg';
import packageBg6 from '../../assets/Lutonumrahtours photos/6.jpg';
import packageBg7 from '../../assets/Lutonumrahtours photos/7.jpg';
import packageBg8 from '../../assets/Lutonumrahtours photos/8.jpg';
import packageBg9 from '../../assets/Lutonumrahtours photos/9.jpg';

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
}) {
  const flightsLineBreakText = 'Please call our agents for flights';
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
                  <div>{p.kids}</div>
                  {p.earlyBird ? <div className="earlyBird">{p.earlyBird}</div> : null}
                  {p.flightsNote ? (
                    <div className="packageNote">{renderFlightsNote(p.flightsNote)}</div>
                  ) : null}
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
