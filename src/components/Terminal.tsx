import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  input: string;
  output: string[];
  isError?: boolean;
}

const COMMANDS: Record<string, { output: string[]; description: string }> = {
  help: {
    description: 'Show available commands',
    output: [
      'AVAILABLE COMMANDS:',
      '  about     - Display core identity data',
      '  skills    - List technical capabilities',
      '  projects  - View project archives',
      '  contact   - Show communication protocols',
      '  clear     - Clear terminal buffer',
      '  whoami    - Display user info',
      '  date      - Show current system time',
      '  matrix    - Enter the matrix...',
      '  exit      - Close terminal session'
    ]
  },
  about: {
    description: 'Core identity information',
    output: [
      'IDENTITY: SHAIK KHADEER AHMED',
      'CLASSIFICATION: AI ENGINEER // WEB DEVELOPER // UI/UX DESIGNER',
      'STATUS: OPERATIONAL',
      'CLEARANCE: UNRESTRICTED',
      '',
      'A versatile technologist blending AI with diverse platforms to',
      'engineer unprecedented solutions. Driven by metacognitive',
      'problem-solving and an insatiable curiosity.'
    ]
  },
  skills: {
    description: 'Technical capabilities',
    output: [
      'CAPABILITY MATRIX:',
      '',
      'LANGUAGES:    JavaScript ████████████ 95%',
      '              Python     ██████████░░ 85%',
      '              C++        ████████░░░░ 70%',
      '              Java       ███████░░░░░ 65%',
      '',
      'FRAMEWORKS:   React      ████████████ 95%',
      '              Next.js    ███████████░ 90%',
      '              Three.js   █████████░░░ 80%',
      '              Node.js    █████████░░░ 80%',
      '',
      'SPECIALIZATIONS:',
      '  • Neural Interface Design',
      '  • 3D Web Experiences',
      '  • AI/ML Integration',
      '  • Creative Coding'
    ]
  },
  projects: {
    description: 'Project archives',
    output: [
      'PROJECT ARCHIVES:',
      '',
      '[SYNCHROLUX] - Atmospheric UI // Neural Interface',
      '  https://synchrolux-240.vercel.app/',
      '',
      '[QRAFT QR] - Minimalist Utility // Instant Generation',
      '  https://qraft-ten.vercel.app/',
      '',
      '[COSMIC TOOLS] - Celestial Productivity Suite',
      '  https://cosmic-tools.vercel.app/',
      '',
      'Use "open [project]" to launch in new tab (e.g., "open synchrolux")'
    ]
  },
  contact: {
    description: 'Communication protocols',
    output: [
      'COMMUNICATION PROTOCOLS:',
      '',
      'EMAIL:    khadeersk180@gmail.com',
      'GITHUB:   github.com/Khadeer0210',
      'LINKEDIN: linkedin.com/in/shaik-khadeer-ahmed-749bb2320',
      '',
      'STATUS:   UPLINK ESTABLISHED',
      'AWAITING: COLLABORATION INQUIRIES'
    ]
  },
  whoami: {
    description: 'Current user',
    output: ['guest@khadeer-ahmed-portfolio:~$ visitor (UNAUTHORIZED)']
  },
  date: {
    description: 'System time',
    output: [new Date().toString()]
  },
  matrix: {
    description: 'Enter the matrix',
    output: [
      'Wake up, Neo...',
      'The Matrix has you...',
      'Follow the white rabbit.',
      '',
      'Knock, knock, Neo.'
    ]
  },
  clear: {
    description: 'Clear terminal',
    output: []
  },
  exit: {
    description: 'Close terminal',
    output: ['Closing terminal session...', 'SESSION TERMINATED']
  }
};

export const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([
    { input: '', output: [
      'KHADEER AHMED OS v2.0 - TERMINAL ACCESS',
      'Type "help" for available commands',
      ''
    ]}
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([{ input: '', output: ['Terminal cleared.'] }]);
      return;
    }

    if (trimmed === 'exit') {
      setHistory(prev => [...prev, { input: cmd, output: COMMANDS.exit.output }]);
      setTimeout(() => setIsOpen(false), 800);
      return;
    }

    if (trimmed.startsWith('open ')) {
      const project = trimmed.replace('open ', '');
      const urls: Record<string, string> = {
        synchrolux: 'https://synchrolux-240.vercel.app/',
        qraft: 'https://qraft-ten.vercel.app/',
        cosmic: 'https://cosmic-tools.vercel.app/'
      };
      
      if (urls[project]) {
        window.open(urls[project], '_blank');
        setHistory(prev => [...prev, { 
          input: cmd, 
          output: [`Launching ${project}...`, 'System opened in new tab.'] 
        }]);
      } else {
        setHistory(prev => [...prev, { 
          input: cmd, 
          output: [`Project "${project}" not found.`, 'Available: synchrolux, qraft, cosmic'], 
          isError: true 
        }]);
      }
      return;
    }

    if (trimmed === '') {
      setHistory(prev => [...prev, { input: '', output: [] }]);
      return;
    }

    const command = COMMANDS[trimmed];
    if (command) {
      setHistory(prev => [...prev, { input: cmd, output: command.output }]);
    } else {
      setHistory(prev => [...prev, { 
        input: cmd, 
        output: [`Command not found: ${cmd}`, 'Type "help" for available commands.'], 
        isError: true 
      }]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-3xl bg-black border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
              </div>
              <span className="text-xs font-mono text-white/50 tracking-widest">TERMINAL // ROOT ACCESS</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white font-mono text-xs"
              >
                [ESC] CLOSE
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="h-96 overflow-y-auto p-4 font-mono text-sm bg-black"
            >
              {history.map((cmd, idx) => (
                <div key={idx} className="mb-2">
                  {cmd.input && (
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-white/40">guest@khadeer:~$</span>
                      <span>{cmd.input}</span>
                    </div>
                  )}
                  {cmd.output.map((line, lineIdx) => (
                    <div 
                      key={lineIdx} 
                      className={`${cmd.isError ? 'text-red-400' : 'text-white/70'} ${line.startsWith('[') ? 'text-cyan-400' : ''} ${line.includes('://') ? 'text-green-400' : ''}`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-white/40">guest@khadeer:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white/90 font-mono"
                  autoComplete="off"
                  autoFocus
                />
              </form>
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2 bg-white/5 border-t border-white/20 text-[10px] font-mono text-white/30 flex justify-between">
              <span>BASH 5.1.16</span>
              <span>UTF-8</span>
              <span>PRESS ~ TO TOGGLE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
