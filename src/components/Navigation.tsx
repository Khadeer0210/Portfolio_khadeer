import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

export const Navigation = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sections = ['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section.toLowerCase())}
            className={cn(
              "group relative flex items-center justify-end w-full text-right hover:text-white transition-colors duration-300 font-mono text-xs tracking-[0.2em]",
              activeSection === section.toLowerCase() ? "text-white" : "text-white/40"
            )}
          >
            <span className="mr-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {'//'} {section}
            </span>
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className={cn(
                "absolute w-1 h-1 bg-white transition-all duration-300",
                activeSection === section.toLowerCase() ? "scale-150 rotate-45 shadow-[0_0_8px_white]" : "opacity-40"
              )} />
              {activeSection === section.toLowerCase() && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute w-8 h-8 border border-white/50 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </button>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-6 right-6 z-[60] lg:hidden flex flex-col gap-1.5 group"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <motion.div
          className="w-6 h-[2px] bg-white origin-center"
          animate={isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-6 h-[2px] bg-white"
          animate={isMobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="w-6 h-[2px] bg-white origin-center"
          animate={isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sections.map((section, idx) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                onClick={() => {
                  setActiveSection(section.toLowerCase());
                  setIsMobileOpen(false);
                }}
                className="font-mono text-2xl tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors"
              >
                <span className="text-cyan-400/60 mr-3 text-sm">0{idx + 1}</span>
                {section}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
