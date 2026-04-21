import { useRef, useState } from 'react';

interface TiltStyle {
  transform: string;
  transition: string;
  background?: string;
}

export function useTiltEffect(maxTilt: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<TiltStyle>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.1s ease-out',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Calculate gradient position for spotlight effect
    const gradientX = (x / rect.width) * 100;
    const gradientY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      transition: 'transform 0.1s ease-out',
      background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out',
      background: 'transparent',
    });
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
}

export default useTiltEffect;
