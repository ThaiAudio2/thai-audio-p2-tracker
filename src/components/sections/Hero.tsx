import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { useEvent } from '@/context/EventContext';
import { formatDateRange } from '@/lib/format';
import { Skeleton } from '@/components/ui/states';

function useCountdown(startISO?: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => window.clearInterval(t);
  }, []);
  if (!startISO) return null;
  const target = new Date(`${startISO}T09:00:00`).getTime();
  if (Number.isNaN(target)) return null;
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  return { days, hours };
}

export function Hero() {
  const { event, loading } = useEvent();
  const countdown = useCountdown(event?.startDate);

  return (
    <section id="top" className="relative overflow-hidden bg-canvas pt-28 sm:pt-32 lg:pt-40">
      {/* Restrained backdrop: a single faint grid, no gradients-as-decoration. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(11,11,12,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,12,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      <div className="container-page relative pb-16 sm:pb-20 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-600 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            HOBI Partner Seminar · 2026
          </div>

          {loading ? (
            <div className="mx-auto mt-8 max-w-3xl space-y-4">
              <Skeleton className="mx-auto h-14 w-full max-w-2xl" />
              <Skeleton className="mx-auto h-14 w-3/4" />
            </div>
          ) : (
            <h1
              className="animate-fade-up mt-7 text-display-lg"
              style={{ animationDelay: '80ms' }}
            >
              {event?.heroHeadline || 'Partnership, engineered for what comes next.'}
            </h1>
          )}

          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg"
            style={{ animationDelay: '160ms' }}
          >
            {event?.heroSubcopy ||
              'One day. Every partner in the room. A working agenda for the year ahead — keynotes, deep-dive workshops, and the connections that move the roadmap forward.'}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href="#agenda"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-card bg-ink px-6 text-sm font-medium text-canvas transition-colors hover:bg-ink-800 sm:w-auto"
            >
              View the agenda
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#about"
              className="inline-flex h-12 w-full items-center justify-center rounded-card border border-line bg-surface px-6 text-sm font-medium text-ink transition-colors hover:border-ink-300 sm:w-auto"
            >
              About the seminar
            </a>
          </div>

          {/* Key facts strip */}
          <div
            className="animate-fade-up mx-auto mt-12 grid max-w-2xl grid-cols-1 divide-y divide-line rounded-card border border-line bg-surface/70 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            style={{ animationDelay: '320ms' }}
          >
            <Fact
              icon={<CalendarDays className="h-4 w-4 text-accent" />}
              label="Dates"
              value={formatDateRange(event.startDate, event.endDate) || 'To be announced'}
              loading={loading}
            />
            <Fact
              icon={<MapPin className="h-4 w-4 text-accent" />}
              label="Location"
              value={[event.venueName, event.city].filter(Boolean).join(', ') || 'To be announced'}
              loading={loading}
            />
            <Fact
              icon={<span className="text-accent">◷</span>}
              label={countdown ? 'Starts in' : 'Status'}
              value={countdown ? `${countdown.days}d ${countdown.hours}h` : 'Save the date'}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-4 text-center">
      <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
        {icon}
        {label}
      </span>
      {loading ? (
        <Skeleton className="mt-1 h-4 w-24" />
      ) : (
        <span className="text-sm font-medium text-ink">{value}</span>
      )}
    </div>
  );
}
