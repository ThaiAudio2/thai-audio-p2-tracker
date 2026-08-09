import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Skeleton } from '@/components/ui/states';
import { useEvent } from '@/context/EventContext';

export function ImportantInfo() {
  const { event, loading } = useEvent();
  const items = event?.importantInfo ?? [];

  if (!loading && items.length === 0) return null;

  return (
    <Section
      id="info"
      eyebrow="Before you arrive"
      title="Important information"
      intro="Everything you need to plan your day — travel, access, and on-site logistics."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-card border border-line bg-surface p-6">
                <Skeleton className="h-9 w-9 rounded-card" />
                <Skeleton className="mt-4 h-4 w-1/2" />
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-4/5" />
              </div>
            ))
          : items.map((item, i) => (
              <Reveal
                key={item.id}
                delay={(i % 3) * 60}
                className="rounded-card border border-line bg-surface p-6 transition-colors hover:border-ink-300"
              >
                <div className="grid h-10 w-10 place-items-center rounded-card bg-accent-50 text-accent-600">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.body}</p>
              </Reveal>
            ))}
      </div>
    </Section>
  );
}
