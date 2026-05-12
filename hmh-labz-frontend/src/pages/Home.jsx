import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import InsightsSection from '../components/sections/InsightsSection';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="bg-brand-cream selection:bg-brand-orange selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <InsightsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
