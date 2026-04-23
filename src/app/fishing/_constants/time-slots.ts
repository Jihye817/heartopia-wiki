import {
  Clock,
  Sunrise,
  SunMedium,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";

export interface TimeSlotDef {
  id: string;
  label: string;
  range: string | null;
  Icon: LucideIcon;
  iconColor: string;
}

export const TIME_SLOTS: Record<string, TimeSlotDef> = {
  always: {
    id: "always",
    label: "상시",
    range: null,
    Icon: Clock,
    iconColor: "#5B9A6F",
  },
  dawn: {
    id: "dawn",
    label: "새벽",
    range: "0~6",
    Icon: Sunrise,
    iconColor: "#6B5EC8",
  },
  morning: {
    id: "morning",
    label: "아침",
    range: "6~12",
    Icon: SunMedium,
    iconColor: "#A87820",
  },
  day: {
    id: "day",
    label: "낮",
    range: "12~18",
    Icon: Sun,
    iconColor: "#B8653A",
  },
  night: {
    id: "night",
    label: "밤",
    range: "18~24",
    Icon: Moon,
    iconColor: "#3A5A8C",
  },
};
