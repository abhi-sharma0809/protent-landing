import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  motion, 
  AnimatePresence,
  useInView,
  animate
} from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Target, 
  CheckCircle, 
  ChevronRight, 
  Mic, 
  Activity, 
  User, 
  AlertTriangle,
  Mail,
  Linkedin,
  Lock,
  Search,
  Camera,
  MessageSquare,
  Clock,
  Wifi,
  EyeOff,
  Signal
} from 'lucide-react';

/**
 * Auto-playing Video Component
 * Plays video automatically on loop
 */
const ScrollControlledVideo = ({ 
  src, 
  containerRef, 
  className = "",
  duration = 8 
}: { 
  src: string; 
  containerRef: React.RefObject<HTMLElement>; 
  className?: string;
  duration?: number;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay may fail, but that's okay
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      playsInline
      muted
      loop
      autoPlay
      preload="auto"
      style={{
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'auto'
      }}
    />
  );
};

/**
 * Suspect Matching Demo
 * Incorporates the specific screenshot scenario: highlighting the girl in the striped sweater on the left.
 */
const SuspectMatchingDemo = ({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const searchQuery = "Missing Person: female child in red and pink striped sweater";
  const [visibleLength, setVisibleLength] = useState(0);

  // Type character by character so text fills first line then wraps to second
  useEffect(() => {
    if (!isInView) {
      setVisibleLength(0);
      return;
    }
    const controls = animate(0, searchQuery.length, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (value) => setVisibleLength(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, searchQuery.length]);

  return (
    <div ref={ref} className="w-full bg-black border border-white/10 overflow-hidden font-mono text-white/80 crosshair-corners relative">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2 min-w-0">
          <Search size={14} className="text-white/60 shrink-0" />
          <div className="flex-1 min-w-0 bg-black border border-white/10 px-3 py-2 overflow-hidden">
            <span className="text-[10px] text-white/90 font-mono tracking-widest whitespace-normal md:whitespace-nowrap break-words inline">
              {searchQuery.slice(0, visibleLength)}
              {visibleLength > 0 && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-[2px] h-3 bg-white align-middle ml-0.5"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[8px] text-white/50 font-mono tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
            Active Surveillance Scan
          </span>
          <span className="flex items-center gap-1.5"><EyeOff size={10} /> Live-Only Processing</span>
        </div>
      </div>
      
      <div ref={ref} className="relative aspect-video bg-black overflow-hidden border-t border-white/10">
        <ScrollControlledVideo
          src="/suspect-match.mp4"
          containerRef={containerRef}
          className="absolute inset-0 w-full h-full object-cover"
          duration={6}
        />

        <div className="absolute top-4 right-6 text-right text-[7px] text-white/50 font-mono tracking-widest leading-relaxed z-10 pointer-events-none">
          2025-11-22 19:39:21 -0500<br />
          AXON BODY 4 D01AC028G
        </div>

        <div className="absolute top-4 left-6 z-20 flex flex-col gap-2">
          <div className="bg-red-600 px-2 py-0.5 text-[8px] font-black text-white flex items-center gap-1.5 animate-pulse border border-white/10">
             <div className="w-1 h-1 bg-white" /> LIVE DEPLOYMENT
          </div>
          <div className="bg-black border border-white/10 px-2 py-0.5 text-[8px] font-mono tracking-widest text-white/80">
             FEED: STN_WEST_22
          </div>
        </div>

        {/* Telemetry Bar */}
        {/* <div className="absolute bottom-0 w-full h-10 bg-black/80 backdrop-blur-xl border-t border-white/5 flex items-center px-4 justify-between text-[9px] z-20">
           <div className="flex gap-4 items-center">
              <span className="opacity-40 uppercase font-black tracking-widest flex items-center gap-1.5">
                <Signal size={10} className="text-green-500" /> Active Frame Scan
              </span>
              <span className="text-blue-400/80 font-bold">Latency: 4ms</span>
           </div>
           <div className="text-[8px] font-black uppercase italic tracking-widest text-blue-400">
              {isInView ? "Descriptor Lock Acquired" : "Processing real-time stream..."}
           </div>
        </div> */}
      </div>
      
      <div className="p-3 border-t border-white/10 text-[7px] text-white/40 text-center font-mono tracking-widest uppercase">
        {/* Natural language search operates solely on live streams. No archival data is indexed or preserved for matching. */}
      </div>
    </div>
  );
};

/**
 * Auto-playing video component for grid streams
 */
const AutoPlayVideo = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay may fail, but that's okay
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      playsInline
      muted
      loop
      autoPlay
    />
  );
};

/**
 * Animated Cursor Component
 */
const AnimatedCursor = ({ 
  targetPosition, 
  onComplete 
}: { 
  targetPosition: { x: number; y: number } | null;
  onComplete: () => void;
}) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!targetPosition) return;

    // Move cursor to target position
    const moveTimeout = setTimeout(() => {
      setPosition(targetPosition);
    }, 500);

    // Click animation
    const clickTimeout = setTimeout(() => {
      setIsClicking(true);
      setTimeout(() => {
        setIsClicking(false);
        setTimeout(() => {
          onComplete();
        }, 300);
      }, 200);
    }, 1500);

    return () => {
      clearTimeout(moveTimeout);
      clearTimeout(clickTimeout);
    };
  }, [targetPosition, onComplete]);

  if (!position) return null;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {/* Crosshair motif */}
      <motion.div
        className="relative w-5 h-5 border border-white bg-transparent"
        animate={{ scale: isClicking ? 0.9 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white" />
      </motion.div>
    </motion.div>
  );
};

const ProtentDashboard = ({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) => {
  const [escalationScore, setEscalationScore] = useState(64);

  const PHRASE_POOL = [
    '"Stay back"',
    '"Watch your hands"',
    '"You can not touch me"',
    '"Don’t touch me"',
    '"Back off"',
    '"Get away from me"',
  ];

  const getRandomUniquePhrases = (pool: string[], count: number) => {
    return [...pool]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  const [phrases, setPhrases] = useState(() =>
    getRandomUniquePhrases(PHRASE_POOL, 3)
  );

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhrases(getRandomUniquePhrases(PHRASE_POOL, 3));
    }, 4500);

    return () => clearInterval(phraseInterval);
  }, []);


  const getScoreColor = (score: number) => {
    if (score < 40) return '#4ade80'; // Green
    if (score < 75) return '#fbbf24'; // Amber
    return '#ef4444'; // Red
  };

  // Add state variables
  const [selectedStream, setSelectedStream] = useState<number | null>(null);
  const [escalatingStreamIndex, setEscalatingStreamIndex] = useState<number | null>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorTarget, setCursorTarget] = useState<{ x: number; y: number } | null>(null);
  const streamRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Streams configuration - escalating stream is at index 5 (6th stream)
  const streams = [
    { src: "/video_1.mp4", isEscalating: false },
    { src: "/video_2.mp4", isEscalating: false },
    { src: "/video_3.mp4", isEscalating: false },
    { src: "/video_4.mp4", isEscalating: false },
    { src: "/video_5.mp4", isEscalating: false },
    { src: "/escalating-situation.mp4", isEscalating: true },
    { src: "/video_6.mp4", isEscalating: false },
    { src: "/video_7.mp4", isEscalating: false },
    { src: "/video_8.mp4", isEscalating: false },
  ];

  // Check if dashboard section is in view
  const isInView = useInView(containerRef, { once: false, amount: 0.3, margin: "-100px" });

  // Auto-detect escalating stream after delay - only when scrolled into view
  useEffect(() => {
    if (!isInView) return; // Don't start animation until section is in view

    const timer = setTimeout(() => {
      setEscalatingStreamIndex(5); // Stream at index 5 (6th stream) is escalating
      
      // After highlighting, show cursor and click
      setTimeout(() => {
        const streamElement = streamRefs.current[5];
        if (streamElement) {
          const rect = streamElement.getBoundingClientRect();
          setCursorTarget({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
          setShowCursor(true);
        }
      }, 2000);
    }, 3000); // Wait 3 seconds before detecting escalation

    return () => clearTimeout(timer);
  }, [isInView]);

  const handleStreamClick = (index: number) => {
    // Only allow clicking on the escalating stream (index 5)
    if (index === 5) {
      setSelectedStream(index);
    }
  };

  const handleCursorComplete = () => {
    setSelectedStream(5); // Select the escalating stream (6th stream)
    setShowCursor(false);
  };

  const selectedStreamData = selectedStream !== null ? streams[selectedStream] : null;

  return (
    <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-video bg-black overflow-hidden border border-white/10 flex flex-col font-mono text-white/80 crosshair-corners">
      <div className="h-8 md:h-10 border-b border-white/10 flex items-center justify-between px-3 md:px-4 text-[8px] md:text-[10px] font-mono tracking-widest uppercase text-white/60">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="flex items-center gap-1.5"><div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-600 animate-pulse" /> LIVE</span>
          <span className="hidden sm:inline">OFFICER_FIELD_UNIT</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-white/80">SITUATIONAL_HUD</span>
        </div>
      </div>

      {selectedStream === null ? (
        /* Grid View - 9 Streams */
        <div className="flex-1 relative bg-black min-h-[150px] overflow-hidden p-2">
          <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full w-full">
            {streams.map((stream, index) => {
              const isEscalating = escalatingStreamIndex === index;
              const isClickable = isEscalating;
              
              return (
              <motion.div
                key={index}
                ref={(el) => (streamRefs.current[index] = el)}
                onClick={() => isClickable && handleStreamClick(index)}
                style={{
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  willChange: isClickable ? 'transform' : 'auto'
                }}
                className={`relative bg-black overflow-hidden transition-all border border-white/10 ${
                  isEscalating
                    ? "ring-2 ring-red-500 ring-offset-1 ring-offset-black cursor-pointer"
                    : "cursor-not-allowed opacity-60"
                }`}
                whileHover={isClickable ? { scale: 1.02 } : {}}
                whileTap={isClickable ? { scale: 0.98 } : {}}
              >
                <AutoPlayVideo
                  src={stream.src}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {escalatingStreamIndex === index && (
                  <div className="absolute top-1 left-1 z-10">
                    <div className="bg-red-600 px-1.5 py-0.5 text-[6px] font-black text-white flex items-center gap-1 animate-pulse border border-white/10">
                      <div className="w-0.5 h-0.5 bg-white" /> ESCALATING
                    </div>
                  </div>
                )}
                <div className="absolute bottom-1 left-1 z-10">
                  <div className="bg-black px-2 py-1 border border-white/10 min-w-[60px] flex items-center justify-center">
                    <span className="text-[6px] font-mono tracking-widest uppercase text-white whitespace-nowrap">STREAM_{index + 1}</span>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Expanded View - video only on mobile, with sidebars on md+ */
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Panel - hidden on mobile */}
          <div className="hidden md:flex w-full md:w-48 lg:w-60 border-b md:border-b-0 md:border-r border-white/10 p-2 md:p-4 flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible">
            <div className="flex-1 min-w-[140px]">
              <div className="text-[7px] md:text-[9px] text-white/50 mb-1 md:mb-2 flex items-center gap-1.5 font-mono tracking-widest uppercase">
                <Activity size={10} /> SIT_SUMMARY
              </div>
              <p className="text-[9px] md:text-[11px] leading-snug md:leading-relaxed text-white/70 font-mono">
                Active field encounter processing. Hostile man in movie theater.
              </p>
            </div>

            <div className="flex-1 min-w-[140px]">
              <div className="text-[7px] md:text-[9px] text-white/50 mb-1 md:mb-2 flex items-center gap-1.5 font-mono tracking-widest uppercase">
                <Mic size={10} /> KEY_PHRASES
              </div>
              <div className="space-y-1 md:space-y-2">
                <AnimatePresence mode="popLayout">
                  {phrases.slice(0, 2).map((phrase) => (
                    <motion.div 
                      key={phrase}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-[8px] md:text-[10px] border border-white/10 p-1 md:p-2 text-white/80 truncate font-mono"
                    >
                      {phrase}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Video Center - Expanded */}
          <motion.div 
            className="flex-1 relative bg-black min-h-[150px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollControlledVideo
              src={selectedStreamData?.src || ""}
              containerRef={containerRef}
              className="absolute inset-0 w-full h-full object-cover"
              duration={8}
            />
            <div className="hidden md:flex absolute bottom-2 md:bottom-4 left-2 md:left-4 z-10">
              <div className="bg-black px-2 md:px-3 py-1 border border-white/10 flex items-center gap-2">
                <Shield size={8} className="text-emerald-400" />
                <span className="text-[7px] md:text-[9px] font-mono tracking-widest uppercase">SOP_GUARD: 98%</span>
              </div>
            </div>
            {selectedStreamData?.isEscalating && (
              <div className="hidden md:block absolute top-2 md:top-4 left-2 md:left-4 z-10">
                <div className="bg-red-600 px-2 md:px-3 py-1 text-[8px] font-black text-white flex items-center gap-1.5 animate-pulse border border-white/10">
                  <div className="w-1 h-1 bg-white" /> ESCALATING
                </div>
              </div>
            )}
            <button
              onClick={() => setSelectedStream(null)}
              className="absolute top-2 md:top-4 right-2 md:right-4 z-10 bg-black px-4 md:px-6 py-2 border border-white/10 text-white text-[7px] md:text-[9px] font-mono tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Grid</span>
            </button>
          </motion.div>

          {/* Right Panel - Gauge - hidden on mobile */}
          <motion.div 
            className="hidden md:flex w-full md:w-48 lg:w-56 border-t md:border-t-0 md:border-l border-white/10 p-2 md:p-4 flex-col items-center justify-center md:justify-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[7px] md:text-[9px] text-white/50 md:mb-6 flex items-center gap-1.5 font-mono tracking-widest uppercase">
              <AlertTriangle size={10} /> ESCALATION
            </div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  stroke={getScoreColor(escalationScore)} 
                  strokeWidth="6" 
                  fill="transparent" 
                  strokeDasharray="283" 
                  strokeDashoffset={283 - (283 * escalationScore) / 100}
                  strokeLinecap="butt"
                  transition={{ duration: 1 }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg md:text-2xl lg:text-3xl font-black transition-colors" style={{ color: getScoreColor(escalationScore) }}>{escalationScore}</span>
                <span className="text-[6px] md:text-[8px] text-white/50 font-mono uppercase tracking-widest">Index</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Animated Cursor */}
      <AnimatePresence>
        {showCursor && cursorTarget && (
          <AnimatedCursor targetPosition={cursorTarget} onComplete={handleCursorComplete} />
        )}
      </AnimatePresence>
    </div>
  );
};

/* Logo: one half of interlocking mark – P-like loop + V-leg (inspired by ref) */
const LogoMark = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 shrink-0 text-white md:w-8 md:h-8" aria-hidden>
    <path
      d="M6 4v10M6 4h5l3 3v2l-3 3H6M6 14l-3 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <LogoMark />
    <span className="text-2xl font-black tracking-wide uppercase text-white">protent</span>
  </div>
);

/**
 * Get Started form — submits to API which emails srihan@protent.ai
 */
const GetStartedForm = () => {
  const [agency, setAgency] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agency: agency.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message: message.trim().slice(0, 200) || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMessage((data.error || 'Submit failed') + (data.detail ? ` (${data.detail})` : ''));
        setStatus('error');
        return;
      }
      setStatus('success');
      setAgency('');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setErrorMessage('Network error. If running locally, ensure RESEND_API_KEY is in .env and restart the dev server.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white grid-bg flex flex-col">
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-black border-b border-white/10">
        <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-2xl font-black tracking-wide uppercase text-white">protent</span>
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} className="border border-white/10 text-white px-6 py-2 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          Back
        </a>
      </nav>
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
            Get Started
          </h1>
          <p className="text-white/60 font-mono text-sm uppercase tracking-widest mb-8">
            A founder will get back to you within 30 minutes.
          </p>
          {status === 'success' && (
            <div className="mb-6 p-4 border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-mono text-sm uppercase tracking-wide">
              Message sent successfully. 
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-400 font-mono text-sm uppercase tracking-wide">
              {errorMessage || 'Something went wrong. Please email srihan@protent.ai directly.'}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="agency" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                Agency name
              </label>
              <input
                id="agency"
                type="text"
                required
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-mono text-sm uppercase tracking-wide placeholder:text-white/30 focus:outline-none focus:border-white/30"
                placeholder="Your agency or organization"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-mono text-sm uppercase tracking-wide placeholder:text-white/30 focus:outline-none focus:border-white/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-mono text-sm uppercase tracking-wide placeholder:text-white/30 focus:outline-none focus:border-white/30"
                placeholder="you@agency.gov"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                Phone <span className="text-white/30 normal-case">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-mono text-sm uppercase tracking-wide placeholder:text-white/30 focus:outline-none focus:border-white/30"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                Message <span className="text-white/30 normal-case">(optional, 200 characters)</span>
              </label>
              <textarea
                id="message"
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-mono text-sm normal-case tracking-wide placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
                placeholder="Anything you'd like to add…"
              />
              <p className="mt-1 text-right text-[10px] font-mono text-white/40">{message.length}/200</p>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-white text-black py-4 font-black text-[11px] uppercase tracking-widest hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-white"
            >
              {status === 'sending' ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const dashboardSectionRef = useRef<HTMLElement>(null);
  const trackingSectionRef = useRef<HTMLElement>(null);
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? window.location.hash.slice(1) || '/' : '/'));

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (route === '/form') {
    return <GetStartedForm />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/15 selection:text-white grid-bg">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black border-b border-white/10">
        <Logo />
        <div className="hidden md:flex gap-10 text-[11px] font-mono text-white/50 tracking-widest uppercase">
          <button onClick={() => scrollToSection('product')} className="hover:text-white transition-colors">Technology</button>
          <button onClick={() => scrollToSection('dashboard')} className="hover:text-white transition-colors">Situational</button>
          <button onClick={() => scrollToSection('tracking')} className="hover:text-white transition-colors">Live Search</button>
          <button onClick={() => scrollToSection('compliance')} className="hover:text-white transition-colors">Compliance</button>
        </div>
        <a href="#/form" className="border border-white/10 text-white px-6 py-2 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          Get Started
        </a>
      </nav>

      {/* Hero - Tactical */}
      <section className="relative min-h-screen bg-black flex flex-col justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-8 font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
            <span className="flex h-2 w-2 bg-emerald-500 animate-pulse" />
            <span>Status: Operational</span>
            <span className="border-l border-white/20 pl-4">Loc: 34.0522° N, 118.2437° W</span>
            <span className="border-l border-white/20 pl-4 text-white/80">Ref: PROTENT_V1</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-wide leading-tight mb-6">
            Intelligence <br />
            <span className="text-white/40">Without Compromise.</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60 font-mono mb-10 leading-relaxed uppercase tracking-tight">
            Protent provides autonomous strategic oversight for high-stakes environments.
            Built for the next generation of industrial dominance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#/form" className="bg-white text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-white/90 transition-colors border border-white">
              Initialize Deployment
            </a>
            <button type="button" onClick={() => scrollToSection('product')} className="bg-transparent text-white px-10 py-4 font-bold uppercase tracking-widest border border-white/20 hover:border-white transition-colors">
              See Tactical Intelligence
            </button>
          </div>
        </div>
      </section>

      <section id="product" className="py-32 px-6 border-y border-white/10 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-24">
            <h2 className="text-5xl font-black mb-6 tracking-wide uppercase text-white">Unified Tactical Intelligence</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed font-mono tracking-widest uppercase">
              We monitor live field encounters and urban surveillance in parallel. Detect escalation and characterize situations in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { 
                icon: <Target className="text-white w-8 h-8" />, 
                title: "Precision Detection", 
                desc: "Identify weapons, vehicles, and evidence in real-time with enterprise-grade computer vision." 
              },
              { 
                icon: <MessageSquare className="text-white w-8 h-8" />, 
                title: "Live Descriptor Search", 
                desc: "Identify subjects across active streams using natural language like 'female child in red and pink striped sweater'." 
              },
              { 
                icon: <Mic className="text-white w-8 h-8" />, 
                title: "Sentiment Analysis", 
                desc: "Backed by published NLP research, our engines monitor acoustic and verbal patterns to predict volatility as it happens." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -2 }}
                className="p-10 border border-white/10 bg-black hover:border-white/20 transition-colors"
              >
                <div className="mb-6 opacity-80">{feature.icon}</div>
                <h3 className="text-xl font-black mb-4 tracking-wide uppercase text-white">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed font-mono tracking-widest text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={dashboardSectionRef} id="dashboard" className="py-24 md:py-32 px-4 md:px-6 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center lg:text-left">
             <div className="inline-block px-4 py-1 border border-white/10 text-white/50 text-[9px] font-mono tracking-widest uppercase mb-6">
               Situational Awareness
             </div>
             <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-wide leading-[0.85] uppercase text-white">Real-Time<br /><span className="text-white/40">Assistance.</span></h2>
             <p className="text-white/60 max-w-xl text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-mono tracking-widest uppercase">
               Proactive analysis for active field encounters. Automate reporting and ensure officer safety with real-time volatility monitoring.
             </p>
          </div>
          <ProtentDashboard containerRef={dashboardSectionRef} />
        </div>
      </section>

      <section ref={trackingSectionRef} id="tracking" className="py-24 md:py-32 px-4 md:px-6 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 border border-white/10 text-white/50 text-[9px] font-mono tracking-widest uppercase mb-6">
                Active Monitoring
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-wide leading-tight uppercase text-white">Live stream <br />search.</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed font-mono tracking-widest uppercase">
                Protent does not look through the past—it watches the present. Describe what you're looking for, and our engine monitors every active bodycam and CCTV feed for a match, without indexing historical footage.
              </p>
              <div className="space-y-6">
                {[
                  { label: "Natural Language Queries", desc: "Use human descriptions to find targets across live feeds without manual monitoring or archival indexing." },
                  { label: "Zero-Latency Analysis", desc: "Our semantic engine processes live streams with sub-millisecond lag for instant alerting on active deployments." },
                  { label: "Seamless Re-identification", desc: "Maintain visibility of a target as they move between different active live camera nodes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle className="text-white w-5 h-5" /></div>
                    <div>
                      <h4 className="font-black text-white text-base uppercase tracking-wide mb-1">{item.label}</h4>
                      <p className="text-white/50 text-xs font-mono tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <SuspectMatchingDemo containerRef={trackingSectionRef} />
            </div>
          </div>
        </div>
      </section>

      <section id="compliance" className="py-32 px-6 bg-black border-y border-white/10 text-white">
        <div className="max-w-6xl mx-auto text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 border border-white/10 flex items-center justify-center mx-auto lg:mx-0">
                <Lock className="text-white w-8 h-8" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-wide leading-tight uppercase mt-8">CJIS Compliant.</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed font-mono tracking-widest uppercase">
                Security is hardcoded into our architecture. Protent is fully CJIS Compliant, ensuring secure and lawful handling of all intelligence data.
              </p>
              <div className="space-y-6 text-left max-w-md mx-auto lg:mx-0">
                <div className="flex gap-4 p-4 border border-white/10">
                  <CheckCircle className="text-emerald-400 w-6 h-6 shrink-0" />
                  <p className="text-xs font-mono text-white/70 tracking-widest">"We manage all encryption, access controls, and audit logs so you can focus on field operations."</p>
                </div>
              </div>
            </div>
            
            <div className="border border-white/10 p-10 relative overflow-hidden crosshair-corners">
               <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-wide text-white uppercase">Secure Intelligence.</h3>
               <p className="text-white/60 text-sm font-mono leading-relaxed mb-8 tracking-widest uppercase">
                 Minimize risk with end-to-end encrypted cloud storage. Built to survive the demands of legal discovery and transparency.
               </p>
               <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="px-6 py-2 border border-white/10 text-white font-black uppercase tracking-widest text-[10px]">
                    CJIS COMPLIANT
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <Logo />
              <p className="text-white/50 mt-6 max-w-sm font-mono leading-relaxed text-sm tracking-widest uppercase">
                The intelligence layer that watches alongside your operators.
              </p>
            </div>
            <div>
              <h5 className="text-white/50 font-mono mb-6 text-[10px] uppercase tracking-widest">Platform</h5>
              <ul className="space-y-4 text-[11px] font-mono text-white/50 uppercase tracking-widest">
                <li><button onClick={() => scrollToSection('product')} className="hover:text-white transition-colors">Technology</button></li>
                <li><button onClick={() => scrollToSection('dashboard')} className="hover:text-white transition-colors">Situational</button></li>
                <li><button onClick={() => scrollToSection('tracking')} className="hover:text-white transition-colors">Live Search</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white/50 font-mono mb-6 text-[10px] uppercase tracking-widest">Connect</h5>
              <ul className="space-y-4 text-[11px] font-mono text-white/50 uppercase tracking-widest">
                <li>
                  <a href="https://www.linkedin.com/company/protentai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <Linkedin size={12} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:srihan@protent.ai" className="hover:text-white transition-colors flex items-center gap-2">
                    <Mail size={12} /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);