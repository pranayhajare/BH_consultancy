import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded mock credentials
    if (email === 'admin@bhconsulting.com' && password === 'admin123') {
      sessionStorage.setItem('adminToken', 'active');
      navigate('/admin');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="admin-login-layout">
      <div className="admin-login-card">
        <div className="login-logo">
          <div className="logo-box">BH</div>
        </div>
        <h2>Admin Authentication</h2>
        <p className="login-subtitle">Please sign in to access the management dashboard.</p>
        
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bhconsulting.com"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className="login-submit-btn">
            Secure Log In →
          </button>
        </form>

        <a href="/" className="login-back-link">← Back to Main Site</a>
      </div>
    </div>
  );
}
