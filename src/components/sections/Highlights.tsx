import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Skeleton } from '@/components/ui/states';
import { useEvent } from '@/context/EventContext';

export function Highlights() {
  const { event, loading } = useEvent();
  const highlights = event?.highlights ?? [];

  if (!loading && highlights.length === 0) return null;

  return (
    <Section
      id="highlights"
      eyebrow="Why attend"
      title="A day engineered for outcomes"
      intro="Every session is built around one question — what will move your partnership forward this year?"
    >
      <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface p-6">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="mt-5 h-7 w-20" />
                <Skeleton className="mt-3 h-4 w-full" />
              </div>
            ))
          : highlights.map((h, i) => (
              <Reveal key={h.id} delay={i * 60} className="group bg-surface p-6 transition-colors hover:bg-canvas">
                <div className="grid h-10 w-10 place-items-center rounded-card bg-ink text-canvas transition-transform group-hover:-translate-y-0.5">
                  <Icon name={h.icon} className="h-5 w-5" />
                </div>
                <p className="mt-5 font-display text-2xl text-ink">{h.value}</p>
                <p className="mt-0.5 text-sm font-medium text-ink-800">{h.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{h.description}</p>
              </Reveal>
            ))}
      </div>
    </Section>
  );
}
