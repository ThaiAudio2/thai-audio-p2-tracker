import { useMemo } from 'react';
import { Bell, Pin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/states';
import { useAnnouncements } from '@/hooks/publicData';
import { timeAgo } from '@/lib/format';
import type { Announcement } from '@/lib/types';

const levelTone: Record<Announcement['level'], 'neutral' | 'accent' | 'success' | 'warning' | 'danger'> = {
  info: 'accent',
  success: 'success',
  warning: 'warning',
  critical: 'danger',
};

export function Announcements() {
  const { data, loading, error, empty } = useAnnouncements();

  const announcements = useMemo(() => {
    const now = Date.now();
    return [...data]
      .filter((a) => !a.publishAt || new Date(a.publishAt).getTime() <= now)
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
        const at = a.createdAt?.toMillis() ?? 0;
        const bt = b.createdAt?.toMillis() ?? 0;
        return bt - at;
      });
  }, [data]);

  if (empty && !error) return null; // Hide the section entirely when there's nothing to say.

  return (
    <Section
      id="announcements"
      eyebrow="Latest updates"
      title="Announcements"
      intro="Live updates from the organizing team — the moment they’re posted, they appear here."
    >
      {error && <ErrorState message={`Couldn’t load announcements: ${error}`} />}

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      )}

      {!loading && announcements.length === 0 && !error && (
        <EmptyState
          icon={<Bell className="h-5 w-5" />}
          title="No announcements yet"
          message="When the team shares an update, it will show up here in real time."
        />
      )}

      <div className="grid gap-3">
        {announcements.map((a, i) => (
          <Reveal
            key={a.id}
            delay={(i % 4) * 50}
            className="rounded-card border border-line bg-surface p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              {a.pinned && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                  <Pin className="h-3.5 w-3.5" /> Pinned
                </span>
              )}
              <Badge tone={levelTone[a.level]}>{a.level}</Badge>
              <span className="text-xs text-ink-400">{timeAgo(a.createdAt)}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-ink">{a.title}</h3>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-ink-600">
              {a.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
