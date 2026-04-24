import {
  Baby,
  Brush,
  Droplets,
  Gem,
  HandHeart,
  HeartHandshake,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Baby,
  Brush,
  Droplets,
  Gem,
  HandHeart,
  HeartHandshake,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
};

export const getLucideIcon = (name: string, fallback: LucideIcon): LucideIcon =>
  iconMap[name] ?? fallback;
