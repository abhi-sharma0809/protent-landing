import React, { useEffect, useRef } from 'react';

const ProductDemoVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);
  return (
    <video
      ref={videoRef}
      src="/webdemo.mov"
      playsInline
      muted
      loop
      autoPlay
      preload="auto"
      className="w-full h-full object-cover object-top"
    />
  );
};

type HeroAsciiProps = {
  onScrollTo?: (id: string) => void;
};

const waveHeights = [8, 12, 6, 14, 10, 8, 12, 6];

export default function HeroAscii({ onScrollTo }: HeroAsciiProps) {
  return (
    <section className="relative overflow-hidden bg-black min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex flex-col">
      {/* Stars background — mobile only */}
      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg-hero" />

      {/* Corner frame accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20 pointer-events-none" />
      <div className="absolute bottom-12 left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20 pointer-events-none" />
      <div className="absolute bottom-12 right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="w-full px-8 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch py-12">

          {/* Left: text */}
          <div className="flex flex-col justify-between">
            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-4 opacity-60">
              <div className="w-8 h-px bg-white" />
              <span className="text-white text-[10px] font-mono tracking-wider">001</span>
              <div className="flex-1 h-px bg-white" />
            </div>

            {/* Headline */}
            <div className="relative flex-1 flex flex-col justify-center">
              <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-1 dither-pattern-hero opacity-40" />
              <h1 className="text-4xl lg:text-8xl font-bold text-white leading-none font-mono" style={{ letterSpacing: '0.06em' }}>
                UNDERSTAND
                <span className="block mt-2 lg:mt-4 opacity-90">THE SITUATION</span>
              </h1>
            </div>

            {/* Description */}
            <div className="relative mt-6 mb-6">
              <p className="text-sm lg:text-xl text-gray-300 leading-relaxed font-mono opacity-80">
              Catch escalation in real-time before it becomes a crime.
              </p>
              <div className="hidden lg:block absolute -right-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }} />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#/form"
                className="relative px-6 py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group text-center"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                REQUEST DEMO
              </a>
              <button
                type="button"
                onClick={() => onScrollTo?.('platform')}
                className="px-6 py-2.5 bg-transparent border border-white/40 text-white/70 font-mono text-xs lg:text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-200"
              >
                LEARN MORE
              </button>
            </div>

            {/* Bottom notation */}
            <div className="hidden lg:flex items-center gap-2 mt-7 opacity-40">
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white" />
              <span className="text-white text-[9px] font-mono">PROTENT.AI</span>
            </div>
          </div>

          {/* Right: video */}
          <div className="relative hidden lg:block">
            <div className="relative border border-white/20 overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/60 z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/60 z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/60 z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/60 z-10 pointer-events-none" />
              <ProductDemoVideo />
            </div>
            <div className="flex items-center gap-2 mt-2 opacity-50">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-white text-[9px] font-mono tracking-widest">LIVE FEED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm">
        <div className="w-full px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden lg:flex gap-1 items-end">
              {waveHeights.map((h, i) => (
                <div key={i} className="w-1 bg-white/30" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>

      <style>{`
        .dither-pattern-hero {
          background-image:
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
        .stars-bg-hero {
          background-image:
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          opacity: 0.3;
        }
      `}</style>
    </section>
  );
}
