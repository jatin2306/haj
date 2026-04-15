import packageBg1 from '../../assets/Lutonumrahtours photos/1.jpg';
import packageBg2 from '../../assets/Lutonumrahtours photos/2.jpg';
import packageBg3 from '../../assets/Lutonumrahtours photos/3.jpg';
import packageBg4 from '../../assets/Lutonumrahtours photos/4.jpg';
import packageBg5 from '../../assets/Lutonumrahtours photos/5.jpg';
import packageBg6 from '../../assets/Lutonumrahtours photos/6.jpg';
import packageBg7 from '../../assets/Lutonumrahtours photos/7.jpg';
import packageBg8 from '../../assets/Lutonumrahtours photos/8.jpg';
import packageBg9 from '../../assets/Lutonumrahtours photos/9.jpg';

function PackagesSection({ packages }) {
  const flightsLineBreakText = 'Please call our agents for flights';
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

  return (
    <section className="section alt" id="packages" aria-label="Umrah packages">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">Packages</div>
            <h2 className="h2">Umrah packages - dates and prices</h2>
            <p className="muted">
              Prices shown are per person for room sharing as stated.
              £{packages[0].deposit}.00 deposit with payment plan applies where
              listed. Breakfast included unless otherwise stated on your
              booking. Confirm flight arrangements with our agents for packages
              that do not include flights.
            </p>
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
                  <div className="priceCell">
                    <div className="priceLabel">Quad sharing</div>
                    <div className="priceValue">£{p.prices.quad.toFixed(2)}</div>
                  </div>
                  <div className="priceCell">
                    <div className="priceLabel">Triple sharing</div>
                    <div className="priceValue">
                      £{p.prices.triple.toFixed(2)}
                    </div>
                  </div>
                  <div className="priceCell">
                    <div className="priceLabel">Twin sharing</div>
                    <div className="priceValue">£{p.prices.twin.toFixed(2)}</div>
                  </div>
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
