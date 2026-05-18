import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import DashboardOverview from './pages/DashboardOverview';
import ManageInsights from './pages/ManageInsights';
import ManageUsers from './pages/ManageUsers';
import ManageContent from './pages/ManageContent';
import InsightForm from './pages/InsightForm';
import Pages from './pages/Pages';
import HubSpotSync from './pages/HubSpotSync';
import Settings from './pages/Settings';
import ManageAbout from './pages/ManageAbout';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          {/* Default and Dashboard fallbacks */}
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          
          {/* Module Routes */}
          <Route path="insights" element={<ManageInsights />} />
          <Route path="insights/new" element={<InsightForm />} />
          <Route path="insights/edit/:id" element={<InsightForm />} />
          <Route path="content" element={<ManageContent />} />
          <Route path="pages" element={<Pages />} />
          <Route path="about" element={<ManageAbout />} />
          <Route path="sync" element={<HubSpotSync />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Superadmin Only Routes */}
          <Route path="users" element={
            <ProtectedRoute roles={['SUPERADMIN']}>
              <ManageUsers />
            </ProtectedRoute>
          } />
        </Route>

        {/* Global Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
