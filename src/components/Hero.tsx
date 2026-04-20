import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (delay > 0) {
      timeout = setTimeout(() => {
        startTyping();
      }, delay);
    } else {
      startTyping();
    }
    
    function startTyping() {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayed}<span className="animate-pulse">_</span></span>;
};

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative z-10 px-6 md:px-24 w-full">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] w-12 bg-white/50" />
          <span className="font-mono text-sm tracking-widest text-white/70 uppercase">System Initialized</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 neon-text">
          SHAIK KHADEER <br />
          <span className="text-white/80">AHMED</span>
        </h1>

        <div className="text-lg md:text-2xl font-mono text-white/80 h-16 mb-8">
          <Typewriter text="> AI ENGINEER // WEB DEVELOPER // UI/UX DESIGNER // MULTIDISCIPLINARY CREATOR" delay={1000} />
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
           className="mt-12 flex gap-6"
        >
          <button className="hud-border px-8 py-3 font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 relative group overflow-hidden">
            <span className="relative z-10 font-bold">Initiate Contact</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </button>
          <a href="#projects" className="px-8 py-3 font-mono text-sm uppercase tracking-widest border border-white/20 hover:border-white transition-colors duration-300">
            View Archives
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
