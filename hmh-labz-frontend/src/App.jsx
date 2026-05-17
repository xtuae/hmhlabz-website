import React, { createContext, useState, useContext, useEffect } from 'react';
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
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import FitCallModal from './components/ui/FitCallModal';

// Modal Context for global access
const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

function App() {
  const [isFitCallOpen, setIsFitCallOpen] = useState(false);

  // Expose global trigger for legacy/scripted access if needed
  useEffect(() => {
    window.openFitCall = () => setIsFitCallOpen(true);
    return () => { delete window.openFitCall; };
  }, []);

  const openFitCall = () => setIsFitCallOpen(true);
  const closeFitCall = () => setIsFitCallOpen(false);

  return (
    <HelmetProvider>
      <ModalContext.Provider value={{ openFitCall, closeFitCall }}>
        <Router basename={import.meta.env.VITE_BASE_PATH || '/'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        
        <FitCallModal 
          isOpen={isFitCallOpen} 
          onClose={closeFitCall} 
        />
      </ModalContext.Provider>
    </HelmetProvider>
  );
}

export default App;
