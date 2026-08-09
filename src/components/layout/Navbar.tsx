import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useEvent } from '@/context/EventContext';
import { Logo } from './Logo';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#resources', label: 'Resources' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const { event } = useEvent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const contactHref = event.contactEmail
    ? `mailto:${event.contactEmail}?subject=HOBI%20Partner%20Seminar%202026`
    : '#faq';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-premium',
        scrolled
          ? 'border-b border-line bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label="HOBI Partner Seminar 2026">
          <Logo className="h-7 w-7" />
          <span className="text-[0.95rem] font-semibold tracking-tight text-ink">
            HOBI<span className="text-ink-400"> / Partner Seminar</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink-600 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={contactHref}
            className="inline-flex h-10 items-center rounded-card bg-ink px-4 text-sm font-medium text-canvas transition-colors hover:bg-ink-800"
          >
            Get in touch
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-card text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          'lg:hidden overflow-hidden border-t border-line bg-canvas transition-[max-height,opacity] duration-300 ease-premium',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 invisible',
        )}
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-card px-3 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-ink/[0.04]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={contactHref}
              onClick={() => setOpen(false)}
              className="block rounded-card bg-ink px-3 py-3.5 text-center text-base font-medium text-canvas"
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
