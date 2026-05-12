import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import DashboardOverview from './pages/DashboardOverview';
import ManageInsights from './pages/ManageInsights';
import ManageUsers from './pages/ManageUsers';

function App() {
  return (
    <Router basename="/labz-admin">
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/insights" element={<ManageInsights />} />
          
          {/* Superadmin Only Routes */}
          <Route path="/users" element={
            <ProtectedRoute roles={['SUPERADMIN']}>
              <ManageUsers />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
