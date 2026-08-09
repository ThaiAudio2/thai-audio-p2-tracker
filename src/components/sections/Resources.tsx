import { useMemo } from 'react';
import { ArrowUpRight, FileText, Film, Link2, Presentation, Paperclip } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/states';
import { useResources } from '@/hooks/publicData';
import type { Resource } from '@/lib/types';

const typeMeta: Record<Resource['type'], { icon: typeof FileText; label: string }> = {
  pdf: { icon: FileText, label: 'PDF' },
  slide: { icon: Presentation, label: 'Slides' },
  video: { icon: Film, label: 'Video' },
  link: { icon: Link2, label: 'Link' },
  file: { icon: Paperclip, label: 'File' },
};

export function Resources() {
  const { data, loading, error, empty } = useResources();

  const resources = useMemo(() => [...data].sort((a, b) => a.order - b.order), [data]);

  return (
    <Section
      id="resources"
      tone="surface"
      eyebrow="Resources"
      title="Everything, in one place"
      intro="Briefs, decks, and links — published by the team and available to download."
    >
      {error && <ErrorState message={`Couldn’t load resources: ${error}`} />}

      {loading && (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      )}

      {((empty && !error) || (!loading && resources.length === 0)) && !error && (
        <EmptyState
          icon={<Paperclip className="h-5 w-5" />}
          title="No resources published yet"
          message="Session materials and downloads will appear here once shared."
        />
      )}

      {resources.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {resources.map((r, i) => {
            const meta = typeMeta[r.type] ?? typeMeta.file;
            const Ico = meta.icon;
            return (
              <Reveal key={r.id} delay={(i % 4) * 50}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-card border border-line bg-canvas p-4 transition-all hover:border-ink-300 hover:shadow-card"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-card bg-ink text-canvas">
                    <Ico className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-ink-400">
                        {meta.label}
                      </span>
                    </div>
                    <h3 className="mt-0.5 truncate text-[0.95rem] font-semibold text-ink">
                      {r.title}
                    </h3>
                    {r.description && (
                      <p className="mt-0.5 line-clamp-2 text-sm text-ink-500">{r.description}</p>
                    )}
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </a>
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
