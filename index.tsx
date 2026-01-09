import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence
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
  Settings,
  Mail,
  Linkedin,
  Lock
} from 'lucide-react';

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
 * Protent Dashboard UI
 * Displays real-time bodycam video analysis, escalation scores, and summaries.
 * Improved responsiveness for mobile.
 */
const ProtentDashboard = () => {
  const [escalationScore, setEscalationScore] = useState(42);
  const [phrases, setPhrases] = useState(['"Step out of the vehicle"', '"Registration and insurance"']);
  const [objects, setObjects] = useState([
    { id: 1, label: 'Vehicle', x: 25, y: 40, w: 40, h: 30 },
    { id: 2, label: 'Subject', x: 55, y: 35, w: 15, h: 45 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEscalationScore(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.min(100, Math.max(0, prev + change));
      });
      
      setObjects(prev => prev.map(obj => ({
        ...obj,
        x: obj.x + (Math.random() - 0.5) * 1,
        y: obj.y + (Math.random() - 0.5) * 1,
      })));
    }, 2000);

    const phraseInterval = setInterval(() => {
      const pool = ['"Stay back"', '"Watch your hands"', '"Copy that"', '"License please"', '"Clear the area"'];
      setPhrases(prev => [pool[Math.floor(Math.random() * pool.length)], ...prev].slice(0, 3));
    }, 4500);

    return () => {
      clearInterval(interval);
      clearInterval(phraseInterval);
    };
  }, []);

  const getScoreColor = (score: number) => {
    if (score < 40) return '#4ade80'; // Green
    if (score < 75) return '#fbbf24'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-video bg-[#0a1820] rounded-2xl overflow-hidden border border-[#142f3d]/20 shadow-2xl flex flex-col font-mono text-[#ede9e5]">
      {/* Top Status Bar - Compact on Mobile */}
      <div className="h-8 md:h-10 border-b border-white/5 bg-white/[0.03] flex items-center justify-between px-3 md:px-4 text-[8px] md:text-[10px] uppercase tracking-wider">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="flex items-center gap-1.5"><div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-600 rounded-full animate-pulse" /> LIVE</span>
          <span className="opacity-60 hidden sm:inline">UNIT: B_SECTION_012</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4 opacity-60">
          <span className="hidden md:inline">LAT: 34.0522</span>
          <span className="hidden md:inline">LNG: -118.2437</span>
          <span className="text-white">10:42:15 AM</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Intelligence Summary Panel - Responsive height/width */}
        <div className="w-full md:w-48 lg:w-60 border-b md:border-b-0 md:border-r border-white/5 p-2 md:p-4 flex md:flex-col gap-4 md:gap-6 bg-white/[0.01] overflow-x-auto md:overflow-x-visible">
          <div className="flex-1 min-w-[140px]">
            <div className="text-[7px] md:text-[9px] opacity-40 mb-1 md:mb-2 flex items-center gap-1.5 uppercase font-bold">
              <Activity size={10} /> SIT_SUMMARY
            </div>
            <p className="text-[9px] md:text-[11px] leading-snug md:leading-relaxed italic opacity-80 line-clamp-2 md:line-clamp-none">
              Routine stop transition to dispute. Agitated subject.
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
                    className="text-[8px] md:text-[10px] bg-white/[0.05] border border-white/5 rounded p-1 md:p-2 text-blue-300 truncate"
                  >
                    {phrase}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center: Video Feed Simulation */}
        <div className="flex-1 relative bg-black min-h-[150px]">
          <div className="absolute inset-0 bg-[#ede9e5]/[0.02] grid-bg opacity-10 pointer-events-none" />
          
          {/* Object Detection Overlays */}
          {objects.map(obj => (
            <motion.div 
              key={obj.id}
              className="absolute border border-blue-400/30 flex flex-col items-start transition-all"
              style={{ left: `${obj.x}%`, top: `${obj.y}%`, width: `${obj.w}%`, height: `${obj.h}%` }}
            >
              <div className="bg-blue-500 text-black text-[6px] md:text-[7px] font-bold px-1 uppercase">
                {obj.label}
              </div>
            </motion.div>
          ))}

          {/* Central UI Elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-32 h-32 md:w-48 md:h-48 border border-white/20 rounded-full" />
            <div className="absolute w-full h-[0.5px] bg-white/10" />
            <div className="absolute h-full w-[0.5px] bg-white/10" />
          </div>

          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
             <div className="bg-black/80 backdrop-blur px-2 md:px-3 py-1 rounded border border-white/10 flex items-center gap-2">
                <Shield size={8} className="text-green-400" />
                <span className="text-[7px] md:text-[9px] uppercase tracking-tighter">SOP: 98%</span>
             </div>
          </div>
        </div>

        {/* Right: Analytics & Scoring - Scaled Gauge */}
        <div className="w-full md:w-48 lg:w-56 border-t md:border-t-0 md:border-l border-white/5 p-2 md:p-4 flex md:flex-col items-center justify-center md:justify-start bg-white/[0.01]">
          <div className="w-full flex md:flex-col items-center justify-around md:justify-start">
            <div className="text-[7px] md:text-[9px] opacity-40 md:mb-6 flex items-center gap-1.5 uppercase font-bold justify-center">
              <AlertTriangle size={10} /> SCORE
            </div>
            
            <div className="flex flex-col items-center relative py-1 md:py-2">
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
                    <motion.span 
                      key={escalationScore}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-lg md:text-2xl lg:text-3xl font-black transition-colors"
                      style={{ color: getScoreColor(escalationScore) }}
                    >
                      {escalationScore}
                    </motion.span>
                    <span className="text-[6px] md:text-[8px] opacity-40 font-bold uppercase tracking-widest">Index</span>
                 </div>
              </div>
            </div>

            <div className="hidden md:block mt-auto w-full border-t border-white/5 pt-4 space-y-2">
              <div className="flex justify-between text-[7px] md:text-[8px] opacity-50 font-bold uppercase">
                <span>LATENCY</span>
                <span className="text-white">12MS</span>
              </div>
              <div className="flex justify-between text-[7px] md:text-[8px] opacity-50 font-bold uppercase">
                <span>PROTENT</span>
                <span className="text-white">V4.2</span>
              </div>
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
          <button onClick={() => scrollToSection('dashboard')} className="hover:text-[#142f3d] transition-colors">Intelligence</button>
          <button onClick={() => scrollToSection('integration')} className="hover:text-[#142f3d] transition-colors">Compliance</button>
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
              Real-time video intelligence for bodycams. We transform raw footage into actionable situational awareness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:srihan@protent.ai" className="bg-[#142f3d] text-[#ede9e5] px-10 py-4 rounded-full font-black flex items-center justify-center gap-2 group hover:shadow-2xl hover:translate-y-[-2px] transition-all text-[11px] uppercase tracking-[0.2em]">
                Request Pilot
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => scrollToSection('dashboard')} className="border border-[#142f3d]/20 px-10 py-4 rounded-full font-black hover:bg-[#142f3d]/5 transition-all text-[11px] uppercase tracking-[0.2em]">
                See Dashboard
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase">Mission Critical Intelligence</h2>
            <p className="text-[#142f3d]/60 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              We provide the missing layer between the field and command, turning bodycam video into a real-time tactical asset.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Target className="text-[#142f3d] w-8 h-8" />, 
                title: "Precision Detection", 
                desc: "Identify weapons, vehicles, and evidence in real-time with enterprise-grade computer vision." 
              },
              { 
                icon: <Zap className="text-[#142f3d] w-8 h-8" />, 
                title: "Live Narratives", 
                desc: "Automated situational summaries generated as events unfold, keeping dispatchers informed." 
              },
              { 
                icon: <Mic className="text-[#142f3d] w-8 h-8" />, 
                title: "Sentiment Analysis", 
                desc: "Backed by published NLP research, our engines monitor acoustic and verbal patterns to predict volatility." 
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

      {/* Dashboard Section */}
      <section id="dashboard" className="py-24 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center lg:text-left">
             <div className="inline-block px-4 py-1 rounded-full border border-[#142f3d]/20 text-[#142f3d] text-[9px] font-black uppercase tracking-[0.2em] mb-6">
               Protent Intelligence Cloud
             </div>
             <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase">Command &<br />Control.</h2>
             <p className="text-[#142f3d]/60 max-w-xl text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-medium">
               Designed for dispatchers and command staff. Monitor encounters with predictive scoring and automated logging.
             </p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-24 bg-[#142f3d]/5 blur-[120px] rounded-full pointer-events-none" />
            <ProtentDashboard />
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
              {[
                { label: "SENTIMENT SCORING", desc: "A 0-100 index derived from acoustic and visual cues to predict encounter volatility." },
                { label: "PHRASE MONITORING", desc: "NLP-driven monitoring of key verbal triggers, based on peer-reviewed research." },
                { label: "OBJECT MAPPING", desc: "Instant tagging of mission-critical assets directly within the video feed." }
              ].map((item, i) => (
                <div key={i} className="p-4 md:p-6 bg-white border border-[#142f3d]/5 rounded-2xl shadow-sm">
                   <h4 className="text-[#142f3d] font-black text-[10px] md:text-xs mb-2 md:mb-3 tracking-widest uppercase">{item.label}</h4>
                   <p className="text-[10px] md:text-xs text-[#142f3d]/60 leading-relaxed font-medium italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="integration" className="py-32 px-6 bg-[#142f3d] text-[#ede9e5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner backdrop-blur-md">
                <Lock className="text-[#ede9e5] w-8 h-8" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight uppercase">Trusted &<br />Compliant.</h2>
              <p className="text-lg text-[#ede9e5]/70 mb-10 leading-relaxed font-medium">
                Data integrity and security are at the core of our platform. We work hand-in-hand with agencies to ensure every deployment meets strict regulatory requirements.
              </p>
              <div className="space-y-6">
                {[
                  { label: "CJIS Compliant", desc: "Protent is fully CJIS Compliant. We adhere to the highest standards of data security and law enforcement protocols." },
                  { label: "Zero-Downtime Rollout", desc: "Keep your current operations running perfectly while we overlay the intelligence layer." },
                  { label: "24/7 Ground Support", desc: "Dedicated tactical support engineers available around the clock to assist your force." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle className="text-[#ede9e5] w-5 h-5" /></div>
                    <div>
                      <h4 className="font-black text-[#ede9e5] text-base uppercase tracking-wider mb-1">{item.label}</h4>
                      <p className="text-[#ede9e5]/50 text-xs font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#ede9e5]/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden text-center lg:text-left">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-32 -mt-32" />
               <div className="mb-6 flex justify-center lg:justify-start">
                  <div className="px-6 py-3 border-2 border-white/20 rounded-xl text-white font-black uppercase tracking-[0.3em] text-sm">
                    CJIS CERTIFIED
                  </div>
               </div>
               <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-[#ede9e5]/90">
                 Secure. Transparent. Scalable.
               </h3>
               <p className="text-[#ede9e5]/60 text-sm font-medium leading-relaxed mb-8">
                 We manage all encryption, access controls, and audit logs so you can focus on field operations. Our infrastructure is built to survive the demands of large-scale urban policing.
               </p>
               <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Shield className="text-white/60" size={20} />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-[11px]">Secure Intelligence</p>
                    <p className="text-[#ede9e5]/40 text-[10px] font-bold uppercase tracking-tighter">Enterprise Standard</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-[#142f3d]/5 bg-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <Logo />
              <p className="text-[#142f3d]/50 mt-6 max-w-sm font-medium leading-relaxed text-sm italic">
                Empowering law enforcement with next-generation real-time video intelligence. Built for clarity, accountability, and life-saving speed.
              </p>
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