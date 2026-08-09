import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  bleading?: 'center' | 'left';
  tone?: 'canvas' | 'ink' | 'surface';
}

const tones = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  ink: 'bg-ink text-canvas',
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  bleading = 'left',
  tone = 'canvas',
}: SectionProps) {
  const centered = bleading === 'center';
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 py-16 sm:py-20 lg:py-28', tones[tone], className)}
    >
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <Reveal
            className={cn('mb-10 sm:mb-14 max-w-2xl', centered && 'mx-auto text-center')}
          >
            {eyebrow && (
              <span className={cn('eyebrow', tone === 'ink' && 'text-canvas/60')}>
                <span
                  className={cn(
                    'h-px w-6',
                    tone === 'ink' ? 'bg-canvas/40' : 'bg-ink-300',
                  )}
                />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                className={cn(
                  'mt-4 text-display-sm sm:text-display-md',
                  tone === 'ink' ? 'text-canvas' : 'text-ink',
                )}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={cn(
                  'mt-4 text-base leading-relaxed sm:text-lg',
                  tone === 'ink' ? 'text-canvas/70' : 'text-ink-500',
                )}
              >
                {intro}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
