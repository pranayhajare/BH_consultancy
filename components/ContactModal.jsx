import { useState, useEffect } from 'react';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Engineering Solutions',
    message: '',
    contactMethod: 'Email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Handle open/close animation states
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showModal) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate small network delay
    setTimeout(() => {
      // Build new enquiry object
      const newEnquiry = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString(),
        status: 'New'
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('enquiries') || '[]');
      localStorage.setItem('enquiries', JSON.stringify([newEnquiry, ...existing]));

      setIsSubmitting(false);
      setIsSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Engineering Solutions',
          message: '',
          contactMethod: 'Email'
        });
        onClose();
      }, 2000);
    }, 800);
  };

  return (
    <div className={`cm-overlay ${animateIn ? 'active' : ''}`} onClick={onClose}>
      <div 
        className={`cm-content ${animateIn ? 'active' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cm-close" onClick={onClose}>✕</button>
        
        {isSuccess ? (
          <div className="cm-success-state">
            <div className="cm-success-icon">✅</div>
            <h3>Thank you!</h3>
            <p>We'll contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="cm-header">
              <span className="cm-label">LET'S CONNECT</span>
              <h2 className="cm-title">Send Us An Enquiry</h2>
              <p className="cm-subtitle">Fill in your details and we'll get back to you within 24 hours.</p>
            </div>

            <form className="cm-form" onSubmit={handleSubmit}>
              <div className="cm-row">
                <div className="cm-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="cm-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="cm-row">
                <div className="cm-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                </div>
                <div className="cm-group">
                  <label>Company / Organisation</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} />
                </div>
              </div>

              <div className="cm-group">
                <label>Service Interested In *</label>
                <select name="service" required value={formData.service} onChange={handleChange}>
                  <option value="Engineering Solutions">Engineering Solutions</option>
                  <option value="Strategic Consulting">Strategic Consulting</option>
                  <option value="Educational Services">Educational Services</option>
                  <option value="Event Support">Event Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="cm-group">
                <label>Message / Requirements *</label>
                <textarea name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
              </div>

              <div className="cm-group">
                <label>Preferred Contact Method *</label>
                <div className="cm-radio-group">
                  <label className="cm-radio">
                    <input type="radio" name="contactMethod" value="Email" checked={formData.contactMethod === 'Email'} onChange={handleChange} />
                    <span>Email</span>
                  </label>
                  <label className="cm-radio">
                    <input type="radio" name="contactMethod" value="Phone" checked={formData.contactMethod === 'Phone'} onChange={handleChange} />
                    <span>Phone</span>
                  </label>
                  <label className="cm-radio">
                    <input type="radio" name="contactMethod" value="WhatsApp" checked={formData.contactMethod === 'WhatsApp'} onChange={handleChange} />
                    <span>WhatsApp</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="cm-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Enquiry →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
