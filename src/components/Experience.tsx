import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Team Leader",
    org: "SIH - Smart India Hackathon 2025",
    description: "Led a highly motivated team to develop innovative solutions for real-world challenges, demonstrating leadership and technical expertise in a competitive environment."
  },
  {
    role: "Team Lead (1st Prize)",
    org: "PROTOBLITZ Hackathon",
    description: "Spearheaded a project solving a critical agriculture-based real-world problem. Architected the solution, guided development, and successfully secured the 1st prize."
  },
  {
    role: "Event Organizer",
    org: "College Tech Fest",
    description: "Orchestrated successful events, learning practical teamwork dynamics and project management skills while ensuring flawless execution and engagement."
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="min-h-screen py-32 relative z-10 px-6 md:px-24 w-full flex flex-col justify-center">
      
      <div className="flex items-center gap-4 mb-24 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase neon-text">Service Record</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-white/50 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative">
        {/* Timeline line */}
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/50 via-white/20 to-transparent md:-translate-x-1/2" />

        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative flex items-center justify-between md:justify-normal w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full border-2 border-black bg-white -translate-x-1/2 shadow-[0_0_10px_white]" />

              <div className="w-full md:w-5/12 pl-16 md:pl-0">
                <div className="hud-border bg-black/50 p-6 md:p-8 relative group hover:bg-white/5 transition-colors duration-300">
                  <div className="absolute top-0 right-0 p-2 text-[10px] text-white/30 font-mono">ID: {(idx + 1).toString().padStart(3, '0')}</div>
                  
                  <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-2 tracking-wide group-hover:neon-text-subtle transition-all">
                    {exp.role}
                  </h3>
                  <h4 className="text-sm font-mono text-white/60 mb-4 border-l-2 border-white/30 pl-3 uppercase">
                    {exp.org}
                  </h4>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
