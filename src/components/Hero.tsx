import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { RevealText } from './RevealText';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    let cursorInterval: ReturnType<typeof setInterval>;
    
    const startTyping = () => {
      let i = 0;
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, 40);
    };
    
    if (delay > 0) {
      timeout = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }
    
    // Cursor blink
    cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, delay]);

  return (
    <span className="inline-flex items-center">
      {displayed}
      <span className={`inline-block w-3 h-5 bg-cyan-400 ml-1 transition-opacity duration-75 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

const MagneticButton = ({ children, href, download, className }: { children: React.ReactNode; href?: string; download?: boolean; className?: string }) => {
  const magnetRef = useMagneticEffect(0.3);
  const Element = href ? 'a' : 'button';
  return (
    <Element
      ref={magnetRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>}
      href={href}
      download={download}
      className={className}
      data-cursor-hover
    >
      {children}
    </Element>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -50]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex flex-col justify-center relative z-10 px-6 md:px-24 w-full overflow-hidden">
      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-4xl"
      >
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="h-[1px] w-12 bg-white/50" />
          <span className="font-mono text-sm tracking-widest text-white/70 uppercase">System Initialized</span>
        </motion.div>

        <motion.div style={{ y: titleY }}>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 neon-text glitch-hover" data-text="SHAIK KHADEER">
            <RevealText text="SHAIK KHADEER" /> <br />
            <span className="text-white/80"><RevealText text="AHMED" delay={0.3} /></span>
          </h1>
        </motion.div>

        <div className="text-base md:text-xl lg:text-2xl font-mono text-cyan-400 mb-8 min-h-[2rem]">
          <span className="text-white/60 mr-2">&gt;</span>
          <Typewriter text="AI ENGINEER // WEB DEVELOPER // UI/UX DESIGNER // MULTIDISCIPLINARY CREATOR" delay={800} />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-white/60 max-w-2xl leading-relaxed text-sm md:text-base border-l-2 border-white/20 pl-6 py-2 backdrop-blur-sm bg-black/20"
        >
          A versatile technologist blending AI with diverse platforms to engineer unprecedented solutions. Driven by metacognitive problem-solving and an insatiable curiosity.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 2.5, duration: 0.8 }}
           style={{ y: ctaY }}
           className="mt-12 flex gap-6"
        >
          <MagneticButton 
            href="/resume.pdf" 
            download 
            className="hud-border px-8 py-3 font-mono text-sm uppercase tracking-widest hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-colors duration-300 relative group overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 font-bold flex items-center gap-2 pointer-events-none">
              <Download className="w-4 h-4" />
              Hire Me
            </span>
            <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out pointer-events-none" />
          </MagneticButton>
          <MagneticButton href="#projects" className="px-8 py-3 font-mono text-sm uppercase tracking-widest border border-white/20 hover:border-white transition-colors duration-300">
            <span className="pointer-events-none">View Archives</span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};
