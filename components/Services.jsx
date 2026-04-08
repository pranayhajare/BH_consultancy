import { useState, useEffect, useRef } from 'react';
import './Services.css';

const services = [
  {
    id: 1,

    title: 'Engineering Consulting',
    desc: 'Expert engineering guidance, design solutions, and project management services.',
    details: ['Mechanical & Electrical Engineering Design', 'Process Optimization & Industrial Automation', 'Technical Feasibility Studies', 'Engineering Audits & Compliance', 'Project Planning, Execution & Quality Control'],
    color: '#1e5aa8',
  },
  {
    id: 2,

    title: 'Sourcing & Procurement',
    desc: 'Optimizing supply chain operations and reducing procurement costs.',
    details: ['Global Sourcing of Machinery & Equipment', 'Vendor Identification & Evaluation', 'Supply Chain & Logistics Coordination', 'Contract Negotiation', 'Quality Assurance & Inspection Services'],
    color: '#0d7377',
  },
  {
    id: 3,

    title: 'Technical Services',
    desc: 'End-to-end technical support solutions to enhance operational efficiency.',
    details: ['Skilled Technical Workforce Deployment', 'Maintenance, Repair & Operations Support', 'On-site Engineering Assistance', 'Facility Management Services', 'Outsourced Engineering & Technical Services'],
    color: '#6c3fa0',
  },
  {
    id: 4,

    title: 'Education & Training',
    desc: 'Bridging the skill gap with structured, industry-ready learning programs.',
    details: ['Technical & Vocational Training', 'Professional Certification Courses', 'Corporate Training & Skill Development', 'Curriculum Design & Implementation', 'Internship & Placement Support'],
    color: '#c05621',
  },
  {
    id: 5,
    title: 'Centre of Excellence',
    desc: 'Advanced learning hub for technology exposure and career enhancement.',
    details: ['Skill-Development Workshops', 'Industry-Integrated Training', 'Technical & Soft Skills Programs', 'Career Guidance and Mentoring', 'Collaboration with Industry Experts'],
    color: '#b8860b',
  },
  {
    id: 6,

    title: 'Admission Consultancy',
    desc: 'Reliable and transparent support for students seeking admissions.',
    details: ['Career Counselling & Stream Selection', 'College and Course Guidance', 'Application & Documentation Support', 'Scholarship & Financial Aid Guidance', 'Personalized Admission Roadmaps'],
    color: '#2d6a4f',
  },
  {
    id: 7,

    title: 'Internship Programs',
    desc: 'Creating opportunities for youth to gain real-world work experience.',
    details: ['Internship Placement in Companies', 'Skill-Building Projects', 'Industry Visits & Exposure Sessions', 'Internship Certification', 'Performance Evaluation & Mentoring'],
    color: '#9b2226',
  },
  {
    id: 8,

    title: 'Hostel Services',
    desc: 'Safe, hygienic, and well-supervised accommodations under Tapovan Next.',
    details: ['Secure Accommodation', 'Nutritious Food & Mess Management', 'Study-Friendly Environment', '24/7 Support Staff & Security', 'Digital Library & Transport Support'],
    color: '#3a5a9c',
  },
  {
    id: 9,

    title: 'GATE Preparation',
    desc: 'Comprehensive coaching for GATE and competitive exam preparation.',
    details: ['Expert Faculty', 'Structured Curriculum & Study Materials', 'Test Series & Mock Exams', 'Doubt-Clearing Sessions', 'Performance Tracking & Mentoring'],
    color: '#e07b00',
  },
  {
    id: 10,

    title: 'Maha Kumbh Services',
    desc: 'Organized large-scale support services during the Kumbh.',
    details: ['Accommodation & Tent City Management', 'Volunteer & Workforce Deployment', 'Transport & Crowd-Management', 'Pilgrim Assistance Services', 'Promoting Make in India & Digital India'],
    color: '#7c3aed',
  },
];

export default function Services() {
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

    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.services__card');
      cards.forEach((card) => {
        card.addEventListener('transitionend', (e) => {
          if (e.propertyName === 'transform') {
            card.style.transitionDelay = '0ms';
          }
        });
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" id="services">
      <div className="services__bg-pattern"></div>
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Business <span className="text-accent">Verticals</span></h2>
          <p className="section-subtitle">
            With 10 diverse business verticals, we deliver comprehensive solutions across
            engineering, education, and specialized services.
          </p>
        </div>

        <div className="services__grid" ref={containerRef}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className="services__card"
              style={{ '--card-accent': service.color, transitionDelay: `${index * 100}ms` }}
              id={`service-${service.id}`}
            >
              <div className="services__card-header">
                <span className="services__card-number">
                  {String(service.id).padStart(2, '0')}
                </span>
                <span className="services__card-icon">{service.icon}</span>
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.desc}</p>
              <ul className="services__card-details">
                {service.details.map((detail, j) => (
                  <li key={j}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--card-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="services__card-glow" style={{ background: service.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
