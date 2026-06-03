import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Lock, Linkedin, ArrowRight } from 'lucide-react';
import { RulerCarousel } from '@/components/ui/ruler-carousel';
import './globals.css';

const CALENDLY_DEMO =
  (import.meta.env.VITE_CALENDLY_DEMO_URL as string | undefined)?.trim() ||
  'https://calendly.com/srihan-protent/demo';

const HERO_DEMO_VIDEO = '/webdemo.mov';

const TRUSTED_ITEMS = [
  { id: 1, title: 'Law Enforcement' },
  { id: 2, title: 'School Districts' },
  { id: 3, title: 'College Campuses' },
  { id: 4, title: 'Stadiums' },
  { id: 5, title: 'Public Housing' },
  { id: 6, title: 'Critical Infrastructure' },
];

function HeroWebDemo() {
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
  }, []);

  return (
    <div className="w-full min-w-0">
      <div className="w-full border border-white leading-none">
        <video
          ref={ref}
          className="block h-auto w-full max-h-[min(82vh,920px)] motion-reduce:hidden"
          src={HERO_DEMO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Screen recording of the Protent product"
        />
        <div className="hidden max-w-[min(100vw-3rem,560px)] flex-col items-center justify-center px-6 py-8 text-center text-[13px] leading-normal text-white/90 motion-reduce:flex">
          Demo video is hidden when reduced motion is enabled.
        </div>
      </div>
    </div>
  );
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

function MockActivityAlerts() {
  return (
    <UiPanel eyebrow="Alert queue" badge="Live feeds">
      <div className="space-y-2">
        {[
          { cam: 'CAM-104', activity: 'Physical altercation', time: 'Just now', urgent: true },
          { cam: 'CAM-212', activity: 'Unauthorized entry', time: '12s ago', urgent: true },
          { cam: 'LOT-A', activity: 'Vehicle in restricted zone', time: '41s ago', urgent: false },
        ].map((row) => (
          <div
            key={row.cam}
            className="flex items-start justify-between gap-3 rounded-lg bg-zinc-950/55 px-3 py-2.5 ring-1 ring-white/[0.05]"
          >
            <div className="min-w-0">
              <p className="font-mono-pt text-[10px] text-zinc-500">{row.cam}</p>
              <p className="mt-0.5 text-[11px] font-medium text-zinc-200">{row.activity}</p>
            </div>
            <span
              className={`shrink-0 font-mono-pt text-[9px] font-semibold uppercase tracking-wide ${
                row.urgent ? 'text-amber-400/90' : 'text-zinc-600'
              }`}
            >
              {row.time}
            </span>
          </div>
        ))}
        <div className="rounded-lg bg-zinc-950/45 px-3 py-2 font-mono-pt text-[10px] text-zinc-500 ring-1 ring-white/[0.04]">
          Operator verifies before dispatch · No auto-response
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
    <UiPanel eyebrow="Activity detection" badge="Configured rules">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Weapon visible', v: 'Detected · CAM-218' },
          { label: 'Vehicle type', v: 'SUV · restricted lot' },
          { label: 'Crowd density', v: 'Above threshold' },
          { label: 'Perimeter breach', v: 'Fence line · east' },
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

const LogoMark = ({ size = 32, className = '' }: { size?: number; className?: string }) => (
  <img
    src="/logo.png"
    alt=""
    width={size}
    height={size}
    className={`shrink-0 object-contain ${className}`}
    aria-hidden
  />
);

const App = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#071422]">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
        <nav className="pt-section flex max-w-none items-center justify-between gap-4 py-3.5">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 rounded-lg outline-none ring-[#0b5cab] focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="Protent home"
          >
            <LogoMark size={28} className="brightness-0" />
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
            Book a free demo
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </nav>
      </header>

      <main>
        <section className="relative min-h-[88vh] overflow-hidden bg-[#071422]">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b5cab]/15 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[#071422]/80" />
          </div>
          <div className="relative z-10 flex min-h-[88vh] w-full items-center py-20 md:py-24 lg:py-28">
            <div className="pt-section-hero w-full">
              <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 lg:items-center xl:gap-16">
                <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center text-center lg:col-span-6 lg:mx-0 lg:max-w-none lg:items-start lg:self-center lg:pr-6 lg:text-left xl:pr-10">
                  <p className="font-mono-pt mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75">
                    Real-time video awareness
                  </p>
                  <h1 className="pt-h1 text-[2.25rem] leading-[1.14] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] md:text-[2.75rem] md:leading-[1.1] lg:text-[2.875rem] lg:leading-[1.07]">
                    Catch critical incidents as they unfold.
                  </h1>
                  <p className="mt-6 max-w-[52ch] text-[16px] font-normal leading-[1.65] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] md:mt-7 md:max-w-[60ch] md:text-[17px] md:leading-relaxed lg:max-w-none">
                    Your camera count keeps growing, but your team can only watch so many screens. Protent monitors every live feed,
                    flags the activity you care about, and lets operators search across cameras in plain language. Your people stay
                    in control of every decision.
                  </p>
                  <div className="mt-9 flex w-full max-w-lg flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10 lg:max-w-none lg:justify-start">
                    <a
                      href={CALENDLY_DEMO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-[#071422] shadow-lg shadow-black/15 transition hover:bg-zinc-100"
                    >
                      Book a free demo
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                    <button
                      type="button"
                      onClick={() => scrollToSection('product')}
                      className="text-[14px] font-semibold text-white underline decoration-white/35 underline-offset-[6px] transition hover:decoration-white/60"
                    >
                      See how it works
                    </button>
                  </div>
                  <div className="mt-10 flex w-full max-w-2xl flex-wrap justify-center gap-2 md:mt-11 lg:max-w-none lg:justify-start">
                    {[
                      'Activity-based alerts',
                      'Live cameras only',
                      'Human verification · no auto-dispatch',
                    ].map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-white/25 bg-white/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="min-w-0 lg:col-span-6">
                  <HeroWebDemo />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200/90 bg-[#fafafa] py-20 md:py-28 overflow-hidden">
          <div className="pt-section">
            <div className="text-center mb-12">
              <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                Who we serve
              </p>
              <h2 className="pt-h2 mt-4 text-2xl font-semibold text-[#071422] md:text-3xl">
                Trusted by teams who run on live operations
              </h2>
            </div>
            <RulerCarousel originalItems={TRUSTED_ITEMS} />
          </div>
        </section>

        <section id="product" className="scroll-mt-20 border-b border-zinc-200/90 bg-white py-24 md:py-32">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Platform</p>
            <h2 className="pt-h2 mt-5 max-w-[720px] text-3xl text-[#071422] md:text-4xl md:leading-tight">
              More cameras than eyes. Alerts when activity shows up.
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-zinc-600">
              You keep the feeds you already run. Protent watches them for the activity you care about, like fights, perimeter
              breaches, weapons, or vehicles in restricted areas, then sends verified alerts to watch command. Search live feeds in
              plain English when you need to narrow the picture.
            </p>

            <div className="mt-24 space-y-28 md:mt-32 md:space-y-36">
              <div className="grid items-start gap-14 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
                <div className="min-w-0 pr-0 lg:pr-4">
                  <h3 className="text-xl font-semibold tracking-tight text-[#071422] md:text-2xl">
                    Alerts when configured activity appears
                  </h3>
                  <p className="mt-5 text-[16px] leading-relaxed text-zinc-600">
                    Your agency decides what Protent looks for: physical altercations, unauthorized entry, fire or smoke, vehicles
                    where they shouldn’t be. When that activity shows up in a feed, an alert lands on the live wall with camera
                    context so operators can verify and respond. Detection informs, your team decides.
                  </p>
                </div>
                <div className="min-w-0 lg:pl-2">
                  <MockActivityAlerts />
                </div>
              </div>
              <div className="grid items-start gap-14 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
                <div className="min-w-0 lg:order-2 lg:pl-4">
                  <h3 className="text-xl font-semibold tracking-tight text-[#071422] md:text-2xl">Search in plain language</h3>
                  <p className="mt-5 text-[16px] leading-relaxed text-zinc-600">
                    When you need to narrow the picture fast, describe a person, vehicle, or scene the way you’d say it over the
                    radio. Protent checks every live feed that’s up. No separate archive to build.
                  </p>
                </div>
                <div className="min-w-0 lg:order-1 lg:pr-2">
                  <MockNlSearch />
                </div>
              </div>
              <div className="grid items-start gap-14 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
                <div className="min-w-0 lg:pr-4">
                  <h3 className="text-xl font-semibold tracking-tight text-[#071422] md:text-2xl">Defined activity, not prediction</h3>
                  <p className="mt-5 text-[16px] leading-relaxed text-zinc-600">
                    Protent evaluates what is actually visible in the video as it happens. It does not score risk, forecast
                    behavior, or guess what someone might do next. Alerts reflect what is in the frame right now, like a visible
                    weapon, crowd conditions, or a perimeter event, not guesses about intent.
                  </p>
                </div>
                <div className="min-w-0 lg:pl-2">
                  <MockDetection />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200/90 bg-zinc-50 py-14 md:py-16">
          <div className="pt-section text-center">
            <p className="mx-auto max-w-3xl text-lg font-medium leading-snug text-[#071422] md:text-xl md:leading-snug">
              Most video only gets watched after something has already gone wrong. Protent puts eyes on your live feeds so your
              team can act while the situation is still open.
            </p>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 border-b border-zinc-200/90 bg-white py-20 md:py-28">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Deployment</p>
            <h2 className="pt-h2 mt-4 max-w-[640px] text-3xl text-[#071422] md:text-4xl md:leading-tight">
              Roll it out in three steps.
            </h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-zinc-600">
              Connect your cameras, configure which activity types trigger alerts, then use plain-language search when you need to
              follow a person or vehicle across feeds. Your tech unit can run analysis in parallel if the network allows it.
            </p>
            <ol className="mt-16 grid list-none gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
              {[
                {
                  step: '01',
                  title: 'Connect your video',
                  body: 'Same live picture your VMS already gets: field cams, fixed cams, low delay where seconds matter.',
                },
                {
                  step: '02',
                  title: 'Configure activity detection',
                  body: 'Choose which cameras and activity types generate alerts. Operators verify events before anything reaches the field.',
                },
                {
                  step: '03',
                  title: 'Search when you need it',
                  body: 'Describe a person, vehicle, or scene in plain English across live feeds. Follow matches across cameras on your site.',
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
              <h2 className="pt-h2 mt-4 text-2xl text-[#071422] md:text-3xl">Your VMS stays. Protent adds live awareness.</h2>
              <p className="mt-5 text-[16px] leading-relaxed text-zinc-600">
                We don’t replace your VMS. Protent sits on the same live feeds your operators already watch and adds activity
                alerts, plain-English search, and cross-camera follow-up. Your recordings and storage stay in the system you
                already use.
              </p>
            </div>
            <div className="mt-10 overflow-x-auto lg:col-span-7 lg:mt-0">
              <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/50">
                <table className="w-full min-w-[300px] border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-zinc-200/90 bg-zinc-100/80">
                      <th className="px-4 py-3 font-mono-pt text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 md:px-5">
                        What it does
                      </th>
                      <th className="px-4 py-3 font-mono-pt text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 md:px-5">
                        In plain terms
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: 'Activity detection',
                        desc: 'The activity types you configure, like altercations, breaches, weapons, and vehicles, surfaced as alerts on live feeds.',
                      },
                      {
                        title: 'Speed to watch command',
                        desc: 'Alerts arrive while events are still unfolding, not only after playback and review.',
                      },
                      {
                        title: 'Plain-language search',
                        desc: 'Every query runs against every live camera that’s up.',
                      },
                      {
                        title: 'Cross-camera follow-up',
                        desc: 'Follow the same person or vehicle as they move from camera to camera on your site.',
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
            <h2 className="pt-h2 mt-4 max-w-[640px] text-3xl text-[#071422] md:text-4xl md:leading-tight">
              Built for agencies with more cameras than eyes.
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 text-[17px] leading-relaxed text-zinc-600">
              <p>
                You can’t watch every screen at once. Protent keeps eyes on every feed and flags the activity you care about, so
                operators can verify and act quickly.
              </p>
              <p>
                Protent does not generate risk scores, behavioral predictions, or forecasts about what people might do. It detects
                observable activity in video and routes alerts to trained personnel who make every operational decision.
              </p>
              <p>
                Video and alerts use law enforcement grade security: encryption, strict access, and a paper trail of who looked at
                what. That helps your agency and your tech reviewers stand behind it.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50 p-8 md:p-10">
                <p className="font-mono-pt text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Without Protent</p>
                <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600">
                  <li>You often find out something went wrong from a call, a victim, or hours of playback, not from the live wall.</li>
                  <li>Critical activity is missed because no one was watching that camera at that moment.</li>
                  <li>Search is tags and codes, not “gray hoodie heading toward the north lot.”</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[#071422] bg-[#071422] p-8 text-white shadow-lg shadow-zinc-900/10 md:p-10">
                <p className="font-mono-pt text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">With Protent</p>
                <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/88">
                  <li>
                    Configured activity triggers alerts on the live wall. Operators verify before anything reaches the field.
                  </li>
                  <li>Ask in plain English; answers come from live cameras. Your stored video stays in your VMS.</li>
                  <li>No risk scoring or behavioral prediction. Detection informs the response, your team makes the call.</li>
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
                <h2 className="pt-h2 mt-8 text-2xl text-[#071422] md:text-3xl">Security your chain of command can live with</h2>
                <p className="mt-5 text-[16px] leading-relaxed text-zinc-600">
                  Data is encrypted in motion and at rest. Access is role-based. Who viewed what gets logged on the same platform
                  your team uses day to day. Activity detection stays within the boundaries your agency sets: your feeds, your
                  rules, your operators in control.
                </p>
              </div>
              <div className="flex flex-col justify-center border-t border-zinc-200/90 bg-zinc-50/80 p-10 md:border-l md:border-t-0 md:p-14">
                <p className="text-[16px] leading-relaxed text-zinc-600">
                  When IT and legal ask how footage is protected and who accessed it, you show them the controls and the audit trail
                  in the running product.
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
            <h2 className="pt-h2 text-2xl text-white md:text-3xl">See it on your own cameras.</h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] text-zinc-400">
              Bring your own feeds. We’ll show activity alerts, plain-language search, and live detection on video that looks like
              what you already run. If it fits, you’ll know in one session.
            </p>
            <a
              href={CALENDLY_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-[#071422] transition hover:bg-zinc-100"
            >
              Book a free demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#071422] py-16 text-white">
        <div className="pt-section grid max-w-none gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <LogoMark size={30} />
              <span className="text-[16px] font-semibold tracking-tight">Protent</span>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/60">
              Real-time activity alerts and plain-language search across live camera feeds. For law enforcement and security teams.
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
                  Book a free demo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="pt-section mt-16 max-w-none border-t border-white/10 pt-8 text-center text-[12px] text-white/40">
          © {new Date().getFullYear()} Protent. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
