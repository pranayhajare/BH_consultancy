import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import About from './components/About';
import Businesses from './components/Businesses';
import Services from './components/Services';
import Team from './components/Team';
import CoE from './components/CoE';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import SplashScreen from './components/SplashScreen';
import './App.css';

function AppInner() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Show splash on initial load/reload (but skip on admin routes)
  const [showSplash, setShowSplash] = useState(!isAdminRoute);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Routes>
        {/* Admin Routes (Standalone, No Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* The Home route renders the entire unified page */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        
        {/* Standalone Section Routes */}
        <Route path="/about" element={<MainLayout><main className="standalone-page"><About /></main></MainLayout>} />
        <Route path="/businesses" element={<MainLayout><main className="standalone-page"><Businesses /></main></MainLayout>} />
        <Route path="/services" element={<MainLayout><main className="standalone-page"><Services /></main></MainLayout>} />
        <Route path="/team" element={<MainLayout><main className="standalone-page"><Team /></main></MainLayout>} />
        <Route path="/coe" element={<MainLayout><main className="standalone-page"><CoE /></main></MainLayout>} />
        <Route path="/contact" element={<MainLayout><main className="standalone-page"><Footer /></main></MainLayout>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
