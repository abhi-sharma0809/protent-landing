import { ArrowRight } from 'lucide-react';
import { CALENDLY_DEMO } from '@/lib/site';
import { LogoMark } from '@/components/LogoMark';

const NAV_SECTIONS = [
  { id: 'product', label: 'Platform' },
  { id: 'how', label: 'Deployment' },
  { id: 'compare', label: 'Scope' },
  { id: 'security', label: 'Security' },
] as const;

export function SiteHeader({ pathname }: { pathname: string }) {
  const isHome = pathname === '/' || pathname === '';
  const isCareers = pathname === '/careers';

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navClass = (active: boolean) =>
    active
      ? 'text-[#071422]'
      : 'text-zinc-600 transition hover:text-[#071422]';

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
      <nav className="pt-section flex max-w-none items-center justify-between gap-4 py-3.5">
        <a
          href="/"
          className="flex items-center gap-2.5 rounded-lg outline-none ring-[#0b5cab] focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Protent home"
        >
          <LogoMark size={28} className="brightness-0" />
          <span className="text-[16px] font-semibold tracking-tight text-[#071422]">Protent</span>
        </a>
        <div className="hidden items-center gap-9 text-[14px] font-medium md:flex">
          {NAV_SECTIONS.map(({ id, label }) =>
            isHome ? (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`${navClass(false)} bg-transparent`}
              >
                {label}
              </button>
            ) : (
              <a key={id} href={`/#${id}`} className={navClass(false)}>
                {label}
              </a>
            ),
          )}
          <a href="/careers" className={navClass(isCareers)} aria-current={isCareers ? 'page' : undefined}>
            Careers
          </a>
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
  );
}
