import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { Background3D } from './components/Background3D';
import { HudOverlay } from './components/HudOverlay';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Terminal } from './components/Terminal';
import { CursorTrail } from './components/CursorTrail';
import { IntroLoader } from './components/IntroLoader';
import { SectionDivider } from './components/SectionDivider';
import { Marquee } from './components/Marquee';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('intro_played'));
  const { scrollYProgress } = useScroll();

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      let current = '';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white/30 selection:text-white">
      {/* Intro Loader */}
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-white to-cyan-400 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Layer 1: Grid Pattern */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Layer 2: Radial Gradient Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Top-left cyan blob */}
        <div className="absolute -top-[30%] -left-[20%] w-[60vw] h-[60vw] bg-cyan-500/[0.03] rounded-full blur-[150px]" />
        {/* Bottom-right white blob */}
        <div className="absolute -bottom-[20%] -right-[20%] w-[50vw] h-[50vw] bg-white/[0.02] rounded-full blur-[150px]" />
        {/* Center accent */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-cyan-400/[0.015] rounded-full blur-[200px]" />
      </div>

      {/* Layer 3: Particle Background (reduced opacity) */}
      <div className="opacity-40">
        <Background3D />
      </div>

      <HudOverlay />
      <CursorTrail />
      <Terminal />

      <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <Marquee text="AI ENGINEER — WEB DEVELOPER — UI/UX DESIGNER — CREATIVE TECHNOLOGIST" speed={25} />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <Marquee text="SYNCHROLUX — QRAFT — COSMIC TOOLS — IDEATOR" speed={30} direction="right" />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>
    </div>
  );
}

export default App;
