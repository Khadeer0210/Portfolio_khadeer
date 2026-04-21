import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const RevealText = ({ text, className = '', delay = 0 }: RevealTextProps) => {
  const words = text.split(' ');
  
  return (
    <span className={`inline-flex flex-wrap gap-x-3 ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 5 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + wordIdx * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default RevealText;
