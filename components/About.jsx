import { useEffect, useRef, useState } from 'react';
import './About.css';

const timeline = [
  { year: '2000', title: 'DD Engineering Works', desc: 'Founded by Mr. Amarnath Singh with a vision to set a benchmark in Tooling and Dies making.' },
  { year: '2005', title: 'Dhirendra Singh Joins', desc: 'Mr. Dhirendra Amarnath Singh joined DD Engineering Works, bringing youth empowerment and skill development.' },
  { year: '2025', title: 'BH Consulting & Sourcing', desc: 'Formally incorporated as BH Consulting & Sourcing (OPC) Pvt Ltd with diversified service verticals.' },
];

export default function About() {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll('.about__timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about">
      <div className="about__accent-shape"></div>
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <span className="section-label">About Us</span>
            <h2 className="section-title">A Legacy of <span className="text-accent">Excellence</span> Since 2000</h2>
            <p className="about__text">
              BH Consulting and Sourcing (OPC) Pvt Ltd was founded in 2025, but our presence in the market dates back to 2000.
              Originally known as DD Engineering Works, we started our journey with a vision to set a benchmark in the Tooling and
              Dies making segment under the guidance of founder Mr. Amarnath Singh.
            </p>
            <p className="about__text">
              Over the years, our company evolved through Triumph MultiCare to its current form as BH Consulting & Sourcing,
              expanding into engineering consulting, education, sourcing, and specialized services while maintaining our core
              commitment to quality and innovation.
            </p>

            <div className="about__highlights">
              <div className="about__highlight">
                <div className="about__highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h4>Multi-Sector Expertise</h4>
                  <p>Engineering, Education, Hospitality & Media</p>
                </div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <h4>25+ Years Legacy</h4>
                  <p>Proven track record with leading OEMs</p>
                </div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h4>Youth Empowerment</h4>
                  <p>Skills, internships & career guidance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about__right" ref={sectionRef}>
            <h3 className="about__timeline-title">Our Journey</h3>
            <div className="about__timeline">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`about__timeline-item ${visibleItems.includes(i) ? 'about__timeline-item--visible' : ''}`}
                  data-index={i}
                >
                  <div className="about__timeline-dot">
                    <span>{item.year}</span>
                  </div>
                  <div className="about__timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
