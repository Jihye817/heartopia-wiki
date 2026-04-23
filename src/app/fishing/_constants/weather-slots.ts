import {
  Sun,
  CloudRain,
  CloudSnow,
  Sparkles,
  Clock,
  type LucideIcon,
} from "lucide-react";

export interface WeatherSlotDef {
  id: string;
  label: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export const WEATHER_SLOTS: Record<string, WeatherSlotDef> = {
  always: {
    id: "always",
    label: "상시",
    Icon: Clock,
    iconBg: "#E8F4ED",
    iconColor: "#5B9A6F",
  },
  sunny: {
    id: "sunny",
    label: "맑음",
    Icon: Sun,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  rain: {
    id: "rain",
    label: "비",
    Icon: CloudRain,
    iconBg: "#DBEAFE",
    iconColor: "#3B82F6",
  },
  snow: {
    id: "snow",
    label: "눈",
    Icon: CloudSnow,
    iconBg: "#EFF6FF",
    iconColor: "#60A5FA",
  },
  rainbow: {
    id: "rainbow",
    label: "무지개",
    Icon: Sparkles,
    iconBg: "#F3E8FF",
    iconColor: "#9333EA",
  },
};
