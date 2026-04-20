export const HudOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
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
