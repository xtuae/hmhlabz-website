import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Trigger Google Tag Manager Page View
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: location.pathname + location.search,
      });
    }
    // Trigger Meta Pixel Page View
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);
};
