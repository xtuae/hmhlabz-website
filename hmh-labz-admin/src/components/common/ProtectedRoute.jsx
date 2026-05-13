import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ProtectedRoute = ({ children, roles = ['ADMIN', 'SUPERADMIN'] }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    // If user is authenticated but doesn't have the right role, redirect to a default "unauthorized" or back to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
