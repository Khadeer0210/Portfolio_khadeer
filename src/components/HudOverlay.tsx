export const HudOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Film grain noise */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 scanline opacity-20" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Frame corners */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/50" />
      
      {/* Decorative details */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/50 font-mono">
        SYS.REQ.004 // INITIALIZING SECURE PROTOCOL
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/50 font-mono">
        KHADEER_AHMED_OS v2.0
      </div>

      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-2">
        <div className="w-1 h-8 bg-white/20" />
        <div className="w-1 h-4 bg-white/50" />
        <div className="w-1 h-12 bg-white/20" />
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2 items-end">
        <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
        <div className="text-[10px] tracking-widest text-white/50 font-mono rotate-90 origin-right translate-y-8">
          UPLINK ESTABLISHED
        </div>
      </div>
    </div>
  );
};
