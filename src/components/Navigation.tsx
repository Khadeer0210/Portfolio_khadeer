import { motion } from 'framer-motion';
import { cn } from '../utils';

export const Navigation = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const sections = ['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'];

  return (
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
  );
};
