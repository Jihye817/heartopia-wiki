import type { Metadata } from "next";
import { GardeningClient } from "./Client";

export const metadata: Metadata = {
  title: "원예",
  description:
    "꽃 교배와 작물 재배 정보를 확인할 수 있어요. 꽃 도감, 작물 도감, 교배·재배 팁을 한눈에 보세요.",
  alternates: { canonical: "/gardening" },
};

// ─────────────────────────────────────────────
// Data (Server: local static data)
// ─────────────────────────────────────────────
const SUBCATEGORIES = [
  {
    href: "/gardening/flowers",
    emoji: "🌸",
    tag: {
      label: "꽃 도감",
      style: "bg-rose-50 text-rose-600 border-rose-200",
    },
    title: "꽃 도감",
    desc: "다양한 꽃을 교배해 새로운 색상의 꽃을 얻을 수 있어요. 데이지, 팬지, 칼라 등 다양한 꽃의 정보를 확인하세요.",
    meta: ["🌼 10종", "⭐ 성급", "🌸 교배"],
    metaStyle: "bg-pink-50 text-pink-600 border-pink-200",
    ctaStyle: "text-pink-500",
    color: "#f8a4c8",
    bg: "var(--wiki-cat-garden-bg)",
    border: "var(--wiki-cat-garden-border)",
    accent: "#e8739b",
  },
  {
    href: "/gardening/crops",
    emoji: "🌾",
    tag: {
      label: "작물 도감",
      style: "bg-[#eef9f4] text-emerald-800 border-[#b3e5cc]",
    },
    title: "작물 도감",
    desc: "작물을 심고 재배하는 방법과 정보를 확인할 수 있어요. 수확 기간, 판매 가격, 재배 팁을 한눈에 확인하세요.",
    meta: ["🌽 12종", "💰 수익", "🌱 재배 시간"],
    metaStyle: "bg-[#eef9f4] text-emerald-800 border-[#b3e5cc]",
    ctaStyle: "text-emerald-600",
    color: "#7dceb0",
    bg: "#eef9f4",
    border: "#b3e5cc",
    accent: "#047857",
  },
];

// ─────────────────────────────────────────────
// Page (Server Component)
// ─────────────────────────────────────────────
export default function GardeningPage() {
  return <GardeningClient subcategories={SUBCATEGORIES} />;
}
