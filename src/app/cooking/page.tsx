import type { Metadata } from "next";
import { CookingClient } from "./Client";

export const metadata: Metadata = {
  title: "요리",
  description:
    "두근두근타운 요리 레시피, 재료 계산기, 수익 계산기 정보를 확인할 수 있어요.",
  alternates: { canonical: "/cooking" },
};

// ─────────────────────────────────────────────
// Data (Server: local static data)
// ─────────────────────────────────────────────
const SUBCATEGORIES = [
  {
    href: "/cooking/recipes",
    emoji: "🍳",
    tag: {
      label: "요리 도감",
      style: "bg-orange-50 text-orange-700 border-orange-200",
    },
    title: "요리 도감",
    desc: "두근두근타운에서 만들 수 있는 다양한 요리를 확인하세요. 필요한 재료와 만드는 방법을 한눈에 볼 수 있어요.",
    meta: ["🍽️ 요리", "🥕 재료", "⭐ 등급"],
    metaStyle: "bg-orange-50 text-orange-700 border-orange-200",
    ctaStyle: "text-orange-500",
    color: "#f5a878",
    bg: "var(--wiki-cat-cooking-bg)",
    border: "#fde0c8",
    accent: "#d47840",
  },
  {
    href: "/cooking/calculator",
    emoji: "🍎",
    tag: {
      label: "재료 계산기",
      style: "bg-orange-50 text-orange-700 border-orange-200",
    },
    title: "재료 계산기",
    desc: "원하는 요리를 만들기 위해 필요한 재료의 수량을 자동으로 계산해 드려요.",
    meta: ["🥕 재료 수량", "📦 일괄 계산"],
    metaStyle: "bg-orange-50 text-orange-700 border-orange-200",
    ctaStyle: "text-orange-500",
    color: "#f5a878",
    bg: "var(--wiki-cat-cooking-bg)",
    border: "#fde0c8",
    accent: "#d47840",
  },
  // {
  //   href: "/cooking/profit-calculator",
  //   emoji: "💰",
  //   tag: {
  //     label: "계산기",
  //     style: "bg-yellow-50 text-yellow-700 border-yellow-200",
  //   },
  //   title: "수익 계산기",
  //   desc: "요리별 판매 수익을 한눈에 비교해 보세요. 어떤 요리가 가장 효율적인지 쉽게 파악할 수 있어요.",
  //   meta: ["💵 판매가", "📈 수익률", "⭐ 등급별"],
  //   metaStyle: "bg-yellow-50 text-yellow-700 border-yellow-200",
  //   ctaStyle: "text-yellow-600",
  //   color: "#e8c040",
  //   bg: "#fffdf0",
  //   border: "#faecc0",
  //   accent: "#a07820",
  // },
];

// ─────────────────────────────────────────────
// Page (Server Component)
// ─────────────────────────────────────────────
export default function CookingPage() {
  return <CookingClient subcategories={SUBCATEGORIES} />;
}
