import { useEffect, useRef } from 'react';
import './Businesses.css';

const businesses = [
  {
    id: 1,
    title: 'Tapovan Nest Boys Hostel',
    category: 'Hostel Brand',
    image: '/tapovan-nest-hostel.jpg',
    desc: 'Premium student and working professional accommodation focused on safety, convenience, and a study-friendly environment.'
  },
  {
    id: 2,
    title: 'Nexura',
    category: 'Education Brand',
    image: '/nexura-campus.jpg',
    desc: 'Empowering the next generation through structured learning, internships, and comprehensive admission consultancy.'
  },
  {
    id: 3,
    title: 'BH Tools & Engineering',
    category: 'Engineering Brand',
    image: '/bhtools-engineering.jpg',
    desc: 'Leading precision tooling, mechanical design, and engineering sourcing for top automotive and manufacturing giants.'
  },
  {
    id: 4,
    title: 'Miraesta',
    category: 'Clothing Brand',
    image: '/miraesta-brand.jpg',
    desc: 'A premium fashion and apparel brand dedicated to modern aesthetics, quality fabrics, and lifestyle elegance.'
  },
  {
    id: 5,
    title: 'Entertainment & Films',
    category: 'Media Production',
    image: '/entertainment-film.jpg',
    desc: 'Creating impactful media content and supporting entertainment projects, including Wishful Entertainment Pvt Ltd.'
  }
];

export default function Businesses() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current.querySelectorAll('.business-card');
    cards.forEach((card) => {
      card.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform') {
          card.style.transitionDelay = '0ms';
        }
      });
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="businesses" id="businesses">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Businesses</span>
          <h2 className="section-title">Diversified <span className="text-accent">Ventures</span></h2>
          <p className="section-subtitle">
            Beyond our consulting services, we operate strong standalone brands across hospitality, education, engineering, textiles, and entertainment.
          </p>
        </div>

        <div className="businesses__grid" ref={containerRef}>
          {businesses.map((biz, index) => (
            <div
              key={biz.id}
              className="business-card"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="business-card__image-wrap">
                <img src={biz.image} alt={biz.title} className="business-card__image" />
              </div>
              <div className="business-card__content">
                <h3 className="business-card__title">{biz.title}</h3>
                <span className="business-card__category">{biz.category}</span>
                <button className="btn-explore">
                  Explore <span className="arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
