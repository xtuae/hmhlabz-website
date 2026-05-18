import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import StatsGrid from '../components/home/StatsGrid';
import TechStack from '../components/home/TechStack';
import Approach from '../components/home/Approach';
import CostOfWaiting from '../components/home/CostOfWaiting';
import Services from '../components/home/Services';
import WhyHMHLabz from '../components/home/WhyHMHLabz';
import Contact from '../components/home/Contact';
import SEO from '../components/seo/SEO';
import api from '../api/client';

const Home = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { hash } = useLocation();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await api.get(`/pages/home?t=${Date.now()}`);
        console.log("FULL API RESPONSE:", response.data);
        setPageData(response.data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen relative">
      <SEO 
        title={pageData?.title || 'Strategy + build, in one team.'} 
        description={pageData?.metaDescription || 'We help service businesses scale by building custom AI workflows and operations systems.'} 
      />

      {/* Paper Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMjAiIGhlaWdodD0iMjIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjA4ICAwIDAgMCAwIDAuMDcgIDAgMCAwIDAgMC4wNiAgMCAwIDAgMC4wNCAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] bg-[length:220px_220px]"></div>
      
      <Navbar />
      
      <main>
        <Hero key={pageData?.updatedAt} content={pageData?.content?.hero} />
        <StatsGrid stats={pageData?.content?.hero?.stats} />
        <TechStack />
        
        <section id="approach">
          <Approach content={pageData?.content?.approach} />
        </section>

        <CostOfWaiting content={pageData?.content?.costOfWaiting} />

        <section id="services">
          <Services content={pageData?.content?.howWeWork} />
        </section>

        <WhyHMHLabz content={pageData?.content?.whyHmhLabz} />
        <Contact content={pageData?.content?.cta} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
