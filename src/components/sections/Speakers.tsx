import { useMemo, useState } from 'react';
import { Linkedin, Mic } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Modal } from '@/components/ui/Modal';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/states';
import { useSpeakers } from '@/hooks/publicData';
import { initials } from '@/lib/format';
import type { Speaker } from '@/lib/types';

function Avatar({ speaker, className = '' }: { speaker: Speaker; className?: string }) {
  if (speaker.photoUrl) {
    return (
      <img
        src={speaker.photoUrl}
        alt={speaker.name}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`grid h-full w-full place-items-center bg-ink text-canvas ${className}`}
      aria-hidden
    >
      <span className="font-display text-2xl">{initials(speaker.name)}</span>
    </div>
  );
}

export function Speakers() {
  const { data, loading, error, empty } = useSpeakers();
  const [selected, setSelected] = useState<Speaker | null>(null);

  const speakers = useMemo(
    () => [...data].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order),
    [data],
  );

  return (
    <Section
      id="speakers"
      tone="surface"
      eyebrow="Speakers"
      title="Voices shaping the roadmap"
      intro="Operators, builders, and partners sharing what’s actually working."
    >
      {error && <ErrorState message={`Couldn’t load speakers: ${error}`} />}

      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/5] w-full" />
              <Skeleton className="mt-3 h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-full" />
            </div>
          ))}
        </div>
      )}

      {empty && !error && (
        <EmptyState
          icon={<Mic className="h-5 w-5" />}
          title="Speakers to be announced"
          message="We’re confirming the lineup. Published speakers will appear here automatically."
        />
      )}

      {!loading && speakers.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {speakers.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 60}>
              <button
                onClick={() => setSelected(s)}
                className="group block w-full text-left"
                aria-label={`View ${s.name}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-canvas">
                  <Avatar
                    speaker={s}
                    className="transition-transform duration-500 ease-premium group-hover:scale-[1.03]"
                  />
                  {s.featured && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-canvas/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink backdrop-blur">
                      Keynote
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-[0.95rem] font-semibold text-ink">{s.name}</h3>
                <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-ink-500">
                  {s.title}
                  {s.company ? ` · ${s.company}` : ''}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        size="md"
        title={selected?.name}
        description={
          selected ? [selected.title, selected.company].filter(Boolean).join(' · ') : undefined
        }
      >
        {selected && (
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-card border border-line">
              <Avatar speaker={selected} />
            </div>
            <div className="min-w-0">
              {selected.session && (
                <p className="mb-3 inline-flex items-center rounded-full bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-600">
                  {selected.session}
                </p>
              )}
              <p className="text-sm leading-relaxed text-ink-700">
                {selected.bio || 'Biography coming soon.'}
              </p>
              {selected.linkedin && (
                <a
                  href={selected.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-600"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn profile
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
