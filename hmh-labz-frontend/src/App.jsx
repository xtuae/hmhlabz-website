import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Legal from './pages/Legal';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import FitCallModal from './components/ui/FitCallModal';
import api from './api/client';

// Modal Context for global access
const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

// Brand Context for global branding
const BrandContext = createContext();
export const useBrand = () => useContext(BrandContext);

function App() {
  const [isFitCallOpen, setIsFitCallOpen] = useState(false);
  const [brand, setBrand] = useState({
    logoUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png',
    faviconUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp'
  });

  useEffect(() => {
    api.get('/settings/brand')
      .then(res => {
        if (res.data) {
          setBrand({
            logoUrl: res.data.logoUrl || 'https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png',
            faviconUrl: res.data.faviconUrl || 'https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp'
          });
          if (res.data.faviconUrl) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
              link = document.createElement('link');
              link.rel = 'icon';
              document.head.appendChild(link);
            }
            link.href = res.data.faviconUrl;
          }
        }
      })
      .catch(err => console.error('Failed to fetch brand assets:', err));
  }, []);

  // Expose global trigger for legacy/scripted access if needed
  useEffect(() => {
    window.openFitCall = () => setIsFitCallOpen(true);
    return () => { delete window.openFitCall; };
  }, []);

  const openFitCall = () => setIsFitCallOpen(true);
  const closeFitCall = () => setIsFitCallOpen(false);

  return (
    <HelmetProvider>
      <BrandContext.Provider value={brand}>
        <ModalContext.Provider value={{ openFitCall, closeFitCall }}>
          <Router basename={import.meta.env.VITE_BASE_PATH || '/'}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/legal/:slug" element={<Legal />} />
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
      </BrandContext.Provider>
    </HelmetProvider>
  );
}

export default App;
