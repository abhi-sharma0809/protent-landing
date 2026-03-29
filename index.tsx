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

function UiPanel({
  eyebrow,
  badge,
  children,
}: {
  eyebrow: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-600/50 bg-gradient-to-b from-zinc-800/95 to-[#0c0e11] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/30">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 md:px-5">
        <span className="font-mono-pt text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">{eyebrow}</span>
        {badge ? (
          <span className="rounded-md bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400/95">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

function MockSignalAnalysis() {
  return (
    <UiPanel eyebrow="Signal console" badge="Live ingest">
      <div className="space-y-3">
        <div className="flex gap-2">
          {['N-04', 'E-12', 'S-01'].map((id) => (
            <div
              key={id}
              className="flex-1 rounded-lg bg-zinc-950/80 py-6 text-center font-mono-pt text-[9px] font-medium uppercase tracking-wider text-zinc-600 ring-1 ring-white/[0.06]"
            >
              {id}
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-zinc-950/60 p-3 ring-1 ring-white/[0.05]">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Acoustic / verbal fusion</span>
            <span className="font-mono-pt text-amber-400/90">Elevated</span>
          </div>
          <div className="mt-2 h-8 w-full rounded bg-[#0b5cab]/20">
            <div className="h-full w-[72%] rounded bg-[#0b5cab]/55" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-zinc-950/50 px-3 py-2 font-mono-pt text-[10px] text-zinc-500 ring-1 ring-white/[0.04]">
          <span>Scene context</span>
          <span className="text-zinc-300">Streaming</span>
        </div>
      </div>
    </UiPanel>
  );
}

function MockNlSearch() {
  return (
    <UiPanel eyebrow="Query surface" badge="Active feeds">
      <div className="space-y-3">
        <div className="rounded-lg border border-white/[0.08] bg-zinc-950/70 px-3 py-2.5 font-mono-pt text-[11px] text-zinc-400">
          <span className="text-zinc-600">&gt; </span>gray hoodie, north lot, last 90s
        </div>
        <div className="space-y-2">
          {[
            { cam: 'CAM-218', state: 'Match' },
            { cam: 'CAM-094', state: 'Scan' },
            { cam: 'CAM-441', state: 'Idle' },
          ].map((row) => (
            <div
              key={row.cam}
              className="flex items-center justify-between rounded-lg bg-zinc-950/45 px-3 py-2 ring-1 ring-white/[0.05]"
            >
              <span className="font-mono-pt text-[10px] text-zinc-400">{row.cam}</span>
              <span
                className={`font-mono-pt text-[9px] font-semibold uppercase tracking-wide ${
                  row.state === 'Match' ? 'text-[#5eb0e8]' : row.state === 'Scan' ? 'text-amber-400/80' : 'text-zinc-600'
                }`}
              >
                {row.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </UiPanel>
  );
}

function MockDetection() {
  return (
    <UiPanel eyebrow="Object pipeline" badge="CV">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Vehicle class', v: 'SUV · conf 0.91' },
          { label: 'Evidence-class', v: 'Bag · tracked' },
          { label: 'Weapon cue', v: 'None' },
          { label: 'Re-ID', v: 'Node handoff' },
        ].map((row) => (
          <div key={row.label} className="rounded-lg bg-zinc-950/55 px-2.5 py-2 ring-1 ring-white/[0.05]">
            <p className="font-mono-pt text-[9px] font-medium uppercase tracking-wide text-zinc-600">{row.label}</p>
            <p className="mt-1 text-[11px] font-medium text-zinc-300">{row.v}</p>
          </div>
        ))}
      </div>
    </UiPanel>
  );
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

const App = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#071422]">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 rounded-lg outline-none ring-[#0b5cab] focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="Protent home"
          >
            <LogoMark size={28} stroke={INK} />
            <span className="text-[16px] font-semibold tracking-tight text-[#071422]">Protent</span>
          </button>
          <div className="hidden items-center gap-9 text-[14px] font-medium text-zinc-600 md:flex">
            <button type="button" onClick={() => scrollToSection('product')} className="transition hover:text-[#071422]">
              Platform
            </button>
            <button type="button" onClick={() => scrollToSection('how')} className="transition hover:text-[#071422]">
              Deployment
            </button>
            <button type="button" onClick={() => scrollToSection('compare')} className="transition hover:text-[#071422]">
              Scope
            </button>
            <button type="button" onClick={() => scrollToSection('security')} className="transition hover:text-[#071422]">
              Security
            </button>
          </div>
          <a
            href={CALENDLY_DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#071422] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#0c2438]"
          >
            Book a demo
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </nav>
      </header>

      <main>
        <section className="relative min-h-[88vh] overflow-hidden">
          <HeroBackdrop />
          <div className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-5 py-24 text-center md:px-8">
            <div className="mx-auto max-w-[820px]">
              <p className="font-mono-pt mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                Live video intelligence
              </p>
              <h1 className="pt-h1 text-[2.25rem] leading-[1.12] text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Situational awareness from every feed you operate.
              </h1>
              <p className="mx-auto mt-8 max-w-[540px] text-[17px] leading-relaxed text-white/78 md:text-lg">
                Behavioral and situational analysis on live feeds. Natural language search over active streams. Architecture
                and controls for CJIS-aligned deployments.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={CALENDLY_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-[#071422] shadow-lg shadow-black/15 transition hover:bg-zinc-100"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection('product')}
                  className="text-[14px] font-semibold text-white/85 underline decoration-white/25 underline-offset-[6px] transition hover:decoration-white/50"
                >
                  View platform
                </button>
              </div>
              <div className="mt-14 flex flex-wrap justify-center gap-2.5">
                {[
                  'Live streams only',
                  'Continuous verbal & scene models',
                  'Encryption · access · audit logging',
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-[12px] font-medium text-white/70 backdrop-blur-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="scroll-mt-20 border-b border-zinc-200/90 bg-white py-20 md:py-28">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Platform</p>
            <h2 className="pt-h2 mt-4 max-w-[720px] text-3xl md:text-4xl md:leading-tight">
              One intelligence layer across the feeds your floor already runs.
            </h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-zinc-600">
              Three capabilities for live deployments: signal analysis, natural language search, and detection on the stream.
            </p>

            <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#071422] md:text-2xl">
                    Behavioral & situational analysis
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-zinc-600">
                    Acoustic and verbal patterns plus scene context for escalation risk. Informed by published NLP research.
                  </p>
                </div>
                <MockSignalAnalysis />
              </div>
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="lg:order-2">
                  <h3 className="text-xl font-semibold tracking-tight text-[#071422] md:text-2xl">Natural language search</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-zinc-600">
                    Plain-language descriptions across active feeds. Queries run on live streams only.
                  </p>
                </div>
                <div className="lg:order-1">
                  <MockNlSearch />
                </div>
              </div>
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#071422] md:text-2xl">Precision detection</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-zinc-600">
                    Weapons, vehicles, and evidence-class objects in real time using enterprise computer vision.
                  </p>
                </div>
                <MockDetection />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200/90 bg-zinc-50 py-14 md:py-16">
          <div className="pt-section text-center">
            <p className="mx-auto max-w-3xl text-lg font-medium leading-snug text-[#071422] md:text-xl md:leading-snug">
              Higher camera counts and wall density increase load. Protent surfaces prioritized signals on top of live tiles.
            </p>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 border-b border-zinc-200/90 bg-white py-20 md:py-28">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Deployment</p>
            <h2 className="pt-h2 mt-4 max-w-[640px] text-3xl md:text-4xl md:leading-tight">Bring Protent online in three moves.</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-zinc-600">
              Integrate live feeds, run models continuously, then search and correlate. Steps may overlap where infrastructure
              allows.
            </p>
            <ol className="mt-16 grid list-none gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
              {[
                {
                  step: '01',
                  title: 'Connect live video infrastructure',
                  body: 'Field and fixed cameras integrate with Protent for real-time processing and alerting where latency matters.',
                },
                {
                  step: '02',
                  title: 'Operationalize signals',
                  body: 'Verbal, acoustic, and situational models run continuously on ingested streams; supervisors receive prioritized signals across camera nodes.',
                },
                {
                  step: '03',
                  title: 'Search and correlate on demand',
                  body: 'Natural language queries against live video, with object detection and re-identification across nodes when criteria match.',
                },
              ].map((block) => (
                <li key={block.step} className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-6 shadow-sm md:p-8">
                  <span className="font-mono-pt text-[12px] font-semibold tabular-nums text-[#0b5cab]">{block.step}</span>
                  <h3 className="mt-4 text-lg font-semibold text-[#071422]">{block.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{block.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-zinc-200/90 bg-zinc-50 py-20 md:py-28">
          <div className="pt-section rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-sm md:p-12 lg:grid lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-5">
              <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Operations</p>
              <h2 className="pt-h2 mt-4 text-2xl md:text-3xl">Works with your existing VMS</h2>
              <p className="mt-5 text-[16px] leading-relaxed text-zinc-600">
                Intelligence layer on your existing VMS feeds: behavioral and situational analysis on the same tiles the floor
                watches, plus natural language search over those live streams.
              </p>
            </div>
            <div className="mt-10 overflow-x-auto lg:col-span-7 lg:mt-0">
              <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/50">
                <table className="w-full min-w-[300px] border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-zinc-200/90 bg-zinc-100/80">
                      <th className="px-4 py-3 font-mono-pt text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 md:px-5">
                        Function
                      </th>
                      <th className="px-4 py-3 font-mono-pt text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 md:px-5">
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
                        desc: 'Low-latency processing so alerts reach supervisors during active events.',
                      },
                      {
                        title: 'Natural language queries',
                        desc: 'Each query is evaluated against every active feed.',
                      },
                      {
                        title: 'Re-identification across nodes',
                        desc: 'Track continuity as subjects move between cameras on the deployment.',
                      },
                    ].map((row) => (
                      <tr key={row.title} className="border-b border-zinc-200/80 last:border-b-0">
                        <td className="w-[40%] align-top px-4 py-3.5 font-semibold text-[#071422] md:px-5">{row.title}</td>
                        <td className="align-top px-4 py-3.5 leading-relaxed text-zinc-600 md:px-5">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="compare" className="scroll-mt-20 border-b border-zinc-200/90 bg-white py-20 md:py-28">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Scope</p>
            <h2 className="pt-h2 mt-4 max-w-[640px] text-3xl md:text-4xl md:leading-tight">Built for simultaneous live feeds.</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-zinc-600">
              Continuous live video at scale: many feeds, supervisor workflows, CJIS-sensitive data.
            </p>
            <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50 p-8 md:p-10">
                <p className="font-mono-pt text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Common setup</p>
                <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600">
                  <li>Large walls depend on manual scanning or review of stored recordings in the VMS.</li>
                  <li>Search is often metadata- or keyword-based.</li>
                  <li>Cross-camera follow-up requires switching contexts between player views.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[#071422] bg-[#071422] p-8 text-white shadow-lg shadow-zinc-900/10 md:p-10">
                <p className="font-mono-pt text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">Protent</p>
                <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/88">
                  <li>Behavioral and situational signals on continuous live feeds.</li>
                  <li>Natural language search on active streams; stored video stays in your VMS.</li>
                  <li>CJIS-aligned architecture and controls for law enforcement video and intelligence data.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="scroll-mt-20 border-b border-zinc-200/90 bg-zinc-50 py-20 md:py-28">
          <div className="pt-section">
            <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-sm md:grid md:grid-cols-2">
              <div className="p-10 md:p-14">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b5cab]/10">
                  <Lock className="h-5 w-5 text-[#0b5cab]" strokeWidth={2} />
                </div>
                <h2 className="pt-h2 mt-8 text-2xl md:text-3xl">CJIS-aligned security</h2>
                <p className="mt-5 text-[16px] leading-relaxed text-zinc-600">
                  Encryption, access control, and audit logging are built into the product architecture for public-safety video
                  and intelligence workloads.
                </p>
              </div>
              <div className="flex flex-col justify-center border-t border-zinc-200/90 bg-zinc-50/80 p-10 md:border-l md:border-t-0 md:p-14">
                <p className="text-[16px] leading-relaxed text-zinc-600">
                  Data custody, access policy, and audit requirements are addressed in the product design.
                </p>
                <a
                  href={CALENDLY_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[13px] font-semibold text-[#071422] shadow-sm transition hover:border-zinc-400"
                >
                  Security discussion
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200/90 bg-[#0c0f14] py-16 md:py-24">
          <div className="pt-section text-center">
            <h2 className="pt-h2 text-2xl text-white md:text-3xl">Brief your command and video teams.</h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] text-zinc-400">
              Video topology, signal requirements, and deployment steps with technical and command staff.
            </p>
            <a
              href={CALENDLY_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-[#071422] transition hover:bg-zinc-100"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#071422] px-5 py-16 text-white md:px-8">
        <div className="mx-auto grid max-w-[1180px] gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <LogoMark size={30} stroke="#ffffff" />
              <span className="text-[16px] font-semibold tracking-tight">Protent</span>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/60">
              Live-feed analysis, natural language search on active streams, CJIS-oriented security for public safety agencies.
            </p>
          </div>
          <div>
            <p className="font-mono-pt text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Platform</p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/65">
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
            <p className="font-mono-pt text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Company</p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/65">
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
        <p className="mx-auto mt-16 max-w-[1180px] border-t border-white/10 pt-8 text-center text-[12px] text-white/40">
          © {new Date().getFullYear()} Protent. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
