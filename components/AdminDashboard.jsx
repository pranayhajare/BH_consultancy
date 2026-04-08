import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    loadEnquiries();

    // Listen for storage changes from other tabs (real-time updates)
    const handleStorageChange = (e) => {
      if (e.key === 'enquiries') {
        loadEnquiries();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadEnquiries = () => {
    const data = JSON.parse(localStorage.getItem('enquiries') || '[]');
    // Sort by latest date
    setEnquiries(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e);
    setEnquiries(updated);
    localStorage.setItem('enquiries', JSON.stringify(updated));
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDeleteEnquiry = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this enquiry?")) {
      const updated = enquiries.filter(e => e.id !== id);
      setEnquiries(updated);
      localStorage.setItem('enquiries', JSON.stringify(updated));
      setSelectedEnquiry(null); // Close modal
    }
  };

  const handleClearAll = () => {
    if (window.confirm("WARNING: Are you sure you want to permanently delete ALL enquiries? This action cannot be undone.")) {
      setEnquiries([]);
      localStorage.removeItem('enquiries');
    }
  };

  // Metrics
  const totalEnquiries = enquiries.length;
  const newToday = enquiries.filter(e => {
    const date = new Date(e.date);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }).length;
  const pendingFollowUp = enquiries.filter(e => e.status === 'New' || e.status === 'In Review').length;
  const resolvedCount = enquiries.filter(e => e.status === 'Resolved').length;

  // Filtering
  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === 'All' || e.service === filterService;
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    return matchesSearch && matchesService && matchesStatus;
  });

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="logo-box">BH</div>
          <div className="logo-text">
            <strong>Admin Panel</strong>
          </div>
        </div>
        <nav className="admin-nav">
          <a href="#" className={activeTab === 'dashboard' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>📊 Dashboard</a>
          <a href="#" className={activeTab === 'enquiries' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('enquiries'); }}>📩 Enquiries</a>
          <a href="#" className={activeTab === 'settings' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}>⚙️ Settings</a>
          <div className="admin-nav-spacer" style={{ flex: 1 }}></div>
          <a href="/" className="admin-back-link">← Back to Site</a>
          <a href="#" onClick={handleLogout} className="admin-back-link" style={{ borderTop: 'none', color: '#d32f2f' }}>🚪 Secure Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'enquiries' && 'Enquiries Management'}
            {activeTab === 'settings' && 'System Settings'}
          </h2>
        </header>

        {/* Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <>
            <div className="admin-metrics">
              <div className="metric-card">
                <div className="metric-icon">📥</div>
                <div className="metric-info">
                  <span>Total Enquiries</span>
                  <h3>{totalEnquiries}</h3>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">⭐</div>
                <div className="metric-info">
                  <span>New Today</span>
                  <h3>{newToday}</h3>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">⏳</div>
                <div className="metric-info">
                  <span>Pending</span>
                  <h3>{pendingFollowUp}</h3>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">✅</div>
                <div className="metric-info">
                  <span>Resolved</span>
                  <h3>{resolvedCount}</h3>
                </div>
              </div>
            </div>

            <div className="admin-content-box">
              <div className="admin-tools">
                <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem', fontFamily: 'Playfair Display, serif' }}>Recent Enquiries</h3>
                <button className="btn-view" onClick={() => setActiveTab('enquiries')}>View All →</button>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.slice(0, 5).length === 0 ? (
                      <tr>
                        <td colSpan="5" className="table-empty">No tracking data found.</td>
                      </tr>
                    ) : (
                      enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id}>
                          <td>{new Date(enq.date).toLocaleDateString()}</td>
                          <td><strong>{enq.name}</strong></td>
                          <td>{enq.service}</td>
                          <td>
                            <span className={`status-badge status-${enq.status.replace(' ', '').toLowerCase()}`}>
                              {enq.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn-view" onClick={() => setSelectedEnquiry(enq)}>View Details</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Enquiries Tab Content */}
        {activeTab === 'enquiries' && (
          <div className="admin-content-box">
            <div className="admin-tools">
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search"
              />
              <div className="admin-filters">
                <select value={filterService} onChange={(e) => setFilterService(e.target.value)}>
                  <option value="All">All Services</option>
                  <option value="Engineering Solutions">Engineering Solutions</option>
                  <option value="Strategic Consulting">Strategic Consulting</option>
                  <option value="Educational Services">Educational Services</option>
                  <option value="Event Support">Event Support</option>
                  <option value="Other">Other</option>
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email / Phone</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="table-empty">No enquiries found.</td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((enq) => (
                      <tr key={enq.id}>
                        <td>{new Date(enq.date).toLocaleDateString()}</td>
                        <td>
                          <strong>{enq.name}</strong>
                          {enq.company && <span className="admin-company">{enq.company}</span>}
                        </td>
                        <td>
                          <div>{enq.email}</div>
                          <div className="admin-phone">📞 {enq.phone}</div>
                        </td>
                        <td>{enq.service}</td>
                        <td>
                          <span className={`status-badge status-${enq.status.replace(' ', '').toLowerCase()}`}>
                            {enq.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-view" onClick={() => setSelectedEnquiry(enq)}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab Content */}
        {activeTab === 'settings' && (
          <div className="admin-settings-layout">
            <div className="settings-card">
              <div className="settings-header">
                <h3>Database Management</h3>
                <p>Manage your backend data records. Use caution, as these actions are permanent.</p>
              </div>
              <div className="settings-actions">
                <div className="setting-row">
                  <div className="setting-info">
                    <h4>Clear Enquiry Logs</h4>
                    <p>Permanently delete all submitted enquiries from the local database.</p>
                  </div>
                  <button className="btn-delete" onClick={handleClearAll}>Delete All Data</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Inner Modal for View Details */}
      {selectedEnquiry && (
        <div className="admin-modal-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={() => setSelectedEnquiry(null)}>✕</button>
            <div className="admin-modal-header">
              <h2>Enquiry Details</h2>
              <span className={`status-badge status-${selectedEnquiry.status.replace(' ', '').toLowerCase()}`}>
                {selectedEnquiry.status}
              </span>
            </div>
            
            <div className="admin-modal-body">
              <div className="detail-group">
                <label>Date Submitted</label>
                <p>{new Date(selectedEnquiry.date).toLocaleString()}</p>
              </div>
              <div className="detail-row">
                <div className="detail-group">
                  <label>Full Name</label>
                  <p>{selectedEnquiry.name}</p>
                </div>
                <div className="detail-group">
                  <label>Company</label>
                  <p>{selectedEnquiry.company || 'N/A'}</p>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-group">
                  <label>Email Address</label>
                  <p><a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a></p>
                </div>
                <div className="detail-group">
                  <label>Phone Number</label>
                  <p><a href={`tel:${selectedEnquiry.phone}`}>{selectedEnquiry.phone}</a></p>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-group">
                  <label>Service Requested</label>
                  <p>{selectedEnquiry.service}</p>
                </div>
                <div className="detail-group">
                  <label>Preferred Contact</label>
                  <p>{selectedEnquiry.contactMethod}</p>
                </div>
              </div>
              <div className="detail-group">
                <label>Message</label>
                <div className="detail-message">{selectedEnquiry.message}</div>
              </div>
              
              <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eaeaea' }}>
                <div>
                  <label style={{ fontWeight: 700, display: 'block', marginBottom: '0.75rem', color: '#c9a84c', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Update Status:</label>
                  <div className="status-buttons">
                    <button 
                      className={`btn-status ${selectedEnquiry.status === 'New' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'New')}
                    >
                      New
                    </button>
                    <button 
                      className={`btn-status ${selectedEnquiry.status === 'In Review' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'In Review')}
                    >
                      In Review
                    </button>
                    <button 
                      className={`btn-status ${selectedEnquiry.status === 'Resolved' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'Resolved')}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
                
                {/* Delete Button Container */}
                <div>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                  >
                    🗑️ Delete Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
