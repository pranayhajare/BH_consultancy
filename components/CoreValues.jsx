import { useEffect, useRef } from 'react';
import './CoreValues.css';

const values = [
  {
    title: 'Integrity & Transparency',
    desc: 'We operate with honesty and openness in every client relationship and business decision.',
  },
  {
    title: 'Quality & Innovation',
    desc: 'Delivering exceptional standards while continuously pushing the boundaries of what is possible.',
  },
  {
    title: 'Customer-Centric Approach',
    desc: 'Every solution is tailored to the unique needs, goals, and expectations of our clients.',
  },
  {
    title: 'Sustainability & Responsibility',
    desc: 'Building a better future through environmentally conscious and socially responsible practices.',
  },
  {
    title: 'Continuous Learning',
    desc: 'Fostering a culture of growth, curiosity, and skill development at every level of the organisation.',
  },
  {
    title: 'Integrity & Trust',
    desc: 'Earning and maintaining trust through consistent, ethical, and reliable actions every day.',
  },
  {
    title: 'Student-Centric Approach',
    desc: 'Placing students at the heart of our educational services to unlock their fullest potential.',
  },
  {
    title: 'Quality & Excellence',
    desc: 'Setting the highest benchmarks across engineering, consulting, and educational deliverables.',
  },
  {
    title: 'Innovation & Growth',
    desc: 'Embracing new ideas and technologies to drive sustainable business and personal growth.',
  },
  {
    title: 'Service with Responsibility',
    desc: 'Going beyond deliverables to create real, positive impact for communities and stakeholders.',
  },
];

export default function CoreValues() {
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

    const cards = containerRef.current.querySelectorAll('.value-card');
    cards.forEach((card) => {
      // Clear transition delay once the enter animation is complete
      // so hover transitions (mouse leave) don't get delayed.
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
    <section className="core-values-section" id="core-values">
      <div className="section-container">
        
        <div className="cv-header">
          <div className="cv-label-wrap">
            <span className="cv-line"></span>
            <span className="cv-label">WHAT WE STAND FOR</span>
          </div>
          <h2 className="cv-title">
            Our <em>Core Values</em>
          </h2>
          <p className="cv-subtitle">
            Rooted in decades of experience, these principles guide every decision, relationship, and service we deliver.
          </p>
        </div>

        <div className="cv-grid" ref={containerRef}>

          {/* Row 1: 3 hexes */}
          <div className="cv-row">
            {[values[0], values[1], values[2]].map((val, idx) => (
              <div className="value-card" key={val.title} style={{ transitionDelay: `${idx * 100}ms` }}>
                <h3 className="card-title">{val.title}</h3>
                <p className="card-desc">{val.desc}</p>
              </div>
            ))}
          </div>

          {/* Row 2: 4 hexes (staggered right via CSS) */}
          <div className="cv-row">
            {[values[3], values[4], values[5], values[6]].map((val, idx) => (
              <div className="value-card" key={val.title} style={{ transitionDelay: `${(idx + 3) * 100}ms` }}>
                <h3 className="card-title">{val.title}</h3>
                <p className="card-desc">{val.desc}</p>
              </div>
            ))}
          </div>

          {/* Row 3: 3 hexes */}
          <div className="cv-row">
            {[values[7], values[8], values[9]].map((val, idx) => (
              <div className="value-card" key={val.title} style={{ transitionDelay: `${(idx + 7) * 100}ms` }}>
                <h3 className="card-title">{val.title}</h3>
                <p className="card-desc">{val.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
