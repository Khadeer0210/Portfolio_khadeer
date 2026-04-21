import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const BIOS_LINES = [
  { text: 'KHADEER_SYSTEMS BIOS v2.0.26', isOk: false },
  { text: 'Copyright (C) 2026, All Rights Reserved', isOk: false },
  { text: 'Initializing neural interface', isOk: true },
  { text: 'Loading personality matrix', isOk: true },
  { text: 'Establishing visual cortex', isOk: true },
  { text: 'Mounting creative subsystems', isOk: true },
  { text: 'Calibrating sensory inputs', isOk: true },
  { text: 'Verifying security clearance', isOk: true },
  { text: 'All systems nominal.', isOk: false },
];

const PHASE_DURATIONS = {
  void: 300,
  bios: 1500,
  identity: 1000,
  ready: 1200,
  wipe: 600,
};

export const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const [phase, setPhase] = useState<'void' | 'bios' | 'identity' | 'ready' | 'wipe' | 'complete'>('void');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [dots, setDots] = useState<string[]>(Array(BIOS_LINES.length).fill(''));
  const [displayedTitle, setDisplayedTitle] = useState('');

  const runSequence = useCallback(() => {
    // Phase 1: Void
    setTimeout(() => {
      setPhase('bios');
      
      // Animate BIOS lines
      BIOS_LINES.forEach((_, idx) => {
        setTimeout(() => {
          setVisibleLines(prev => prev + 1);
          
          // Animate dots for lines with [OK]
          if (BIOS_LINES[idx].isOk) {
            let dotCount = 0;
            const maxDots = 20;
            const dotInterval = setInterval(() => {
              dotCount++;
              setDots(prev => {
                const newDots = [...prev];
                newDots[idx] = '.'.repeat(dotCount);
                return newDots;
              });
              if (dotCount >= maxDots) {
                clearInterval(dotInterval);
              }
            }, 20);
          }
        }, idx * 120);
      });

      // Phase 3: Identity Flash
      setTimeout(() => {
        setPhase('identity');
        
        // Character by character reveal
        const title = 'KHADEER_AHMED_OS';
        let charIdx = 0;
        const charInterval = setInterval(() => {
          charIdx++;
          setDisplayedTitle(title.slice(0, charIdx));
          if (charIdx >= title.length) {
            clearInterval(charInterval);
          }
        }, 30);

        // Phase 4: System Ready / Wipe
        setTimeout(() => {
          setPhase('ready');
          
          setTimeout(() => {
            setPhase('wipe');
            
            // Phase 5: Cleanup
            setTimeout(() => {
              setPhase('complete');
              sessionStorage.setItem('intro_played', 'true');
              onComplete();
            }, PHASE_DURATIONS.wipe);
          }, 400);
        }, PHASE_DURATIONS.identity);
      }, PHASE_DURATIONS.bios);
    }, PHASE_DURATIONS.void);
  }, [onComplete]);

  useEffect(() => {
    runSequence();
  }, [runSequence]);

  if (phase === 'complete') return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Phase 2: BIOS Text */}
        {(phase === 'bios' || phase === 'identity') && phase !== 'ready' && phase !== 'wipe' && (
          <motion.div
            key="bios"
            className="absolute top-8 left-8 font-mono"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {BIOS_LINES.map((line, idx) => (
              visibleLines > idx && (
                <motion.div
                  key={idx}
                  className="text-[11px] leading-relaxed"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-white/30">
                    {line.text}
                    {line.isOk && (
                      <span className="text-white/30">{dots[idx]}</span>
                    )}
                  </span>
                  {line.isOk && dots[idx].length >= 20 && (
                    <span className="text-cyan-400 ml-2">[OK]</span>
                  )}
                </motion.div>
              )
            ))}
          </motion.div>
        )}

        {/* Phase 3: Identity Flash */}
        {(phase === 'identity' || phase === 'ready') && phase !== 'wipe' && (
          <motion.div
            key="identity"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <h1 
                className="text-4xl md:text-7xl font-black tracking-[0.3em] uppercase text-white"
                style={{
                  textShadow: displayedTitle.length < 'KHADEER_AHMED_OS'.length 
                    ? '0 0 20px rgba(255,255,255,0.8)' 
                    : '0 0 10px rgba(255,255,255,0.3)'
                }}
              >
                {displayedTitle}
              </h1>
            </div>
            <motion.p
              className="mt-4 text-xs font-mono text-white/40 tracking-[0.5em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: displayedTitle.length === 'KHADEER_AHMED_OS'.length ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              v2.0 // CLEARANCE: UNRESTRICTED
            </motion.p>
          </motion.div>
        )}

        {/* Phase 4: Wipe Transition */}
        {phase === 'wipe' && (
          <>
            {/* Expanding line */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[1px] bg-white -translate-x-1/2 -translate-y-1/2"
              initial={{ width: 0 }}
              animate={{ width: '100vw' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            
            {/* Split halves */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ clipPath: 'inset(50% 0 50% 0)' }}
              animate={{ clipPath: 'inset(0% 0 100% 0)' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ clipPath: 'inset(50% 0 50% 0)' }}
              animate={{ clipPath: 'inset(100% 0 0% 0)' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroLoader;
