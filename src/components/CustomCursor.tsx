import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot - follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'tween', duration: 0 }}
      />
      {/* Outer ring - follows with slight lag */}
      <motion.div
        className="fixed top-0 left-0 border border-white/50 rounded-full z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePos.x - (isHovering ? 24 : 16),
          y: mousePos.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
