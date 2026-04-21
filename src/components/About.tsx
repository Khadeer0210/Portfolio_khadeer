import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText } from './RevealText';

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={containerRef} id="about" className="min-h-screen flex items-center justify-center relative z-10 px-6 md:px-24 w-full py-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Holographic Portrait Box with clip-path reveal */}
        <motion.div 
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] max-w-sm mx-auto w-full hud-border p-4 bg-black/60 backdrop-blur-md"
        >
          <div className="absolute top-2 left-2 text-[10px] text-white/40 font-mono">FILE: KHADEER_AHMED.DAT</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-white/40 font-mono text-right">STATUS: OPERATIONAL <br/> CLASS: CLASSIFIED</div>
          
          <motion.div 
            className="w-full h-full border border-white/10 relative overflow-hidden group"
            initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}
            whileInView={{ clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
             {/* Simulating scanline over image */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.1)_50%,transparent)] bg-[length:100%_4px] group-hover:animate-[scan_2s_linear_infinite] z-20 pointer-events-none" />
             <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10 pointer-events-none transition-opacity group-hover:opacity-0" />
             <img src="/images/mehh.jpeg" alt="Shaik Khadeer Ahmed" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Data Panels with stagger */}
        <motion.div 
          style={{ y: textY }}
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="hud-border p-6 bg-black/40 backdrop-blur-sm relative"
          >
            <h2 className="text-xl font-bold font-mono text-white mb-4 tracking-widest uppercase flex items-center gap-4 glitch-hover" data-text="Core Identity">
              <span className="w-2 h-2 bg-white" />
              <RevealText text="Core Identity" />
            </h2>
            <p className="text-white/70 leading-relaxed text-sm">
              I am a CS undergraduate exploring the intersections of AI, technology, and human consciousness. 
              I blend disciplines to build unprecedented solutions for real-world problems. A relentless learner 
              focused on the deeper realities of creation while constantly expanding a versatile skillset.
              <br/><br/>
              Jack of all trades, master of integration.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="hud-border p-6 bg-black/40 backdrop-blur-sm relative"
          >
            <h2 className="text-xl font-bold font-mono text-white mb-4 tracking-widest uppercase flex items-center gap-4 glitch-hover" data-text="Behavioral Matrix">
              <span className="w-2 h-2 bg-white" />
              <RevealText text="Behavioral Matrix" />
            </h2>
            <p className="text-white/70 leading-relaxed text-sm">
              A unique blend of deep, professional intensity and lighthearted optimism. 
              I believe in creating memorable experiences rather than just surviving. 
              Drawn to fascinating challenges, I thrive on meaningful conversations and building a life worth living.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
