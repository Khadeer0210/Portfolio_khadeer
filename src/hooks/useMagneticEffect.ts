import { useRef, useEffect } from 'react';

export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const maxDistance = 100;

      if (distance < maxDistance) {
        const pull = (1 - distance / maxDistance) * strength;
        element.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
        element.style.transition = 'transform 0.2s ease-out';
      } else {
        element.style.transform = 'translate(0px, 0px)';
        element.style.transition = 'transform 0.4s ease-out';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
      element.style.transition = 'transform 0.4s ease-out';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

export default useMagneticEffect;
