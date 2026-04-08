import { useEffect, useState } from 'react';
import './Hero.css';
import nexuraBg from '../assets/nexura-hero-bg.jpg';
import miraestaBg from '../assets/miraesta-hero-bg.jpg';
import entertainmentBg from '../assets/entertainment-hero-bg.jpg';
import bhtoolsBg from '../assets/bhtools-hero-bg.png';
import tapovanBg from '../assets/tapovan-hero-bg.jpg';

const heroSlides = [

  {
    name: 'Tapovan Nest — Boys Hostel',
    badge: '● Safe & Disciplined',
    title: 'A Safe Haven &',
    accent: 'Home Away',
    sub: 'from Home',

    bg: tapovanBg,
  },
  {
    name: 'Nexora — Education Brand',
    badge: '● Next Gen Learning',
    title: 'Shaping Minds,',
    accent: 'Building',
    sub: 'Futures',

    bg: nexuraBg,
  },
  {
    name: 'BH Tools & Engineering',
    badge: '● Precision & Power',
    title: 'Precision Built,',
    accent: 'Performance',
    sub: 'Driven',

    bg: bhtoolsBg,
  },
  {
    name: 'Miraesta — Premium Clothing',
    badge: '● Contemporary Design',
    title: 'Crafted for the',
    accent: 'Refined',
    sub: 'Individual',

    bg: miraestaBg,
  },
  {
    name: 'Entertainment & Films',
    badge: '● Cinematic Experiences',
    title: 'Stories that',
    accent: 'Inspire',
    sub: '& Captivate',

    bg: entertainmentBg,
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const c = heroSlides[current];

  return (
    <section className="hero-section" id="home">

      {/* Background Slides */}
      <div className="slides">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`slide ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bg})` }}
          ></div>
        ))}
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <div className="slide-label" key={`label-${current}`}>{c.name}</div>

        <div className="badge">
          {c.badge}
        </div>

        <h1 className="hero-title" key={`title-${current}`}>
          {c.title.includes('\n') ? c.title.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          )) : c.title} <span className="accent">{c.accent}</span><br />
          <span className="accent">{c.sub.includes('\n') ? c.sub.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          )) : c.sub}</span>
        </h1>

        <p className="hero-desc" key={`desc-${current}`}>
          {c.desc}
        </p>

        <div className="hero-buttons">
          <a href="#services" className="btn-primary-hero">
            Explore Our Services
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#about" className="btn-secondary-hero">Learn More</a>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="dots">
        {heroSlides.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          ></div>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num">25+</div>
          <div className="stat-label">Years of Excellence</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">50+</div>
          <div className="stat-label">Industry Partners</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">10+</div>
          <div className="stat-label">Business Verticals</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">100+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
      </div>

    </section>
  );
}
