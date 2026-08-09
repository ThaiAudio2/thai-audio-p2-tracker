import { CalendarDays, Clock, Globe2, MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Skeleton } from '@/components/ui/states';
import { useEvent } from '@/context/EventContext';
import { formatDateRange } from '@/lib/format';

export function EventInfo() {
  const { event, loading } = useEvent();

  const rows = [
    {
      icon: CalendarDays,
      label: 'When',
      value: event ? formatDateRange(event.startDate, event.endDate) : '',
    },
    {
      icon: MapPin,
      label: 'Where',
      value: event ? [event.venueName, event.venueAddress].filter(Boolean).join(' · ') : '',
    },
    {
      icon: Globe2,
      label: 'City',
      value: event ? [event.city, event.country].filter(Boolean).join(', ') : '',
    },
    { icon: Clock, label: 'Timezone', value: event?.timezone ?? '' },
  ];

  return (
    <Section id="event">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-ink-300" />
            The event
          </span>
          <h2 className="mt-4 text-display-sm sm:text-display-md">
            {event?.name || 'HOBI Partner Seminar 2026'}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
            {event?.tagline ||
              'A focused, invitation-driven gathering for HOBI’s partner network — where strategy, product, and the people behind them meet for a single high-signal day.'}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-canvas">
            {rows.map(({ icon: Ico, label, value }) => (
              <div key={label} className="flex items-center gap-4 px-5 py-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-card bg-ink/[0.04] text-ink-700">
                  <Ico className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                    {label}
                  </dt>
                  {loading ? (
                    <Skeleton className="mt-1 h-4 w-40" />
                  ) : (
                    <dd className="mt-0.5 truncate text-[0.95rem] font-medium text-ink">
                      {value || '—'}
                    </dd>
                  )}
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
