function PackagesSection({ packages }) {
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
          {packages.map((p) => (
            <article key={p.id} className="packageCard">
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
                {p.breakfast ? <div>Breakfast included</div> : null}
                <div>{p.kids}</div>
                {p.earlyBird ? <div className="earlyBird">{p.earlyBird}</div> : null}
                {p.flightsNote ? (
                  <div className="packageNote">{p.flightsNote}</div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PackagesSection;
