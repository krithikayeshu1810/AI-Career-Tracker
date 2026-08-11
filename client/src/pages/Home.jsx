import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <Hero />

      <Features />

      <About />

      <Statistics />

      <Testimonials />

      <Contact />

    </div>
  );
}

export default Home;