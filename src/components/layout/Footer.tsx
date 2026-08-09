import { Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { useEvent } from '@/context/EventContext';
import { formatDateRange } from '@/lib/format';

export function Footer() {
  const { event } = useEvent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-canvas">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" inverted />
              <span className="text-base font-semibold">HOBI Partner Seminar</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-canvas/60">
              {event.tagline}
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-canvas/70">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              {event.venueName}
              {event.city ? `, ${event.city}` : ''} · {formatDateRange(event.startDate, event.endDate)}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-canvas/50">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
              <li><a href="#about" className="transition-colors hover:text-canvas">About</a></li>
              <li><a href="#agenda" className="transition-colors hover:text-canvas">Agenda</a></li>
              <li><a href="#speakers" className="transition-colors hover:text-canvas">Speakers</a></li>
              <li><a href="#resources" className="transition-colors hover:text-canvas">Resources</a></li>
              <li><a href="#faq" className="transition-colors hover:text-canvas">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-canvas/50">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
              {event.contactEmail && (
                <li>
                  <a
                    href={`mailto:${event.contactEmail}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-canvas"
                  >
                    <Mail className="h-4 w-4 text-accent" />
                    {event.contactEmail}
                  </a>
                </li>
              )}
              <li className="text-canvas/60">
                {event.venueAddress}
                {event.country ? `, ${event.country}` : ''}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-canvas/10 pt-6 text-xs text-canvas/50 sm:flex-row sm:items-center">
          <p>© {year} HOBI Partner Seminar. All rights reserved.</p>
          <p>Real-time seminar information, synchronized via Firebase.</p>
        </div>
      </div>
    </footer>
  );
}
