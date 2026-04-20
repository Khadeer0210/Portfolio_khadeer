import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Radio, Send, CheckCircle, Loader2 } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/50 group-hover:text-white transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/50 group-hover:text-white transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Using Formspree for email automation
    // Sign up at https://formspree.io and replace with your form ID
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeevljjk';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New message from ${formState.name} - Portfolio Contact`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError('Transmission failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="min-h-screen py-32 relative z-10 px-6 md:px-24 w-full flex flex-col items-center justify-center">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hud-border bg-black/60 p-8 md:p-16 max-w-4xl w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-4 left-4 text-[10px] text-white/30 font-mono flex items-center gap-2">
          <Radio className="w-3 h-3 animate-pulse text-green-400" />
          COMMUNICATION_LINK_ESTABLISHED
        </div>
        
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase neon-text mb-4">Transmit Signal</h2>
          <p className="text-white/60 font-mono text-sm max-w-lg mx-auto uppercase tracking-widest">
            Awaiting input sequence for collaboration, inquiries, or neural link requests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-white/60 uppercase tracking-widest">Contact Protocols</span>
            </div>
            <a href="mailto:khadeersk180@gmail.com" className="flex items-center gap-4 group p-4 border border-white/10 hover:border-white/50 transition-colors bg-white/5">
              <Mail className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase">Email Protocol</div>
                <div className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">khadeersk180@gmail.com</div>
              </div>
            </a>
            <a href="https://github.com/Khadeer0210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 border border-white/10 hover:border-white/50 transition-colors bg-white/5">
              <GithubIcon />
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase">GitHub Repository</div>
                <div className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">Khadeer0210</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/shaik-khadeer-ahmed-749bb2320/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 border border-white/10 hover:border-white/50 transition-colors bg-white/5">
              <LinkedinIcon />
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase">LinkedIn Profile</div>
                <div className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">Shaik Khadeer Ahmed</div>
              </div>
            </a>
          </div>

          <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-xl font-mono font-bold text-white mb-2">Transmission Complete</h3>
                <p className="text-sm font-mono text-white/60">Your signal has been received. Awaiting response.</p>
              </motion.div>
            ) : (
              <>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase mb-2 block">Ident (Name)</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-white/20 p-3 text-sm font-mono text-white focus:outline-none focus:border-white transition-colors" 
                    placeholder="ENTER NAME..." 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase mb-2 block">Return Vector (Email)</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-white/20 p-3 text-sm font-mono text-white focus:outline-none focus:border-white transition-colors" 
                    placeholder="ENTER EMAIL..." 
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] font-mono text-white/40 uppercase mb-2 block">Payload (Message)</label>
                  <textarea 
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full flex-1 bg-black border border-white/20 p-3 text-sm font-mono text-white focus:outline-none focus:border-white transition-colors min-h-[120px] resize-none" 
                    placeholder="ENTER MESSAGE..."
                  ></textarea>
                </div>
                {error && (
                  <div className="text-red-400 text-xs font-mono">{error}</div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full hud-border py-4 font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 relative group overflow-hidden mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 font-bold flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Execute Transmission
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </button>
                <p className="text-[10px] font-mono text-white/30 text-center">
                  Powered by Formspree • No backend required
                </p>
              </>
            )}
          </form>
        </div>
      </motion.div>

      <footer className="absolute bottom-8 text-center w-full flex flex-col items-center">
        <div className="w-[1px] h-12 bg-gradient-to-t from-white/50 to-transparent mb-4" />
        <p className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">
          ENGINEERED TO EXCELLENCE © {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
};
