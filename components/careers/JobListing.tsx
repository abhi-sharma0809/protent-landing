import { useState } from 'react';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { CAREERS_EMAIL } from '@/lib/site';
import type { JobRole } from '@/components/careers/roles';

function applyHref(title: string, employmentType: JobRole['employmentType']) {
  const label = employmentType === 'internship' ? `${title} (Internship)` : title;
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${label}`)}`;
}

function RoleSectionBlock({ section }: { section: JobRole['sections'][number] }) {
  return (
    <div>
      <h4 className="text-[15px] font-semibold tracking-tight text-[#071422]">{section.heading}</h4>
      {section.body ? <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{section.body}</p> : null}
      {section.items ? (
        <ul className="mt-3 space-y-2.5">
          {section.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-zinc-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b5cab]/70" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function JobListing({ role }: { role: JobRole }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `role-panel-${role.id}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm">
      <div className="p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-xl font-semibold tracking-tight text-[#071422]">{role.title}</h3>
              <span className="rounded-md bg-[#0b5cab]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0b5cab]">
                {role.team}
              </span>
              <span className="rounded-md bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
                {role.employmentType === 'full-time' ? 'Full-time' : 'Internship'}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[14px] text-zinc-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {role.location}
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-600">{role.summary}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3 lg:flex-col lg:items-stretch">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-[14px] font-semibold text-[#071422] transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              {expanded ? 'Hide details' : 'View role'}
              <ChevronDown className={`h-4 w-4 transition ${expanded ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            <a
              href={applyHref(role.title, role.employmentType)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#071422] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#0c2438]"
            >
              Apply
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {expanded ? (
        <div id={panelId} className="border-t border-zinc-200/90 bg-zinc-50/60 px-6 py-8 md:px-7">
          <div className="space-y-8">
            {role.sections.map((section) => (
              <RoleSectionBlock key={section.heading} section={section} />
            ))}
          </div>
          <a
            href={applyHref(role.title, role.employmentType)}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#071422] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#0c2438]"
          >
            Apply for this role
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      ) : null}
    </article>
  );
}
