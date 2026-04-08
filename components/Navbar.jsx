import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactModal from './ContactModal';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Our Businesses', href: '/businesses' },
  { label: 'Services', href: '/services' },

  { label: 'ISSDP', href: '/coe' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and scroll to top on path change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav className={`navbar top-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <Link to="/" className="logo">
          <img src="/new_logo.png" alt="BH Group Consultancy Services" className="logo-img" />
        </Link>

        <ul className={`nav-links ${mobileOpen ? 'nav-links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={location.pathname === link.href ? 'active' : ''}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="btn-cta"
            onClick={() => {
              setMobileOpen(false);
              setModalOpen(true);
            }}
          >
            Get in Touch
          </button>

          <button
            className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
