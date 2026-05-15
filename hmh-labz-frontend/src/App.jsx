import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <Router basename={import.meta.env.VITE_BASE_PATH || '/'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
