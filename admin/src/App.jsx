import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import ManageInsights from './pages/ManageInsights';

function App() {
  return (
    <Router basename="/labz-admin">
      <Routes>
        {/* Public Route - maybe a simple splash or redirect back */}
        <Route path="/login-required" element={
          <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
            <h1 className="text-2xl font-bold">Admin Access Required</h1>
          </div>
        } />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['SUPERADMIN', 'ADMIN', 'MODERATOR']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/insights" element={<ManageInsights />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
