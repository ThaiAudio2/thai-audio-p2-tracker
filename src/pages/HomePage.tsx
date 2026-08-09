import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConfigBanner } from '@/components/layout/ConfigBanner';
import { Hero } from '@/components/sections/Hero';
import { Introduction } from '@/components/sections/Introduction';
import { EventInfo } from '@/components/sections/EventInfo';
import { Highlights } from '@/components/sections/Highlights';
import { Agenda } from '@/components/sections/Agenda';
import { Speakers } from '@/components/sections/Speakers';
import { ImportantInfo } from '@/components/sections/ImportantInfo';
import { Announcements } from '@/components/sections/Announcements';
import { Resources } from '@/components/sections/Resources';
import { Faq } from '@/components/sections/Faq';
import { useEvent } from '@/context/EventContext';

export default function HomePage() {
  const { event } = useEvent();

  // Keep the document title in sync with the live event name.
  useEffect(() => {
    document.title = event.name ? `${event.name}` : 'HOBI Partner Seminar 2026';
  }, [event.name]);

  return (
    <div className="flex min-h-screen flex-col">
      <ConfigBanner />
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <EventInfo />
        <Highlights />
        <Agenda />
        <Speakers />
        <ImportantInfo />
        <Announcements />
        <Resources />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
