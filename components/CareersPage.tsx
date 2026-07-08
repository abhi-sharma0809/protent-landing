import { ArrowRight } from 'lucide-react';
import { JobListing } from '@/components/careers/JobListing';
import { FULL_TIME_ROLES, INTERNSHIP_ROLES } from '@/components/careers/roles';
import { CAREERS_EMAIL } from '@/lib/site';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

const VALUES = [
  {
    title: 'Mission that matters',
    body: 'Your work helps operators catch critical incidents as they unfold, with humans always in control of the response.',
  },
  {
    title: 'Real traction, early stage',
    body: 'Paying customers across law enforcement, universities, K-12, and critical infrastructure. Backed by Y Combinator. You shape the company, not just a feature backlog.',
  },
  {
    title: 'Flexible location',
    body: 'On-site or remote, based on what works for you. Direct access to founders, fast decisions, and problems that hit production quickly.',
  },
] as const;

export function CareersPage({ pathname }: { pathname: string }) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#071422]">
      <SiteHeader pathname={pathname} />

      <main>
        <section className="relative overflow-hidden bg-[#071422] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b5cab]/15 via-transparent to-transparent" />
          </div>
          <div className="pt-section relative">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.2em] text-white/75">
              Careers · YC W26
            </p>
            <h1 className="pt-h1 mt-5 max-w-[18ch] text-[2.25rem] leading-[1.14] text-white md:text-[2.75rem] md:leading-[1.1]">
              Build real-time video intelligence for public safety.
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/80 md:text-[17px]">
              Protent uses vision-language models to detect critical incidents across live camera feeds, so law enforcement
              and security teams catch what manual monitoring misses. We are backed by Y Combinator and hiring founding team
              members and interns across engineering and go-to-market.
            </p>
          </div>
        </section>

        <section className="border-b border-zinc-200/90 bg-white py-20 md:py-28">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Why Protent</p>
            <h2 className="pt-h2 mt-5 max-w-xl text-3xl text-[#071422] md:text-4xl">Work on problems operators depend on</h2>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {VALUES.map((value) => (
                <div key={value.title} className="rounded-2xl border border-zinc-200/90 bg-zinc-50/50 p-6 md:p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-[#071422]">{value.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="full-time" className="scroll-mt-24 border-b border-zinc-200/90 bg-[#fafafa] py-20 md:py-28">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Full-time</p>
            <h2 className="pt-h2 mt-5 text-3xl text-[#071422] md:text-4xl">Founding team roles</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-600">
              Founding roles on a Y Combinator-backed team. On-site or remote depending on your preference. Competitive salary
              plus cash and equity bonuses tied to performance.
            </p>
            <div className="mt-12 space-y-4">
              {FULL_TIME_ROLES.map((role) => (
                <JobListing key={role.id} role={role} />
              ))}
            </div>
          </div>
        </section>

        <section id="internships" className="scroll-mt-24 border-b border-zinc-200/90 bg-white py-20 md:py-28">
          <div className="pt-section">
            <p className="font-mono-pt text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Internships</p>
            <h2 className="pt-h2 mt-5 text-3xl text-[#071422] md:text-4xl">Intern with the founding team</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-600">
              Paid internships across engineering and go-to-market. On-site or remote depending on your preference. Strong
              performers are considered for full-time offers.
            </p>
            <div className="mt-12 space-y-4">
              {INTERNSHIP_ROLES.map((role) => (
                <JobListing key={role.id} role={role} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] py-20 md:py-28">
          <div className="pt-section text-center">
            <h2 className="pt-h2 text-2xl text-[#071422] md:text-3xl">Don&apos;t see your role?</h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-zinc-600">
              We&apos;re always interested in meeting exceptional people. Send your resume and a short note about what you want to
              build.
            </p>
            <a
              href={`mailto:${CAREERS_EMAIL}`}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#071422] px-8 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#0c2438]"
            >
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter pathname={pathname} />
    </div>
  );
}
