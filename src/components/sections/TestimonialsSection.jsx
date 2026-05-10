function TestimonialsSection({ testimonials = [] }) {
  return (
    <section id="testimonials" className="section testimonialsSection" aria-label="Testimonials">
      <div className="container">
        <div className="sectionHead testimonialsHead">
          <div>
            <div className="kicker">Testimonials</div>
            <h2 className="h2">We make quality travel easy for every Muslim</h2>
            <p className="muted">
              Since we first opened, we have prioritised care, trust, and support for every pilgrim.
            </p>
          </div>
        </div>

        <div className="testimonialGrid">
          {testimonials.map((item) => (
            <article key={item.id} className="testimonialCard">
              <div className="testimonialName">{item.name}</div>
              <div className="testimonialStars" aria-label={`${item.rating} out of 5 stars`}>
                {'★'.repeat(item.rating)}
              </div>
              <p className="testimonialQuote">"{item.quote}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;



