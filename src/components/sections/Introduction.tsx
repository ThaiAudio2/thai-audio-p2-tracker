import { ArrowUpRight, Check } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { useEvent } from '@/context/EventContext';

export function Introduction() {
  const { event } = useEvent();

  return (
    <Section id="about" tone="surface">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-ink-300" />
            The seminar
          </span>
          <h2 className="mt-4 text-display-sm sm:text-display-md">{event.introTitle}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
            {event.introBody}
          </p>
          {event.contactEmail && (
            <a
              href={`mailto:${event.contactEmail}?subject=HOBI%20Partner%20Seminar%202026`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-600"
            >
              Request an invitation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-card border border-line bg-canvas p-6 sm:p-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              What we’ll accomplish
            </h3>
            <ul className="mt-5 space-y-4">
              {event.objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-canvas">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-ink-700">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
