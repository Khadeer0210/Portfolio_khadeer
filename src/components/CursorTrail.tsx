import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
  char: string;
}

const TRAIL_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const MAX_POINTS = 20;
const FADE_SPEED = 0.02;

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Calculate distance moved
      const dx = mouseRef.current.x - lastMouseRef.current.x;
      const dy = mouseRef.current.y - lastMouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Add new points based on movement
      if (dist > 10) {
        const steps = Math.floor(dist / 10);
        for (let i = 0; i < steps; i++) {
          if (pointsRef.current.length < MAX_POINTS) {
            const t = i / steps;
            pointsRef.current.push({
              x: lastMouseRef.current.x + dx * t,
              y: lastMouseRef.current.y + dy * t,
              age: 1,
              vx: (Math.random() - 0.5) * 0.5,
              vy: -Math.random() * 1 - 0.5,
              char: TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)]
            });
          }
        }
        lastMouseRef.current = { ...mouseRef.current };
      }
    };

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Update and draw points
      pointsRef.current = pointsRef.current.filter(point => {
        point.age -= FADE_SPEED;
        point.x += point.vx;
        point.y += point.vy;
        
        if (point.age <= 0) return false;
        
        // Draw character
        ctx.font = '14px monospace';
        ctx.fillStyle = `rgba(0, 255, 255, ${point.age * 0.6})`;
        ctx.fillText(point.char, point.x, point.y);
        
        // Draw glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(0, 255, 255, ${point.age * 0.8})`;
        ctx.fillText(point.char, point.x, point.y);
        ctx.shadowBlur = 0;
        
        return true;
      });

      // Draw connection lines between nearby points
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      for (let i = 0; i < pointsRef.current.length; i++) {
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const p1 = pointsRef.current[i];
          const p2 = pointsRef.current[j];
          const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          
          if (dist < 50) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
