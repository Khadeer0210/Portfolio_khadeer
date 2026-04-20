import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: "synchrolux",
    title: "Synchrolux",
    role: "Atmospheric UI // Neural Interface",
    description: "Synchrolux is a high-concept digital experience designed as a 'Neural Interface,' focusing on futuristic data visualization and immersive interaction. It serves as a sophisticated landing page that emphasizes a seamless, high-tech aesthetic to represent advanced connectivity.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Three.js"],
    image: "/images/synchrolux.jpg",
    link: "https://synchrolux-240.vercel.app/"
  },
  {
    id: "qraft",
    title: "Qraft QR",
    role: "Minimalist Utility // Instant Generation",
    description: "Qraft is a streamlined, minimalist utility designed for the instant generation of QR codes. It features a clean, user-centric interface that allows for real-time creation and immediate downloading, avoiding cluttered menus and focusing entirely on speed and reliability.",
    tech: ["Next.js", "Tailwind CSS", "QR Library"],
    image: "/images/qraft.jpg",
    link: "https://qraft-ten.vercel.app/"
  },
  {
    id: "cosmic",
    title: "Cosmic Tools",
    role: "Celestial Productivity Suite",
    description: "An all-in-one productivity suite featuring a diverse range of utilities including a URL compressor, PDF converter, and text extractor. Wraps multiple API-driven functions into a cohesive 'celestial' themed interface, acting as a centralized hub.",
    tech: ["Next.js", "Tailwind CSS", "Lucide React", "Custom Logic"],
    image: "/images/cosmic.jpg",
    link: "https://cosmic-tools.vercel.app/"
  }
];

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="projects" className="min-h-screen py-32 relative z-10 px-6 md:px-24 w-full flex flex-col justify-center">
      
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase neon-text">Project Archives</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-white/50 to-transparent" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="hud-border bg-black/50 cursor-pointer group relative overflow-hidden aspect-[4/3] flex flex-col justify-end p-6 hover:border-white transition-colors"
          >
            <div className="absolute inset-0 z-0">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            
            <div className="relative z-10">
              <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold font-mono text-white mb-2">{project.title}</motion.h3>
              <motion.p layoutId={`role-${project.id}`} className="text-white/60 font-mono text-xs uppercase tracking-widest">{project.role}</motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            {projects.map((project) => 
              project.id === selectedId && (
                <motion.div
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hud-border bg-black w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
                  </div>
                  
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <motion.h3 layoutId={`title-${project.id}`} className="text-3xl font-bold font-mono text-white mb-2">{project.title}</motion.h3>
                        <motion.p layoutId={`role-${project.id}`} className="text-white/60 font-mono text-xs uppercase tracking-widest">{project.role}</motion.p>
                      </div>
                      <button onClick={() => setSelectedId(null)} className="text-white/50 hover:text-white font-mono">
                        [CLOSE]
                      </button>
                    </div>

                    <p className="text-white/80 leading-relaxed text-sm mb-8 border-l-2 border-white/20 pl-4 bg-white/5 py-2">
                      {project.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span key={t} className="px-3 py-1 border border-white/20 text-xs font-mono text-white/80 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hud-border inline-block text-center px-8 py-3 font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                      Launch System
                    </a>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
