function AboutSection() {
  return (
    <section className="section" id="about" aria-label="About us">
      <div className="container split">
        <div className="splitCopy">
          <div className="kicker">About us</div>
          <h2 className="h2">A Way to Makkah Umrah Services</h2>
          <p className="muted">
            At A Way to Makkah Umrah Services, we are dedicated to helping
            Muslims fulfil their sacred journey to Makkah and Madinah with ease,
            comfort, and peace of mind.
          </p>
          <p className="muted">
            With over 15 years of experience, we specialise in providing
            personalised Hajj and Umrah packages tailored to meet the unique
            needs of each pilgrim. Whether you are travelling alone, with
            family, or in a group, we ensure your journey is smooth,
            well-organised, and spiritually enriching.
          </p>
          <p className="muted">
            We take pride in offering dedicated local guides in Makkah and
            Madinah, who are there to support you throughout your stay. From
            guidance on rituals to on-the-ground assistance, our team ensures
            you feel confident, informed, and cared for at every step.
          </p>
          <p className="muted">
            Our packages also include guided tours to visit historical sites and
            significant locations in Makkah and Madinah, allowing you to deepen
            your understanding of Islamic history while enhancing your spiritual
            experience.
          </p>
          <p className="muted">
            Our services include visa assistance, flight bookings, carefully
            selected hotel accommodations close to the Haram, and reliable
            ground transportation. Every detail is managed with professionalism
            so you can focus entirely on your worship.
          </p>
          <p className="muted">
            What sets us apart is our commitment to sincerity, trust, and
            customer care. We strive to build lasting relationships with our
            clients by delivering a service that is transparent, reliable, and
            centred around your spiritual needs.
          </p>

          <div className="vmvGrid">
            <div className="vmv">
              <div className="vmvLabel">Our vision</div>
              <p className="vmvText">
                To be a trusted name in Hajj and Umrah services, known for
                excellence, care, and integrity.
              </p>
            </div>
            <div className="vmv">
              <div className="vmvLabel">Our mission</div>
              <p className="vmvText">
                To provide a seamless and spiritually fulfilling journey through
                personalised service and expert guidance.
              </p>
            </div>
            <div className="vmv">
              <div className="vmvLabel">Our values</div>
              <ul className="vmvList">
                <li>Integrity and honesty</li>
                <li>Personalised customer care</li>
                <li>Spiritual responsibility</li>
                <li>Quality and reliability</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="splitMedia" aria-hidden="true">
          <div className="mediaCard">
            <div className="mediaTop">
              <div className="mediaChip">Your journey</div>
              <div className="mediaChip soft">Trusted care</div>
            </div>
            <div className="mediaTitle">Your journey to Makkah begins with us.</div>
            <div className="mediaText">
              Dedicated support, clear communication, and guidance so you can
              travel with confidence.
            </div>
            <div className="mediaBottom">
              <div className="mediaMetric">
                <div className="mediaMetricValue">Visa</div>
                <div className="mediaMetricLabel">Assistance</div>
              </div>
              <div className="mediaMetric">
                <div className="mediaMetricValue">Ground</div>
                <div className="mediaMetricLabel">Transport</div>
              </div>
            </div>
          </div>
          <div className="mediaGlow" />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
