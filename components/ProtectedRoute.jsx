import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAdminLoggedIn = sessionStorage.getItem('adminToken') === 'active';

  if (!isAdminLoggedIn) {
    // Redirect them to the login page if not logged in
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
