import React from 'react';
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

const Home = () => {
  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen relative">
      {/* Paper Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMjAiIGhlaWdodD0iMjIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjA4ICAwIDAgMCAwIDAuMDcgIDAgMCAwIDAgMC4wNiAgMCAwIDAgMC4wNCAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] bg-[length:220px_220px]"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <StatsGrid />
        <TechStack />
        <Approach />
        <CostOfWaiting />
        <Services />
        <WhyHMHLabz />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
