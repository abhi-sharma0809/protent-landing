import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Target,
  MessageSquare,
  Activity,
  CheckCircle,
  Lock,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import './globals.css';

/** Override with `VITE_CALENDLY_DEMO_URL` in `.env` if needed */
const CALENDLY_DEMO =
  (import.meta.env.VITE_CALENDLY_DEMO_URL as string | undefined)?.trim() ||
  'https://calendly.com/srihan-protent/demo';

const LogoMark = () => (
  <img src="/logo.png" alt="" className="h-8 w-auto shrink-0 md:h-9" aria-hidden />
);

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <LogoMark />
    <span className="text-lg font-semibold tracking-tight text-slate-900">Protent</span>
  </div>
);

const App = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-900">
      {/* YC bar */}
      <div className="sticky top-0 z-50 flex items-center justify-center gap-2 border-b border-slate-200/80 bg-white py-2.5">
        <a
          href="https://www.ycombinator.com/companies/protent"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <img src="/yc.png" alt="" className="h-5 w-auto" />
          <span>Backed by Y Combinator</span>
        </a>
      </div>

      <header className="sticky top-[41px] z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 rounded-md outline-none ring-slate-900 focus-visible:ring-2"
            aria-label="Protent home"
          >
            <LogoMark />
            <span className="text-lg font-semibold tracking-tight text-slate-900">Protent</span>
          </button>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <button type="button" onClick={() => scrollToSection('product')} className="transition hover:text-slate-900">
              Product
            </button>
            <button type="button" onClick={() => scrollToSection('how')} className="transition hover:text-slate-900">
              How it works
            </button>
            <button type="button" onClick={() => scrollToSection('compare')} className="transition hover:text-slate-900">
              Why Protent
            </button>
            <button type="button" onClick={() => scrollToSection('security')} className="transition hover:text-slate-900">
              Security
            </button>
          </div>
          <a
            href={CALENDLY_DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200/80 bg-white px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium text-slate-500">Real-time video intelligence for public safety</p>
            <h1 className="text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
              Stop drowning in live feeds.
              <span className="mt-2 block text-slate-500">Start acting on what matters.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Protent reads live video for behavioral cues and situational signals first, then lets you search in plain
              language, all on CJIS-ready infrastructure.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={CALENDLY_DEMO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('product')}
                className="w-full rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
              >
                See what we do
              </button>
            </div>
          </div>
        </section>

        {/* Product pillars */}
        <section id="product" className="scroll-mt-32 border-b border-slate-200/80 px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Built for live operations</h2>
              <p className="mt-4 text-lg text-slate-600">
                Three capabilities agencies need when every second counts, without the noise of archived footage or manual
                monitoring.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <Activity className="h-6 w-6 text-slate-700" strokeWidth={1.5} />,
                  title: 'Behavioral analysis & situational signals',
                  desc: 'Surface escalation risk from acoustic and verbal patterns and broader situational context, informed by published NLP research.',
                },
                {
                  icon: <MessageSquare className="h-6 w-6 text-slate-700" strokeWidth={1.5} />,
                  title: 'Natural language search',
                  desc: 'Find people and situations across active streams using plain-language descriptions, with no indexing of historical video.',
                },
                {
                  icon: <Target className="h-6 w-6 text-slate-700" strokeWidth={1.5} />,
                  title: 'Precision detection',
                  desc: 'Identify weapons, vehicles, and evidence in real time with enterprise-grade computer vision.',
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-32 border-b border-slate-200/80 bg-white px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">How it works</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-600">
              From deployment to live insight, designed to fit how your teams already work.
            </p>
            <ol className="mt-14 space-y-12">
              {[
                {
                  step: '01',
                  title: 'We connect to your live video',
                  body: 'Field and fixed cameras tie into Protent in real time, with sub-millisecond latency where it matters for alerting.',
                },
                {
                  step: '02',
                  title: 'Behavioral and situational signals come first',
                  body: 'The system continuously interprets verbal, acoustic, and scene context so supervisors see escalation and risk patterns before they spiral.',
                },
                {
                  step: '03',
                  title: 'Natural language search ties it together',
                  body: 'Describe who or what you need; queries run on live video only, with detection and re-identification across nodes when a match matters.',
                },
              ].map((block) => (
                <li key={block.step} className="flex gap-6 md:gap-10">
                  <span className="font-mono text-sm font-semibold tabular-nums text-slate-400">{block.step}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{block.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{block.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Signals + search */}
        <section className="border-b border-slate-200/80 px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Live operations</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Situational signals first, search when you need it
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Protent doesn’t replace your VMS. It adds an intelligence layer that prioritizes behavioral and situational
                context, then supports natural language search across the same live feeds.
              </p>
            </div>
            <ul className="space-y-5">
              {[
                {
                  title: 'Behavioral & situational analysis',
                  desc: 'Ongoing interpretation of language, tone, and scene dynamics so teams catch escalation early.',
                },
                {
                  title: 'Low-latency streaming analysis',
                  desc: 'Processing tuned for live video so signals and alerts land while they still matter.',
                },
                {
                  title: 'Natural language queries',
                  desc: 'Describe who or what you’re looking for; the engine monitors every active feed for a match.',
                },
                {
                  title: 'Re-identification across cameras',
                  desc: 'Keep visibility as subjects move between live nodes on the deployment.',
                },
              ].map((row) => (
                <li key={row.title} className="flex gap-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.75} />
                  <div>
                    <p className="font-semibold text-slate-900">{row.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{row.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Comparison */}
        <section id="compare" className="scroll-mt-32 border-b border-slate-200/80 bg-slate-900 px-5 py-20 text-white md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">The old way vs. Protent</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-300">
              Most tools weren’t built for simultaneous live feeds and operational tempo.
            </p>
            <div className="mt-14 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <p className="text-sm font-medium uppercase tracking-wide text-slate-400">Typical approach</p>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
                  <li>• Operators manually watch walls of screens or hunt through stored video after the fact.</li>
                  <li>• Keyword or metadata search misses the nuance of “person in red jacket near the exit.”</li>
                  <li>• Siloed feeds make it hard to follow someone across cameras in real time.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-8">
                <p className="text-sm font-medium uppercase tracking-wide text-emerald-400/90">With Protent</p>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-100">
                  <li>• Behavioral and situational signals surface continuously so supervisors aren’t guessing from raw tiles alone.</li>
                  <li>• Natural language search runs on live streams only, with no retrospective indexing required.</li>
                  <li>• Built for agencies that need CJIS-aligned handling of sensitive data.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="scroll-mt-32 px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 rounded-2xl border border-slate-200/90 bg-white p-10 shadow-sm md:grid-cols-2 md:p-12">
              <div>
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  <Lock className="h-6 w-6 text-slate-700" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">CJIS-ready by design</h2>
                <p className="mt-4 leading-relaxed text-slate-600">
                  Security is part of the architecture, not an afterthought. Encryption, access controls, and auditability for
                  the standards public safety teams expect.
                </p>
              </div>
              <div className="flex flex-col justify-center border-t border-slate-200 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
                <div className="flex gap-4 rounded-xl bg-slate-50 p-5">
                  <CheckCircle className="h-6 w-6 shrink-0 text-emerald-600" strokeWidth={1.75} />
                  <p className="text-sm leading-relaxed text-slate-700">
                    We focus on the security stack so your team can focus on the field, without compromising compliance or
                    chain-of-custody expectations.
                  </p>
                </div>
                <a
                  href={CALENDLY_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900"
                >
                  Talk to us about your environment
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-slate-200/80 bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">See Protent on your feeds</h2>
            <p className="mt-3 text-slate-600">
              Book a short call. We’ll walk through situational signals, natural language search, and deployment options.
            </p>
            <a
              href={CALENDLY_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-[#f6f7f9] px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              The intelligence layer that watches alongside your operators, built for public safety and backed by Y Combinator.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Product</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <button type="button" onClick={() => scrollToSection('product')} className="transition hover:text-slate-900">
                  Capabilities
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('how')} className="transition hover:text-slate-900">
                  How it works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('security')} className="transition hover:text-slate-900">
                  Security
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Connect</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <a
                  href="https://www.linkedin.com/company/protentai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-slate-900"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CALENDLY_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-slate-900"
                >
                  Book a Demo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl text-center text-xs text-slate-400">© {new Date().getFullYear()} Protent. All rights reserved.</p>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
