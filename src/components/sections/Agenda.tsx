import { useMemo, useState } from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/states';
import { useAgenda } from '@/hooks/publicData';
import { useEvent } from '@/context/EventContext';
import { dayLabel, formatTime } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { AgendaItem } from '@/lib/types';

const trackTone: Record<string, 'neutral' | 'accent' | 'success' | 'warning'> = {
  Keynote: 'accent',
  Panel: 'success',
  Workshop: 'warning',
  Break: 'neutral',
  Networking: 'neutral',
};

function sortAgenda(a: AgendaItem, b: AgendaItem) {
  if (a.day !== b.day) return a.day - b.day;
  if (a.startTime !== b.startTime) return a.startTime.localeCompare(b.startTime);
  return a.order - b.order;
}

export function Agenda() {
  const { data: agenda, loading, error, empty } = useAgenda();
  const { event } = useEvent();
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const days = useMemo(() => {
    const set = new Set(agenda.map((a) => a.day));
    return Array.from(set).sort((a, b) => a - b);
  }, [agenda]);

  const currentDay = activeDay ?? days[0] ?? 1;

  const items = useMemo(
    () => agenda.filter((a) => a.day === currentDay).sort(sortAgenda),
    [agenda, currentDay],
  );

  return (
    <Section
      id="agenda"
      eyebrow="Agenda"
      title="One day, precisely sequenced"
      intro="From opening keynote to closing reception — the full running order."
    >
      {error && agenda.length === 0 && (
        <ErrorState message={`Couldn’t load the agenda: ${error}`} />
      )}

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      )}

      {empty && !loading && !error && (
        <EmptyState
          icon={<Clock className="h-5 w-5" />}
          title="The agenda is being finalized"
          message="Sessions will appear here as soon as they’re published."
        />
      )}

      {!loading && agenda.length > 0 && (
        <>
          {days.length > 1 && (
            <div
              className="scroll-x -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
              role="tablist"
              aria-label="Agenda days"
            >
              {days.map((d) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={d === currentDay}
                  onClick={() => setActiveDay(d)}
                  className={cn(
                    'shrink-0 rounded-card border px-4 py-2.5 text-left transition-colors',
                    d === currentDay
                      ? 'border-ink bg-ink text-canvas'
                      : 'border-line bg-surface text-ink-600 hover:border-ink-300',
                  )}
                >
                  <span className="block text-xs font-semibold uppercase tracking-wide opacity-70">
                    Day {d}
                  </span>
                  <span className="block text-sm font-medium">{dayLabel(event.startDate, d)}</span>
                </button>
              ))}
            </div>
          )}

          <ol className="relative space-y-3 sm:space-y-0 sm:border-l sm:border-line sm:pl-0">
            {items.map((item) => (
              <li
                key={item.id}
                className="group relative sm:grid sm:grid-cols-[128px_1fr] sm:gap-6 sm:pb-3"
              >
                {/* Time — a pill on mobile, a column on desktop */}
                <div className="sm:pt-5 sm:text-right">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 py-1 text-xs font-semibold text-ink-700 sm:mb-0 sm:bg-transparent sm:px-0 sm:text-sm">
                    <Clock className="h-3.5 w-3.5 sm:hidden" />
                    {formatTime(item.startTime)}
                  </div>
                  <div className="hidden text-xs text-ink-400 sm:block">
                    {formatTime(item.endTime)}
                  </div>
                </div>

                {/* Timeline node (desktop only) */}
                <span className="absolute -left-[5px] top-7 hidden h-2.5 w-2.5 rounded-full border-2 border-canvas bg-ink sm:block" />

                <div
                  className={cn(
                    'rounded-card border border-line bg-surface p-4 transition-all sm:mb-3 sm:p-5',
                    'group-hover:border-ink-300 group-hover:shadow-card',
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {item.track && (
                      <Badge tone={trackTone[item.track] ?? 'neutral'}>{item.track}</Badge>
                    )}
                    {item.status === 'live' && <Badge tone="danger">Live now</Badge>}
                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-ink-400">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.description}</p>
                  )}
                  {item.speaker && (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink-600">
                      <User className="h-3.5 w-3.5 text-ink-400" />
                      {item.speaker}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </Section>
  );
}
