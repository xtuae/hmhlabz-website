import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTracking } from './hooks/useTracking';
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
import ServiceDetail from './pages/ServiceDetail';
import api from './api/client';
import SEO from './components/seo/SEO';

// Modal Context for global access
const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

// Brand Context for global branding
const BrandContext = createContext();
export const useBrand = () => useContext(BrandContext);

// Dynamic Analytics & Tracking Injector
const Analytics = () => {
  const brand = useBrand();
  useTracking();

  useEffect(() => {
    if (!brand) return;

    // Google Analytics (GA4)
    if (brand.googleAnalyticsId && !document.querySelector(`script[src*="${brand.googleAnalyticsId}"]`)) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${brand.googleAnalyticsId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){window.dataLayer.push(arguments);}
        window.gtag('js', new Date());
        window.gtag('config', '${brand.googleAnalyticsId}');
      `;
      document.head.appendChild(script2);
    }

    // Meta Pixel
    if (brand.metaPixelId && !document.querySelector('script[data-fb-pixel]')) {
      const script = document.createElement('script');
      script.setAttribute('data-fb-pixel', brand.metaPixelId);
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${brand.metaPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }

    // Custom Head Scripts
    if (brand.customScripts && !document.querySelector('script[data-custom-scripts]')) {
      try {
        const container = document.createElement('div');
        container.innerHTML = brand.customScripts;
        Array.from(container.childNodes).forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const clone = document.createElement(node.tagName);
            Array.from(node.attributes).forEach(attr => clone.setAttribute(attr.name, attr.value));
            clone.innerHTML = node.innerHTML;
            clone.setAttribute('data-custom-scripts', 'true');
            document.head.appendChild(clone);
          } else if (node.nodeType === Node.COMMENT_NODE) {
            document.head.appendChild(document.createComment(node.nodeValue));
          }
        });
      } catch (err) {
        console.error('Failed to inject custom scripts:', err);
      }
    }
  }, [brand]);

  return null;
};

function App() {
  const [isFitCallOpen, setIsFitCallOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('General Inquiry');
  const [brand, setBrand] = useState({
    logoUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png',
    faviconUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp',
    googleAnalyticsId: '',
    metaPixelId: '',
    customScripts: ''
  });

  useEffect(() => {
    api.get('/settings/brand')
      .then(res => {
        if (res.data) {
          setBrand({
            logoUrl: res.data.logoUrl || 'https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png',
            faviconUrl: res.data.faviconUrl || 'https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp',
            googleAnalyticsId: res.data.googleAnalyticsId || '',
            metaPixelId: res.data.metaPixelId || '',
            customScripts: res.data.customScripts || ''
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
      .catch(err => console.error('Failed to fetch brand assets & tracking:', err));
  }, []);

  // Expose global trigger for legacy/scripted access if needed
  useEffect(() => {
    window.openFitCall = (tier) => openModal(tier);
    window.openModal = (tier) => openModal(tier);
    return () => {
      delete window.openFitCall;
      delete window.openModal;
    };
  }, []);

  const openModal = (tier) => {
    setSelectedTier(typeof tier === 'string' ? tier : 'General Inquiry');
    setIsFitCallOpen(true);
  };
  const openFitCall = (tier) => openModal(tier);
  const closeFitCall = () => setIsFitCallOpen(false);

  return (
    <BrandContext.Provider value={brand}>
      <ModalContext.Provider value={{ openFitCall, openModal, closeFitCall, selectedTier }}>
        <Router basename="/">
          <Analytics />
          <SEO />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
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
          selectedTier={selectedTier}
        />
      </ModalContext.Provider>
    </BrandContext.Provider>
  );
}

export default App;
