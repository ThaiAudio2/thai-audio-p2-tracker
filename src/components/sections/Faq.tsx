import { useMemo, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/states';
import { useFaqs } from '@/hooks/publicData';
import { cn } from '@/lib/cn';

export function Faq() {
  const { data, loading, error, empty } = useFaqs();
  const [open, setOpen] = useState<string | null>(null);

  const faqs = useMemo(() => [...data].sort((a, b) => a.order - b.order), [data]);

  if (empty && !error) return null;

  return (
    <Section
      id="faq"
      eyebrow="Questions"
      title="Frequently asked"
      intro="Can’t find what you’re looking for? Reach the organizing team via the contact details in the footer."
    >
      <div className="mx-auto max-w-3xl">
        {error && <ErrorState message={`Couldn’t load FAQ: ${error}`} />}

        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        )}

        {!loading && faqs.length === 0 && !error && (
          <EmptyState
            icon={<HelpCircle className="h-5 w-5" />}
            title="No questions published yet"
            message="Answers to common questions will appear here soon."
          />
        )}

        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {faqs.map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id}>
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink/[0.015]"
                  aria-expanded={isOpen}
                >
                  <span className="text-[0.95rem] font-medium text-ink">{f.question}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300 ease-premium',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-premium',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-ink-500">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
