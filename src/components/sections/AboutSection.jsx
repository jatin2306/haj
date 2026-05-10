function AboutSection() {
  const highlights = [
    'Over 15 years of trusted Umrah experience',
    'Tailored packages for families, groups, and individuals',
    'Dedicated local guides in Makkah and Madinah',
    'Visa, hotels, flights, and ground transport support',
  ];

  return (
    <section className="section aboutSection" id="about" aria-label="About us">
      <div className="container split">
        <div className="splitCopy">
          <div className="kicker">About us</div>
          <h2 className="h2">A Way to Makkah Umrah Services</h2>
          <p className="muted aboutLead">
            We help pilgrims complete their sacred journey with confidence, comfort, and peace of
            mind through trusted guidance at every step.
          </p>

          <div className="aboutCopyGrid">
            <p className="muted aboutText">
              From your first enquiry to your return home, our team manages your journey with care.
              We provide clear communication, practical support, and reliable service so you can stay
              focused on worship.
            </p>
            <p className="muted aboutText">
              Our packages include carefully selected hotels, visa assistance, guided ziyarah, and
              dependable transport in Makkah and Madinah to make your trip smooth and spiritually
              enriching.
            </p>
          </div>

          <ul className="aboutHighlights">
            {highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

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
          <div className="mediaCard aboutMediaCard">
            <div className="mediaTop">
              <div className="mediaChip">Your journey</div>
              <div className="mediaChip soft">Trusted care</div>
            </div>
            <div className="mediaTitle">A caring team for your spiritual journey.</div>
            <div className="mediaText">
              We combine personal support with practical planning to make your Umrah experience calm,
              organised, and meaningful.
            </div>
            <div className="mediaBottom">
              <div className="mediaMetric">
                <div className="mediaMetricValue">15+ Years</div>
                <div className="mediaMetricLabel">Experience</div>
              </div>
              <div className="mediaMetric">
                <div className="mediaMetricValue">24/7</div>
                <div className="mediaMetricLabel">Support</div>
              </div>
            </div>
            <div className="mediaBottom">
              <div className="mediaMetric">
                <div className="mediaMetricValue">Hotels</div>
                <div className="mediaMetricLabel">Near Haram</div>
              </div>
              <div className="mediaMetric">
                <div className="mediaMetricValue">Guided</div>
                <div className="mediaMetricLabel">Ziyarah</div>
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
