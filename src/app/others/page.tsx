import type { Metadata } from "next";
import { OthersClient } from "./Client";

export const metadata: Metadata = {
  title: "기타 수집",
  description:
    "사과, 돌, 나무, 버섯 등 맵에서 채집할 수 있는 생산품 정보를 확인할 수 있어요.",
  alternates: { canonical: "/others" },
};

// ─────────────────────────────────────────────
// Data (Server: local static data)
// ─────────────────────────────────────────────
const SUBCATEGORIES = [
  {
    href: "/others/products",
    emoji: "📦",
    tag: {
      label: "생산품 도감",
      style: "bg-slate-50 text-slate-700 border-slate-200",
    },
    title: "생산품",
    desc: "사과, 돌, 나무, 버섯 등 일상에서 맵을 돌며 채집·획득할 수 있는 생산품 정보를 모아두었어요.",
    meta: ["🍎 과일", "🪨 광물", "🪵 목재", "🍄 버섯"],
    metaStyle: "bg-slate-50 text-slate-700 border-slate-200",
    ctaStyle: "text-slate-600",
    color: "#7b8fa3",
    bg: "var(--wiki-cat-others-bg)",
    border: "#d8e0e8",
    accent: "#5a6f82",
  },
];

// ─────────────────────────────────────────────
// Page (Server Component)
// ─────────────────────────────────────────────
export default function OthersPage() {
  return <OthersClient subcategories={SUBCATEGORIES} />;
}
