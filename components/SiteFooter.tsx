import { Linkedin } from 'lucide-react';
import { CALENDLY_DEMO } from '@/lib/site';
import { LogoMark } from '@/components/LogoMark';

export function SiteFooter({ pathname }: { pathname: string }) {
  const isHome = pathname === '/' || pathname === '';

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sectionLink = (id: string, label: string) =>
    isHome ? (
      <button type="button" onClick={() => scrollToSection(id)} className="transition hover:text-white">
        {label}
      </button>
    ) : (
      <a href={`/#${id}`} className="transition hover:text-white">
        {label}
      </a>
    );

  return (
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
            <li>{sectionLink('product', 'Capabilities')}</li>
            <li>{sectionLink('how', 'Deployment')}</li>
            <li>{sectionLink('security', 'Security')}</li>
          </ul>
        </div>
        <div>
          <p className="font-mono-pt text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Company</p>
          <ul className="mt-4 space-y-3 text-[14px] text-white/65">
            <li>
              <a href="/careers" className="transition hover:text-white">
                Careers
              </a>
            </li>
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
  );
}
