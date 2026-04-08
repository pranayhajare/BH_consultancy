import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <h3 className="footer__logo">BH Consulting & Sourcing</h3>
            <p className="footer__desc">
              A diversified service organization dedicated to providing high-quality educational support,
              skill development, career guidance, and specialized service solutions.
            </p>
          </div>

          <div className="footer__links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>

            </ul>
          </div>

          <div className="footer__links-group">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Engineering Consulting</a></li>
              <li><a href="#services">Sourcing & Procurement</a></li>
              <li><a href="#services">Admission Consultancy</a></li>
              <li><a href="#services">Corporate Training</a></li>
            </ul>
          </div>

          <div className="footer__contact" id="contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                +91 98765 43210
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                info@bhconsulting.co.in
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Pune, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} BH Consulting & Sourcing (OPC) Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
