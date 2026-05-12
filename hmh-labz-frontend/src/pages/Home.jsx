import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import TechStack from '../components/sections/TechStack';
import InsightsSection from '../components/sections/InsightsSection';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="bg-brand-paper selection:bg-brand-terra selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
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
