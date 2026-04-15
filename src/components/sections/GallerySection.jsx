const galleryContext = require.context('../../assets/Umrah photos', false, /\.(png|jpe?g|webp)$/i);

const galleryImages = galleryContext
  .keys()
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map((key) => ({
    src: galleryContext(key),
    alt: `Umrah journey photo ${key.replace('./', '')}`,
  }));

function GallerySection() {
  return (
    <section id="gallery" className="section" aria-label="Umrah gallery">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">Gallery</div>
            <h2 className="h2">Memories from our Umrah journeys</h2>
            <p className="muted">
              Explore highlights from our trips to Makkah and Madinah. These photos are from our
              Umrah tours collection.
            </p>
          </div>
        </div>

        <div className="galleryGrid">
          {galleryImages.map((image) => (
            <figure key={image.src} className="galleryCard">
              <img
                className="galleryImage"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
