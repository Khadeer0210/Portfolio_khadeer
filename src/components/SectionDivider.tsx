import { motion } from 'framer-motion';

export const SectionDivider = () => (
  <div className="relative py-12 flex items-center justify-center overflow-hidden">
    <motion.div
      className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ width: 0 }}
      whileInView={{ width: '80%' }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.div
      className="absolute w-2 h-2 bg-white/50 rotate-45"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
    />
  </div>
);

export default SectionDivider;
