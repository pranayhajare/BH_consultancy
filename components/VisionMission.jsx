import { useEffect, useRef } from 'react';
import './VisionMission.css';

export default function VisionMission() {
  const containerRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

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
      { threshold: 0.15 }
    );

    if (visionRef.current) observer.observe(visionRef.current);
    if (missionRef.current) observer.observe(missionRef.current);

    const cards = [visionRef.current, missionRef.current];
    cards.forEach((card) => {
      if (card) {
        card.addEventListener('transitionend', (e) => {
          if (e.propertyName === 'transform') {
            card.style.transitionDelay = '0ms';
          }
        });
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="vm-section">
      <div className="vm-container">
        
        {/* Section Header */}
        <div className="vm-header">
          <div className="vm-label-wrap">
            <span className="vm-line"></span>
            <span className="vm-label">WHO WE ARE</span>
          </div>
          <h2 className="vm-title">Our Vision &amp; Mission</h2>
          <p className="vm-subtitle">
            Guided by a clear purpose — delivering excellence through engineering,
            education, and strategic consulting.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="vm-grid" ref={containerRef}>
          {/* Vision Card */}
          <div className="vm-card vm-card-left" ref={visionRef}>
            <div className="vm-card-accent"></div>
            <div className="vm-icon">
              👁️
            </div>
            <h3 className="vm-card-title">Our Vision</h3>
            <p className="vm-card-text">
              To be a leading partner of choice for organizations worldwide by providing reliable engineering solutions, strategic consulting, and future-ready educational services. To become a national leader in educational excellence, integrated student services, and large-scale event support.
            </p>
          </div>

          {/* Mission Card */}
          <div className="vm-card vm-card-right" ref={missionRef} style={{ transitionDelay: '150ms' }}>
            <div className="vm-card-accent"></div>
            <div className="vm-icon">
              ⭐
            </div>
            <h3 className="vm-card-title">Our Mission</h3>
            <p className="vm-card-text">
              To provide world-class learning and skill-development opportunities with transparent and ethical business practices. To simplify the admission journey for students, support youth with internships and training, and deliver reliable services powered by experienced engineers and educators.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
