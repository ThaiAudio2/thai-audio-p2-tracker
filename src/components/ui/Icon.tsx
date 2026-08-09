import {
  type LucideIcon,
  type LucideProps,
  HelpCircle,
  CalendarDays,
  MapPin,
  Users,
  Mic,
  Presentation,
  Handshake,
  Sparkles,
  Trophy,
  Rocket,
  Globe,
  Building2,
  Clock,
  Ticket,
  BadgeCheck,
  Network,
  Lightbulb,
  Coffee,
  Wifi,
  Car,
  Plane,
  ShieldCheck,
  Star,
} from 'lucide-react';

/**
 * A curated icon registry. We import only the icons we offer (rather than the
 * full lucide barrel) so the bundle stays small. Icon names are stored as data
 * on event highlights / info cards and resolved here at render time.
 */
const REGISTRY: Record<string, LucideIcon> = {
  CalendarDays,
  MapPin,
  Users,
  Mic,
  Presentation,
  Handshake,
  Sparkles,
  Trophy,
  Rocket,
  Globe,
  Building2,
  Clock,
  Ticket,
  BadgeCheck,
  Network,
  Lightbulb,
  Coffee,
  Wifi,
  Car,
  Plane,
  ShieldCheck,
  Star,
};

interface IconProps extends LucideProps {
  /** A curated Lucide icon name (see ICON_CHOICES). Falls back to HelpCircle. */
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Cmp = REGISTRY[name] ?? HelpCircle;
  return <Cmp {...props} />;
}

/** Names offered in admin selectors — kept in sync with REGISTRY. */
export const ICON_CHOICES = Object.keys(REGISTRY) as (keyof typeof REGISTRY)[];
