import { agendaService } from '@/services/agendaService';
import { speakerService } from '@/services/speakerService';
import { announcementService } from '@/services/announcementService';
import { faqService } from '@/services/faqService';
import { resourceService } from '@/services/resourceService';
import {
  seedAgenda,
  seedAnnouncements,
  seedFaqs,
  seedResources,
  seedSpeakers,
} from '@/data/seed';
import { useRealtimeCollection } from './useRealtime';
import type { AgendaItem, Announcement, Faq, Resource, Speaker } from '@/lib/types';

/**
 * Public data hooks — thin bindings between the collection services and the
 * real-time-with-fallback hook. Sections consume these and never touch Firebase.
 */
export const useAgenda = () =>
  useRealtimeCollection<AgendaItem>(agendaService.subscribe, seedAgenda);

export const useSpeakers = () =>
  useRealtimeCollection<Speaker>(speakerService.subscribe, seedSpeakers);

export const useAnnouncements = () =>
  useRealtimeCollection<Announcement>(announcementService.subscribe, seedAnnouncements);

export const useFaqs = () => useRealtimeCollection<Faq>(faqService.subscribe, seedFaqs);

export const useResources = () =>
  useRealtimeCollection<Resource>(resourceService.subscribe, seedResources);
