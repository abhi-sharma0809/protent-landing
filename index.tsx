import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CheckCircle,
  Mail,
  Linkedin,
  Lock,
} from 'lucide-react';
import { BGPattern } from '@/components/ui/bg-pattern';
import { Header } from '@/components/ui/header-3';
import HeroAscii from '@/components/ui/hero-ascii';
import { RulerCarousel } from '@/components/ui/ruler-carousel';


const LogoMark = () => (
  <img src="/logo.png" alt="Protent" className="h-8 w-auto shrink-0 md:h-9" />
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <LogoMark />
    <span className="text-lg font-bold tracking-tight text-white md:text-xl">protent</span>
  </div>
);

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
    <div className="min-h-screen bg-[#06060a] text-white flex flex-col">
      <nav className="flex w-full items-center justify-between border-b border-white/[0.06] bg-[#06060a] px-5 py-4 md:px-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
          className="flex items-center gap-2"
        >
          <LogoMark />
          <span className="text-lg font-bold tracking-tight text-white">protent</span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Back
        </a>
      </nav>
      <main className="flex flex-1 items-center justify-center px-5 py-16 md:px-8">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">Request a demo</h1>
          <p className="mb-8 text-sm text-zinc-400">A founder will get back to you within 30 minutes.</p>
          {status === 'success' && (
            <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              Message sent successfully.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {errorMessage || 'Something went wrong. Please email srihan@protent.ai directly.'}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="agency" className="mb-2 block text-xs font-medium text-zinc-500">
                Agency name
              </label>
              <input
                id="agency"
                type="text"
                required
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                placeholder="Your agency or organization"
              />
            </div>
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium text-zinc-500">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium text-zinc-500">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                placeholder="you@agency.gov"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-xs font-medium text-zinc-500">
                Phone <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-medium text-zinc-500">
                Message <span className="text-zinc-600">(optional, 200 characters)</span>
              </label>
              <textarea
                id="message"
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                placeholder="Anything you'd like to add…"
              />
              <p className="mt-1 text-right text-xs text-zinc-600">{message.length}/200</p>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

const impactStats = [
  { value: 'Real-time', label: 'analysis across active streams' },
  { value: '100%', label: 'focus on live video intelligence' },
  { value: 'CJIS', label: 'compliant deployment options' },
];


const App = () => {
  const [route, setRoute] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash.slice(1) || '/' : '/'
  );
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (route === '/form') {
    return <GetStartedForm />;
  }

  return (
    <div className="min-h-screen bg-[#06060a] text-zinc-100">
      <Header />

      <main>
        <HeroAscii onScrollTo={scrollToSection} />

        {/* Trusted by */}
        <section className="relative isolate border-y border-white/[0.06] bg-[#08080f] overflow-hidden">
          <BGPattern variant="grid" mask="fade-edges" fill="#1c1c28" size={28} />
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="pt-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Trusted by teams who run live operations
            </p>
            <RulerCarousel
              originalItems={[
                { id: 1, title: "Law Enforcement" },
                { id: 2, title: "School Districts" },
                { id: 3, title: "College Campuses" },
                { id: 4, title: "Stadiums" },
                { id: 5, title: "Public Housing" },
              ]}
            />
          </div>
        </section>

        {/* Operations / Platform */}
        <section id="platform" className="scroll-mt-36 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

              {/* Left col — intro */}
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">Operations</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                  Your VMS stays.<br />Protent adds the read.
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-zinc-400 md:text-base">
                  We don't replace your VMS. Protent sits on the same live feeds your operators already watch and adds a read on the situation, early escalation cues, and plain-English search. Your recordings and storage stay in the system you already use.
                </p>
                <div className="mt-10">
                  <a
                    href="#/form"
                    className="box-border inline-flex h-11 w-fit shrink-0 items-center justify-center border border-white bg-white px-8 text-xs font-semibold uppercase leading-[2.75rem] tracking-widest text-zinc-900 [font-feature-settings:normal] transition hover:bg-zinc-200"
                  >
                    Request demo
                  </a>
                </div>
              </div>

              {/* Right col — feature table */}
              <div className="border border-white/20">
                {/* Table header */}
                <div className="grid grid-cols-2 border-b border-white/20 bg-white/[0.03]">
                  <div className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">What it does</div>
                  <div className="border-l border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">In plain terms</div>
                </div>
                {[
                  {
                    what: 'Situation & escalation',
                    plain: 'Ongoing interpretation of tone, behavior, and scene to flag building tension early.',
                  },
                  {
                    what: 'Speed to watch command',
                    plain: 'Alerts land while the situation is still open, not only after it\'s over and you\'re on review.',
                  },
                  {
                    what: 'Plain-language search',
                    plain: 'Every query runs against every live camera that\'s up.',
                  },
                  {
                    what: 'Cross-camera follow-up',
                    plain: 'Follow the same person or vehicle as they move from camera to camera on your site.',
                  },
                ].map((row, i, arr) => (
                  <div
                    key={row.what}
                    className={`grid grid-cols-2${i < arr.length - 1 ? ' border-b border-white/[0.08]' : ''}`}
                  >
                    <div className="px-5 py-5 text-sm font-medium text-white">{row.what}</div>
                    <div className="border-l border-white/[0.08] px-5 py-5 text-sm leading-relaxed text-zinc-400">{row.plain}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Impact stats — grid cells */}
        <section id="impact" className="scroll-mt-36 prep-section-alt border-y border-white/[0.06] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">Our impact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">Built for high-stakes environments</h2>
            <div className="mt-12 border border-white/20 bg-white/[0.08]">
              <div className="grid grid-cols-1 gap-px bg-white/20 sm:grid-cols-3">
                {impactStats.map((s, i) => (
                  <div key={s.label} className="bg-[#0a0a10] px-6 py-10 sm:px-8">
                    <span className="font-mono text-[10px] tabular-nums tracking-widest text-zinc-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="mt-4 text-3xl font-bold tabular-nums tracking-tight text-white md:text-4xl">{s.value}</div>
                    <p className="mt-3 border-t border-white/10 pt-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use cases — 3-column grid */}
        <section id="use-cases" className="border-t border-white/[0.06] bg-[#08080f] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="border border-white/20 bg-white/[0.08]">
              <div className="flex flex-col gap-6 border-b border-white/15 bg-[#08080f] p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Capabilities</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">Use cases & capabilities</h2>
                  <p className="mt-2 max-w-xl text-sm text-zinc-400">How agencies use live video intelligence day to day.</p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('platform')}
                  className="shrink-0 border border-white/20 bg-transparent px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-300 transition hover:border-white/40 hover:text-white"
                >
                  Platform overview →
                </button>
              </div>
              <div className="grid grid-cols-1 gap-px bg-white/20 md:grid-cols-3">
                {[
                  {
                    tag: 'Operations',
                    title: 'Watch floors weren’t built for infinite feeds—they need prioritization.',
                    body: 'Protent helps teams focus on what’s live and what’s escalating, not every tile at once.',
                  },
                  {
                    tag: 'Search',
                    title: 'Natural language turns intent into attention across active cameras.',
                    body: 'Describe a person, object, or scene and monitor matches as streams update.',
                  },
                  {
                    tag: 'Trust',
                    title: 'Security and compliance aren’t an afterthought.',
                    body: 'CJIS-aligned design so sensitive workflows stay within policy.',
                  },
                ].map((card, i) => (
                  <article
                    key={card.title}
                    className="flex min-h-[280px] flex-col bg-[#06060a] p-6 sm:p-8 md:min-h-[300px]"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-500">{card.tag}</span>
                      <span className="font-mono text-[11px] tabular-nums text-zinc-600">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-5 text-base font-semibold leading-snug text-white">{card.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{card.body}</p>
                    <button
                      type="button"
                      onClick={() => scrollToSection('compliance')}
                      className="mt-6 w-fit border-b border-zinc-500 font-mono text-[10px] uppercase tracking-widest text-zinc-400 transition hover:border-white hover:text-white"
                    >
                      Read more
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust / CJIS */}
        <section id="compliance" className="scroll-mt-36 border-t border-white/[0.06] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Lock className="h-7 w-7 text-zinc-300" />
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">CJIS compliant</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
                Security is part of the architecture. Protent supports CJIS-aligned deployments with encryption, access
                controls, and audit logging so agencies can adopt AI on live video responsibly.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <p className="text-sm text-zinc-300">
                  We manage encryption, access controls, and audit logs so you can focus on operations—not reinventing
                  compliance infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer — Prepared-style columns */}
        <footer className="border-t border-white/[0.06] bg-[#040408] px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="max-w-md text-sm leading-relaxed text-zinc-500">
              We are on a mission to help agencies respond with clearer context and safer outcomes.
            </p>
            <a href="mailto:srihan@protent.ai" className="mt-4 inline-block text-sm font-medium text-white hover:underline">
              srihan@protent.ai
            </a>

            <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <Logo />
                <p className="mt-4 max-w-sm text-sm text-zinc-500">AI-powered live video intelligence for public safety.</p>
              </div>
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Platform</h5>
                <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                  <li>
                    <button type="button" className="hover:text-white" onClick={() => scrollToSection('platform')}>
                      Overview
                    </button>
                  </li>
                  <li>
                    <button type="button" className="hover:text-white" onClick={() => scrollToSection('impact')}>
                      Impact
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Connect</h5>
                <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/protentai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="mailto:srihan@protent.ai" className="inline-flex items-center gap-2 hover:text-white">
                      <Mail size={16} /> Email
                    </a>
                  </li>
                  <li>
                    <a href="#/form" className="hover:text-white">
                      Request demo
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-xs text-zinc-600 sm:flex-row sm:justify-between">
              <span>© {new Date().getFullYear()} Protent. All rights reserved.</span>
              <div className="flex gap-6">
                <span className="text-zinc-600">Privacy & terms — contact us for details</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
