import hotel1 from '../../assets/1.jpg';
import hotel2 from '../../assets/2.jpg';
import hotel3 from '../../assets/3.jpg';
import hotel4 from '../../assets/4.jpg';
import hotel5 from '../../assets/5.jpg';
import hotel6 from '../../assets/6.jpg';
import hotel7 from '../../assets/7.jpg';
import hotel8 from '../../assets/8.jpg';
import hotel9 from '../../assets/9.jpg';
import hotel10 from '../../assets/10.jpg';
import hotel11 from '../../assets/11.jpg';
import hotel12 from '../../assets/12.jpg';
import hotel13 from '../../assets/13.jpg';
import hotel14 from '../../assets/14.jpg';
import hotel15 from '../../assets/15.jpg';
import hotel16 from '../../assets/16.jpg';

const HOTEL_IMAGES = {
  '1.jpg': hotel1,
  '2.jpg': hotel2,
  '3.jpg': hotel3,
  '4.jpg': hotel4,
  '5.jpg': hotel5,
  '6.jpg': hotel6,
  '7.jpg': hotel7,
  '8.jpg': hotel8,
  '9.jpg': hotel9,
  '10.jpg': hotel10,
  '11.jpg': hotel11,
  '12.jpg': hotel12,
  '13.jpg': hotel13,
  '14.jpg': hotel14,
  '15.jpg': hotel15,
  '16.jpg': hotel16,
};

function HotelsSection({ hotels = [] }) {
  return (
    <section id="hotels" className="section alt">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">Hotel Options</div>
            <h2 className="h2">Choose from our featured hotel stays</h2>
            <p className="muted">
              Browse our latest Makkah and Madinah hotel options and pick what suits your stay best.
            </p>
          </div>
        </div>

        <div className="hotelGrid">
          {hotels.map((hotel) => (
            <article key={hotel.id} className="hotelCard">
              <img
                className="hotelImage"
                src={HOTEL_IMAGES[hotel.image]}
                alt={hotel.name}
                loading="lazy"
                decoding="async"
              />
              <div className="hotelBody">
                <div className="hotelPrice">{hotel.priceText}</div>
                <h3 className="hotelName">{hotel.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HotelsSection;
