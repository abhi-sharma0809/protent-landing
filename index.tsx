import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useInView
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
 * Scroll-Controlled Video Component
 * Syncs video playback with scroll position as element enters/leaves viewport
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !containerRef.current) return;

    const updateVideoTime = () => {
      if (!video || video.readyState < 2) return;
      const progress = scrollYProgress.get();
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const time = clampedProgress * duration;
      
      if (Math.abs(video.currentTime - time) > 0.15) {
        video.currentTime = time;
      }
    };

    const unsubscribe = scrollYProgress.on("change", updateVideoTime);
    
    const handleLoadedMetadata = () => {
      updateVideoTime();
    };

    if (video.readyState >= 2) {
      updateVideoTime();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    }

    return () => {
      unsubscribe();
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [scrollYProgress, duration, containerRef]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      playsInline
      muted
      preload="metadata"
    />
  );
};

/**
 * 3D Floating Feed Component
 */
const FloatingFeed = ({ index, scrollYProgress }: { index: number, scrollYProgress: any }) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * (index + 1)]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 30]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, -5]);
  
  return (
    <motion.div 
      style={{ 
        y, 
        rotateX, 
        rotateY, 
        perspective: 1000 
      }}
      className="absolute w-64 h-40 bg-[#142f3d]/90 border border-[#142f3d]/20 rounded-lg overflow-hidden backdrop-blur-sm p-2 shadow-2xl"
    >
      <div className="w-full h-full bg-[#0a1820] relative flex items-center justify-center overflow-hidden rounded">
        <div className="absolute top-2 left-2 flex items-center gap-1 text-[8px] text-red-500 animate-pulse font-mono font-bold">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          UNIT_0{index + 1}
        </div>
        <div className="w-full h-[1px] bg-white/5 absolute top-1/2 -translate-y-1/2" />
        <div className="h-full w-[1px] bg-white/5 absolute left-1/2 -translate-x-1/2" />
        <Target className="text-white/10 w-8 h-8" />
      </div>
    </motion.div>
  );
};

/**
 * Suspect Matching Demo
 * Incorporates the specific screenshot scenario: highlighting the girl in the striped sweater on the left.
 */
const SuspectMatchingDemo = ({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const searchQuery = "female child in red and pink striped sweater";

  return (
    <div ref={ref} className="w-full bg-[#0a1820] rounded-2xl border border-[#142f3d]/20 overflow-hidden shadow-2xl font-mono text-[#ede9e5]">
      {/* Search Input Simulation */}
      <div className="p-4 bg-white/[0.03] border-b border-white/5">
        <div className="flex items-center gap-3 mb-2">
          <Search size={14} className="text-blue-400" />
          <div className="flex-1 bg-black/60 rounded px-3 py-2 border border-white/10 flex items-center gap-2 overflow-hidden shadow-inner">
            <motion.span 
              initial={{ width: 0 }}
              animate={isInView ? { width: "auto" } : { width: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="text-[10px] text-blue-300 overflow-hidden whitespace-nowrap font-medium"
            >
               {searchQuery}
            </motion.span>
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-[1px] h-3 bg-blue-300" 
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[8px] opacity-40 uppercase tracking-[0.2em] font-black">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Active Surveillance Scan
          </span>
          <span className="flex items-center gap-1.5"><EyeOff size={10} /> Live-Only Processing</span>
        </div>
      </div>
      
      <div ref={ref} className="relative aspect-video bg-[#020202] overflow-hidden">
        <ScrollControlledVideo
          src="/suspect-match.mp4"
          containerRef={containerRef}
          className="absolute inset-0 w-full h-full object-cover"
          duration={6}
        />

        {/* High-Fidelity Watermark */}
        <div className="absolute top-4 right-6 text-right text-[7px] text-white/60 font-mono tracking-tight leading-relaxed z-10 pointer-events-none">
          2025-11-22 19:39:21 -0500<br />
          AXON BODY 4 D01AC028G
        </div>


        {/* Status Overlays */}
        <div className="absolute top-4 left-6 z-20 flex flex-col gap-2">
          <div className="bg-red-600 px-2 py-0.5 rounded-sm text-[8px] font-black text-white flex items-center gap-1.5 animate-pulse shadow-xl">
             <div className="w-1 h-1 rounded-full bg-white" /> LIVE DEPLOYMENT
          </div>
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[8px] font-bold text-blue-300">
             FEED: STN_WEST_22
          </div>
        </div>

        {/* Telemetry Bar */}
        <div className="absolute bottom-0 w-full h-10 bg-black/80 backdrop-blur-xl border-t border-white/5 flex items-center px-4 justify-between text-[9px] z-20">
           <div className="flex gap-4 items-center">
              <span className="opacity-40 uppercase font-black tracking-widest flex items-center gap-1.5">
                <Signal size={10} className="text-green-500" /> Active Frame Scan
              </span>
              <span className="text-blue-400/80 font-bold">Latency: 4ms</span>
           </div>
           <div className="text-[8px] font-black uppercase italic tracking-widest text-blue-400">
              {isInView ? "Descriptor Lock Acquired" : "Processing real-time stream..."}
           </div>
        </div>
      </div>
      
      {/* Regulatory/Feature Disclaimer */}
      <div className="p-3 bg-white/[0.02] text-[7px] opacity-30 text-center font-bold uppercase tracking-[0.25em]">
        Natural language search operates solely on live streams. No archival data is indexed or preserved for matching.
      </div>
    </div>
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

  return (
    <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-video bg-[#0a1820] rounded-2xl overflow-hidden border border-[#142f3d]/20 shadow-2xl flex flex-col font-mono text-[#ede9e5]">
      {/* Top Status Bar */}
      <div className="h-8 md:h-10 border-b border-white/5 bg-white/[0.03] flex items-center justify-between px-3 md:px-4 text-[8px] md:text-[10px] uppercase tracking-wider">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="flex items-center gap-1.5"><div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-600 rounded-full animate-pulse" /> LIVE</span>
          <span className="opacity-60 hidden sm:inline">OFFICER_FIELD_UNIT</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4 opacity-60">
          <span className="text-white">SITUATIONAL_HUD</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-48 lg:w-60 border-b md:border-b-0 md:border-r border-white/5 p-2 md:p-4 flex md:flex-col gap-4 md:gap-6 bg-white/[0.01] overflow-x-auto md:overflow-x-visible">
          <div className="flex-1 min-w-[140px]">
            <div className="text-[7px] md:text-[9px] opacity-40 mb-1 md:mb-2 flex items-center gap-1.5 uppercase font-bold">
              <Activity size={10} /> SIT_SUMMARY
            </div>
            <p className="text-[9px] md:text-[11px] leading-snug md:leading-relaxed italic opacity-80">
              Active field encounter processing. Hostile man in movie theater.
            </p>
          </div>

          <div className="flex-1 min-w-[140px]">
            <div className="text-[7px] md:text-[9px] opacity-40 mb-1 md:mb-2 flex items-center gap-1.5 uppercase font-bold">
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
                    className="text-[8px] md:text-[10px] bg-white/[0.05] border border-white/5 rounded p-1 md:p-2 text-blue-300 truncate font-medium"
                  >
                    {phrase}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Video Center */}
        <div className="flex-1 relative bg-black min-h-[150px] overflow-hidden">
          <ScrollControlledVideo
            src="/escalating-situation.mp4"
            containerRef={containerRef}
            className="absolute inset-0 w-full h-full object-cover"
            duration={8}
          />
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 z-10">
             <div className="bg-black/80 backdrop-blur px-2 md:px-3 py-1 rounded border border-white/10 flex items-center gap-2">
                <Shield size={8} className="text-green-400" />
                <span className="text-[7px] md:text-[9px] uppercase tracking-tighter">SOP_GUARD: 98%</span>
             </div>
          </div>
        </div>

        {/* Right Panel - Gauge */}
        <div className="w-full md:w-48 lg:w-56 border-t md:border-t-0 md:border-l border-white/5 p-2 md:p-4 flex md:flex-col items-center justify-center md:justify-start bg-white/[0.01]">
          <div className="text-[7px] md:text-[9px] opacity-40 md:mb-6 flex items-center gap-1.5 uppercase font-bold tracking-widest">
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
                  strokeLinecap="round"
                  transition={{ duration: 1 }}
                />
             </svg>
             <div className="absolute flex flex-col items-center">
                <span className="text-lg md:text-2xl lg:text-3xl font-black transition-colors" style={{ color: getScoreColor(escalationScore) }}>{escalationScore}</span>
                <span className="text-[6px] md:text-[8px] opacity-40 font-bold uppercase tracking-widest">Index</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => (
  <div className="flex items-center gap-1 group">
    <span className="text-2xl font-normal tracking-[-0.08em] text-[#142f3d]">protent</span>
    {/* <div className="w-1.5 h-1.5 bg-[#142f3d] rounded-full mt-2 group-hover:scale-150 transition-transform duration-300" /> */}
  </div>
);

const App = () => {
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const dashboardSectionRef = useRef<HTMLElement>(null);
  const trackingSectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#ede9e5] text-[#142f3d] selection:bg-[#142f3d] selection:text-[#ede9e5]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#ede9e5]/60 border-b border-[#142f3d]/5">
        <Logo />
        <div className="hidden md:flex gap-10 text-[11px] font-bold text-[#142f3d]/60 uppercase tracking-[0.2em]">
          <button onClick={() => scrollToSection('product')} className="hover:text-[#142f3d] transition-colors">Technology</button>
          <button onClick={() => scrollToSection('dashboard')} className="hover:text-[#142f3d] transition-colors">Situational</button>
          <button onClick={() => scrollToSection('tracking')} className="hover:text-[#142f3d] transition-colors">Live Search</button>
          <button onClick={() => scrollToSection('compliance')} className="hover:text-[#142f3d] transition-colors">Compliance</button>
        </div>
        <a href="mailto:srihan@protent.ai" className="bg-[#142f3d] text-[#ede9e5] px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#1c4155] transition-all shadow-lg">
          Get Started
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142f3d]/5 border border-[#142f3d]/10 text-[#142f3d] text-[10px] font-black mb-6 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Backed by Y Combinator
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-[#142f3d]">
              SENSE THE <br />
              <span className="italic opacity-40">INVISIBLE.</span>
            </h1>
            <p className="text-xl text-[#142f3d]/70 max-w-md mb-10 leading-relaxed font-medium">
              Real-time video intelligence for the modern force.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:srihan@protent.ai" className="bg-[#142f3d] text-[#ede9e5] px-10 py-4 rounded-full font-black flex items-center justify-center gap-2 group hover:shadow-2xl hover:translate-y-[-2px] transition-all text-[11px] uppercase tracking-[0.2em]">
                Request Pilot
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => scrollToSection('dashboard')} className="border border-[#142f3d]/20 px-10 py-4 rounded-full font-black hover:bg-[#142f3d]/5 transition-all text-[11px] uppercase tracking-[0.2em]">
                See The Difference
              </button>
            </div>
          </motion.div>

          {/* 3D Visual Area */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <FloatingFeed index={0} scrollYProgress={springScroll} />
              <div className="absolute translate-x-32 -translate-y-24">
                <FloatingFeed index={1} scrollYProgress={springScroll} />
              </div>
              <div className="absolute -translate-x-32 translate-y-32">
                <FloatingFeed index={2} scrollYProgress={springScroll} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section id="product" className="py-32 px-6 border-y border-[#142f3d]/5 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-24">
            <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase">Unified Tactical Intelligence</h2>
            <p className="text-[#142f3d]/60 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              We monitor live field encounters and urban surveillance in parallel. Detect escalation and characterize situations in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              { 
                icon: <Target className="text-[#142f3d] w-8 h-8" />, 
                title: "Precision Detection", 
                desc: "Identify weapons, vehicles, and evidence in real-time with enterprise-grade computer vision." 
              },
              { 
                icon: <MessageSquare className="text-[#142f3d] w-8 h-8" />, 
                title: "Live Descriptor Search", 
                desc: "Identify subjects across active streams using natural language like 'female child in red and pink striped sweater'." 
              },
              { 
                icon: <Mic className="text-[#142f3d] w-8 h-8" />, 
                title: "Sentiment Analysis", 
                desc: "Backed by published NLP research, our engines monitor acoustic and verbal patterns to predict volatility as it happens." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-white border border-[#142f3d]/5 hover:border-[#142f3d]/20 transition-all shadow-sm"
              >
                <div className="mb-6 opacity-80">{feature.icon}</div>
                <h3 className="text-xl font-black mb-4 tracking-tight uppercase">{feature.title}</h3>
                <p className="text-[#142f3d]/60 leading-relaxed font-medium text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Situational Dashboard Section */}
      <section ref={dashboardSectionRef} id="dashboard" className="py-24 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center lg:text-left">
             <div className="inline-block px-4 py-1 rounded-full border border-[#142f3d]/20 text-[#142f3d] text-[9px] font-black uppercase tracking-[0.2em] mb-6">
               Situational Awareness
             </div>
             <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase">Real-Time<br /><span className="text-[#142f3d]/40 italic">Assistance.</span></h2>
             <p className="text-[#142f3d]/60 max-w-xl text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-medium">
               Proactive analysis for active field encounters. Automate reporting and ensure officer safety with real-time volatility monitoring.
             </p>
          </div>
          <ProtentDashboard containerRef={dashboardSectionRef} />
        </div>
      </section>

      {/* Suspect Matching Section */}
      <section ref={trackingSectionRef} id="tracking" className="py-24 md:py-32 px-4 md:px-6 bg-[#142f3d]/5 border-y border-[#142f3d]/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full border border-[#142f3d]/20 text-[#142f3d] text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                Active Monitoring
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight uppercase">Live stream <br />search.</h2>
              <p className="text-lg text-[#142f3d]/70 mb-10 leading-relaxed font-medium">
                Protent does not look through the past—it watches the present. Describe what you're looking for, and our engine monitors every active bodycam and CCTV feed for a match, without indexing historical footage.
              </p>
              <div className="space-y-6">
                {[
                  { label: "Natural Language Queries", desc: "Use human descriptions to find targets across live feeds without manual monitoring or archival indexing." },
                  { label: "Zero-Latency Analysis", desc: "Our semantic engine processes live streams with sub-millisecond lag for instant alerting on active deployments." },
                  { label: "Seamless Re-identification", desc: "Maintain visibility of a target as they move between different active live camera nodes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle className="text-[#142f3d] w-5 h-5" /></div>
                    <div>
                      <h4 className="font-black text-[#142f3d] text-base uppercase tracking-wider mb-1">{item.label}</h4>
                      <p className="text-[#142f3d]/50 text-xs font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-blue-600/5 blur-[80px] rounded-full" />
              <SuspectMatchingDemo containerRef={trackingSectionRef} />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-32 px-6 bg-[#142f3d] text-[#ede9e5]">
        <div className="max-w-6xl mx-auto text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner backdrop-blur-md mx-auto lg:mx-0">
                <Lock className="text-[#ede9e5] w-8 h-8" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight uppercase">CJIS Compliant.</h2>
              <p className="text-lg text-[#ede9e5]/70 mb-10 leading-relaxed font-medium">
                Security is hardcoded into our architecture. Protent is fully CJIS Compliant, ensuring secure and lawful handling of all intelligence data.
              </p>
              <div className="space-y-6 text-left max-w-md mx-auto lg:mx-0">
                <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle className="text-green-400 w-6 h-6 shrink-0" />
                  <p className="text-xs font-medium text-[#ede9e5]/80 italic">"We manage all encryption, access controls, and audit logs so you can focus on field operations."</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#ede9e5]/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-32 -mt-32" />
               <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-[#ede9e5]/90 uppercase">Secure Intelligence.</h3>
               <p className="text-[#ede9e5]/60 text-sm font-medium leading-relaxed mb-8">
                 Minimize risk with on-device processing and end-to-end encrypted cloud storage. Built to survive the demands of legal discovery and transparency.
               </p>
               <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="px-6 py-2 border-2 border-white/20 rounded-full text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    CJIS CERTIFIED
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-[#142f3d]/5 bg-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <Logo />
              <p className="text-[#142f3d]/50 mt-6 max-w-sm font-medium leading-relaxed text-sm italic">
                Pioneering natural language live search for modern law enforcement. Built for clarity, accountability, and real-time precision.
              </p>
            </div>
            <div>
              <h5 className="text-[#142f3d] font-black mb-6 text-[10px] uppercase tracking-[0.25em]">Platform</h5>
              <ul className="space-y-4 text-[11px] font-bold text-[#142f3d]/40 uppercase tracking-widest">
                <li><button onClick={() => scrollToSection('product')} className="hover:text-[#142f3d] transition-colors">Technology</button></li>
                <li><button onClick={() => scrollToSection('dashboard')} className="hover:text-[#142f3d] transition-colors">Situational</button></li>
                <li><button onClick={() => scrollToSection('tracking')} className="hover:text-[#142f3d] transition-colors">Live Search</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#142f3d] font-black mb-6 text-[10px] uppercase tracking-[0.25em]">Connect</h5>
              <ul className="space-y-4 text-[11px] font-bold text-[#142f3d]/40 uppercase tracking-widest">
                <li>
                  <a href="https://www.linkedin.com/company/protentai/" target="_blank" rel="noopener noreferrer" className="hover:text-[#142f3d] transition-colors flex items-center gap-2">
                    <Linkedin size={12} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:srihan@protent.ai" className="hover:text-[#142f3d] transition-colors flex items-center gap-2">
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