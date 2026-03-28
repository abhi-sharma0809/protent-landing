import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Lock, Linkedin, ArrowRight } from 'lucide-react';
import './globals.css';

const CALENDLY_DEMO =
  (import.meta.env.VITE_CALENDLY_DEMO_URL as string | undefined)?.trim() ||
  'https://calendly.com/srihan-protent/demo';

const INK = '#071422';

/** Optional full-bleed MP4; takes precedence over the default hero photograph. */
const HERO_FULL_BLEED_URL = (import.meta.env.VITE_HERO_VIDEO_URL as string | undefined)?.trim() || '';

/** Default hero still (SOC / command floor). Override with absolute or root-relative URL. */
const HERO_IMAGE_URL =
  (import.meta.env.VITE_HERO_IMAGE_URL as string | undefined)?.trim() || '/hero-soc.png';

const LOGO_STROKE_USER_UNITS = 7;

function HeroBackdropOverlays({ variant }: { variant: 'media' | 'video' }) {
  const specGrid = variant === 'video';
  const hideOnReduce = specGrid;

  return (
    <>
      {specGrid ? <div className="hero-intel-overlay motion-reduce:hidden" aria-hidden /> : null}
      {hideOnReduce ? (
        <div className="absolute inset-0 hidden bg-[#071422] motion-reduce:block" aria-hidden />
      ) : null}
      <div
        className={
          variant === 'media'
            ? 'absolute inset-0 bg-gradient-to-r from-[#071422] via-[#071422]/78 via-[28%] to-[#071422]/14'
            : 'absolute inset-0 bg-gradient-to-r from-[#071422] via-[#071422]/92 to-[#071422]/50 motion-reduce:hidden'
        }
        aria-hidden
      />
      <div
        className={
          variant === 'media'
            ? 'absolute inset-0 bg-gradient-to-t from-[#071422]/82 via-transparent to-[#071422]/40'
            : 'absolute inset-0 bg-gradient-to-t from-[#071422]/92 via-transparent to-[#071422]/45 motion-reduce:hidden'
        }
        aria-hidden
      />
      {variant === 'media' ? (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#071422]/90 from-[0%] via-transparent via-[38%] to-transparent to-[55%]"
          aria-hidden
        />
      ) : null}
      {variant === 'media' ? (
        <div
          className="absolute inset-0 bg-[#0b5cab]/[0.05] mix-blend-overlay motion-reduce:mix-blend-normal motion-reduce:bg-transparent"
          aria-hidden
        />
      ) : null}
    </>
  );
}

function HeroSingleVideoBackdrop({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener('canplay', tryPlay);
    return () => v.removeEventListener('canplay', tryPlay);
  }, [src]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <video
        ref={ref}
        className="hero-video absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <HeroBackdropOverlays variant="video" />
    </div>
  );
}

function HeroPhotoBackdrop({ src }: { src: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#071422]">
      <img
        src={src}
        alt=""
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-[34%_46%] h-[112%] w-[112%] md:h-[108%] md:w-[108%] md:object-[36%_48%]"
        decoding="async"
        fetchPriority="high"
        aria-hidden
      />
      <HeroBackdropOverlays variant="media" />
    </div>
  );
}

function HeroBackdrop() {
  if (HERO_FULL_BLEED_URL) {
    return <HeroSingleVideoBackdrop src={HERO_FULL_BLEED_URL} />;
  }
  return <HeroPhotoBackdrop src={HERO_IMAGE_URL} />;
}

function ProtentLogo({ size = 100, stroke = 'currentColor' }: { size?: number; stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M 35 30 A 20 20 0 0 0 35 70"
        stroke={stroke}
        strokeWidth={LOGO_STROKE_USER_UNITS}
        strokeLinecap="square"
        fill="none"
      />
      <path
        d="M 65 30 A 20 20 0 0 1 65 70"
        stroke={stroke}
        strokeWidth={LOGO_STROKE_USER_UNITS}
        strokeLinecap="square"
        fill="none"
      />
      <line
        x1="50"
        y1="35"
        x2="50"
        y2="65"
        stroke={stroke}
        strokeWidth={LOGO_STROKE_USER_UNITS}
        strokeLinecap="square"
      />
    </svg>
  );
}

const LogoMark = ({ size = 32, stroke = INK }: { size?: number; stroke?: string }) => (
  <ProtentLogo size={size} stroke={stroke} />
);

const Logo = () => (
  <div className="flex items-center gap-2.5" style={{ color: INK }}>
    <LogoMark size={36} stroke={INK} />
    <span className="text-[17px] font-semibold tracking-tight">Protent</span>
  </div>
);

const App = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#071422]">
      <header className="sticky top-0 z-50 border-b border-[#d7dde3] bg-white">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 md:px-10">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 rounded-sm outline-none ring-[#0b5cab] focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="Protent home"
          >
            <LogoMark size={30} stroke={INK} />
            <span className="text-[17px] font-semibold tracking-tight text-[#071422]">Protent</span>
          </button>
          <div className="hidden items-center gap-10 text-[15px] font-medium text-[#3d4d5c] md:flex">
            <button type="button" onClick={() => scrollToSection('product')} className="transition hover:text-[#071422]">
              Platform
            </button>
            <button type="button" onClick={() => scrollToSection('how')} className="transition hover:text-[#071422]">
              Deployment
            </button>
            <button type="button" onClick={() => scrollToSection('compare')} className="transition hover:text-[#071422]">
              Differentiation
            </button>
            <button type="button" onClick={() => scrollToSection('security')} className="transition hover:text-[#071422]">
              Security
            </button>
          </div>
          <a
            href={CALENDLY_DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 bg-[#071422] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#0c2438]"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </nav>
      </header>

      <main>
        <section className="relative min-h-[78vh] overflow-hidden border-b border-[#d7dde3]">
          <HeroBackdrop />
          <div className="relative z-10 px-5 py-20 md:px-10 md:py-28 lg:min-h-[78vh] lg:py-32">
            <div className="mx-auto flex max-w-[1200px] flex-col justify-center lg:min-h-[calc(78vh-8rem)] lg:grid lg:grid-cols-12 lg:gap-14 lg:items-center">
              <div className="lg:col-span-7">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">Live video intelligence</p>
                <h1 className="pt-h1 text-[2rem] leading-[1.18] text-white md:text-[2.5rem] lg:text-[2.75rem]">
                  Situational awareness from every feed you operate.
                </h1>
                <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/80">
                  Protent is built for agencies that run live video at scale: behavioral and situational signals surface first,
                  natural language search runs on live streams only, and the stack is designed for CJIS-aligned environments.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={CALENDLY_DEMO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-white px-8 py-3.5 text-[14px] font-semibold text-[#071422] transition hover:bg-white/95 sm:w-auto"
                  >
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => scrollToSection('product')}
                    className="w-full border border-white/35 bg-white/5 px-8 py-3.5 text-[14px] font-semibold text-white backdrop-blur-[2px] transition hover:border-white/55 hover:bg-white/10 sm:w-auto"
                  >
                    View platform
                  </button>
                </div>
              </div>
              <aside className="mt-14 border border-white/20 bg-black/35 p-8 backdrop-blur-md lg:col-span-5 lg:mt-0">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">At a glance</p>
                <ul className="space-y-5 text-[15px] leading-snug text-white/75">
                  <li className="border-l-2 border-[#5eb0e8] pl-4">
                    <span className="block font-semibold text-white">Live-only processing</span>
                    <span className="mt-1 block">Search and analysis on active streams, not a retrospective archive.</span>
                  </li>
                  <li className="border-l-2 border-white/25 pl-4">
                    <span className="block font-semibold text-white">Supervisor-first</span>
                    <span className="mt-1 block">Signals and language models tuned for operational tempo, not consumer demos.</span>
                  </li>
                  <li className="border-l-2 border-white/25 pl-4">
                    <span className="block font-semibold text-white">Security by design</span>
                    <span className="mt-1 block">Encryption, access control, and audit trails aligned to public safety requirements.</span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="product" className="scroll-mt-24 border-b-2 border-[#071422] bg-[#e8eaed] px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px] border border-[#071422] bg-white">
            <header className="border-b border-[#071422] px-6 py-8 md:px-10 md:py-10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3d4d5c]">
                Platform — capability matrix
              </p>
              <h2 className="pt-h2 mt-3 text-[22px] md:text-[26px]">Real-time operations</h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4d5c]">
                Integrated functions used together on live deployments. Each column maps to a distinct operational workload.
              </p>
            </header>
            <div className="grid md:grid-cols-3 md:divide-x md:divide-[#071422]">
              {[
                {
                  code: '01',
                  title: 'Behavioral & situational analysis',
                  desc: 'Acoustic and verbal patterns plus scene context to flag escalation risk early, grounded in published NLP research.',
                },
                {
                  code: '02',
                  title: 'Natural language search',
                  desc: 'Describe subjects or situations in plain language across active feeds. No indexing of historical footage.',
                },
                {
                  code: '03',
                  title: 'Precision detection',
                  desc: 'Weapons, vehicles, and evidence-class objects in real time using enterprise computer vision.',
                },
              ].map((item) => (
                <article key={item.code} className="border-b border-[#071422] px-6 py-8 last:border-b-0 md:border-b-0 md:px-8 md:py-10 lg:px-10">
                  <p className="font-mono text-[12px] font-semibold tabular-nums text-[#071422]">{item.code}</p>
                  <h3 className="mt-3 text-[14px] font-bold uppercase tracking-[0.06em] text-[#071422]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#3d4d5c]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-24 border-b border-[#d7dde3] bg-white px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px] border border-[#071422] bg-white">
            <header className="border-b border-[#071422] px-6 py-8 md:px-10 md:py-10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3d4d5c]">
                Deployment — implementation sequence
              </p>
              <h2 className="pt-h2 mt-3 text-[22px] md:text-[26px]">How agencies bring Protent online</h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4d5c]">
                From integration to live use, aligned with command staff and video-unit workflows. Phases are fixed-order; overlap
                is allowed where infrastructure permits.
              </p>
            </header>
            <ol className="list-none">
              {[
                {
                  step: '01',
                  title: 'Connect live video infrastructure',
                  body: 'Field and fixed cameras integrate with Protent for real-time processing and alerting where latency matters.',
                },
                {
                  step: '02',
                  title: 'Operationalize signals',
                  body: 'Verbal, acoustic, and situational models run continuously so supervisors see patterns before they require a manual review of every tile.',
                },
                {
                  step: '03',
                  title: 'Search and correlate on demand',
                  body: 'Natural language queries execute against live video only, with detection and re-identification across nodes when a match is operationally relevant.',
                },
              ].map((block) => (
                <li
                  key={block.step}
                  className="grid border-b border-[#071422] last:border-b-0 md:grid-cols-[minmax(5.5rem,7rem)_1fr]"
                >
                  <div className="border-b border-[#071422] bg-[#f0f2f4] px-5 py-5 font-mono text-[13px] font-semibold tabular-nums text-[#071422] md:border-b-0 md:border-r md:border-[#071422] md:px-6 md:py-6">
                    {block.step}
                  </div>
                  <div className="px-5 py-6 md:px-8 md:py-6">
                    <h3 className="text-[15px] font-bold text-[#071422]">{block.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#3d4d5c]">{block.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-[#071422] bg-[#e8eaed] px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px] border border-[#071422] bg-white lg:grid lg:grid-cols-12">
            <div className="border-b border-[#071422] p-6 md:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3d4d5c]">
                Operations — VMS integration
              </p>
              <h2 className="pt-h2 mt-3 text-[22px] md:text-[26px]">Works with your existing VMS</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#3d4d5c]">
                Protent is an intelligence layer: it does not replace your video management system. It prioritizes behavioral
                and situational context on the same feeds your floor already watches, then adds natural language search when
                teams need to narrow the picture.
              </p>
            </div>
            <div className="overflow-x-auto lg:col-span-7">
              <table className="w-full min-w-[320px] border-collapse text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#071422] bg-[#f0f2f4]">
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3d4d5c] md:px-6">
                      Function
                    </th>
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3d4d5c] md:px-6">
                      Specification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      title: 'Behavioral & situational analysis',
                      desc: 'Language, tone, and scene dynamics interpreted on a continuous basis.',
                    },
                    {
                      title: 'Streaming analysis latency',
                      desc: 'Processing tuned so supervisors receive signals while events are still unfolding.',
                    },
                    {
                      title: 'Natural language queries',
                      desc: 'Describe what you need; the system evaluates every active feed for a match.',
                    },
                    {
                      title: 'Re-identification across nodes',
                      desc: 'Track continuity as subjects move between cameras on the deployment.',
                    },
                  ].map((row) => (
                    <tr key={row.title} className="border-b border-[#d7dde3] last:border-b-0">
                      <td className="w-[38%] align-top px-5 py-4 font-semibold text-[#071422] md:px-6">{row.title}</td>
                      <td className="align-top px-5 py-4 leading-relaxed text-[#3d4d5c] md:px-6">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="compare" className="scroll-mt-24 border-b border-[#d7dde3] bg-white px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <p className="pt-eyebrow mb-4 text-center">Differentiation</p>
            <h2 className="pt-h2 text-center text-2xl md:text-3xl">Built for simultaneous live feeds</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[17px] text-[#3d4d5c]">
              Most general-purpose tools assume stored media or low camera counts. Protent assumes continuous live video and
              command-staff workload.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="border border-[#d7dde3] bg-[#f0f3f6] p-8 md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a6b7a]">Typical limitations</p>
                <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#3d4d5c]">
                  <li>Manual monitoring of large wall layouts, or post-incident review of stored video.</li>
                  <li>Keyword and metadata search that misses natural descriptions of people, clothing, and context.</li>
                  <li>Fragmented views that make it difficult to follow movement across cameras in real time.</li>
                </ul>
              </div>
              <div className="border border-[#071422] bg-[#071422] p-8 text-white md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">With Protent</p>
                <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/90">
                  <li>Continuous behavioral and situational signals so supervisors are not inferring risk from raw tiles alone.</li>
                  <li>Natural language search over live streams only, without building a searchable historical archive.</li>
                  <li>Architecture and controls oriented toward CJIS-aligned handling of sensitive law enforcement data.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="scroll-mt-24 border-b border-[#d7dde3] bg-[#f0f3f6] px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-0 border border-[#d7dde3] bg-white md:grid-cols-2">
              <div className="border-b border-[#d7dde3] p-10 md:border-b-0 md:border-r md:p-12">
                <Lock className="h-6 w-6 text-[#0b5cab]" strokeWidth={1.75} />
                <h2 className="pt-h2 mt-6 text-2xl md:text-3xl">CJIS-aligned security</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#3d4d5c]">
                  Encryption, access control, and auditability are part of the product architecture, not a separate compliance
                  project. Protent is designed for the standards public safety organizations expect when video and intelligence
                  data are in scope.
                </p>
              </div>
              <div className="flex flex-col justify-center p-10 md:p-12">
                <div className="border-l-2 border-[#0b5cab] bg-[#f0f3f6] pl-5 pr-4 py-4">
                  <p className="text-[15px] leading-relaxed text-[#3d4d5c]">
                    Our team focuses on the security and custody model so yours can focus on field operations and command
                    decisions, without trading off chain-of-custody or policy requirements.
                  </p>
                </div>
                <a
                  href={CALENDLY_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[#0b5cab] underline decoration-[#b8c9d9] underline-offset-4 transition hover:decoration-[#0b5cab]"
                >
                  Schedule a security discussion
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d7dde3] bg-white px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="pt-h2 text-xl md:text-2xl">Schedule a briefing</h2>
            <p className="mt-3 text-[16px] text-[#3d4d5c]">
              We will walk through your video environment, signal requirements, and deployment path with your technical and
              command stakeholders.
            </p>
            <a
              href={CALENDLY_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-[#071422] px-8 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#0c2438]"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#071422] px-5 py-14 text-white md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <LogoMark size={32} stroke="#ffffff" />
              <span className="text-[17px] font-semibold tracking-tight">Protent</span>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/65">
              Live video intelligence for public safety agencies. Behavioral and situational signals, natural language search,
              and security controls built for regulated environments.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Platform</p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/70">
              <li>
                <button type="button" onClick={() => scrollToSection('product')} className="transition hover:text-white">
                  Capabilities
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('how')} className="transition hover:text-white">
                  Deployment
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('security')} className="transition hover:text-white">
                  Security
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Company</p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/70">
              <li>
                <a
                  href="https://www.linkedin.com/company/protentai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={CALENDLY_DEMO} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  Book a Demo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-14 max-w-[1200px] border-t border-white/10 pt-8 text-center text-[12px] text-white/45">
          © {new Date().getFullYear()} Protent. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
