import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const Marquee = ({ text, speed = 20, direction = 'left', className = '' }: MarqueeProps) => {
  const repeated = Array(10).fill(text).join(' • ');
  
  return (
    <div className={`overflow-hidden whitespace-nowrap py-6 border-y border-white/10 ${className}`}>
      <motion.div
        className="inline-block text-6xl md:text-8xl font-black tracking-tighter text-white/[0.03] uppercase select-none"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {repeated}
      </motion.div>
    </div>
  );
};

export default Marquee;
