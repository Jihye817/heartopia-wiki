"use client";

import { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const SUBCATEGORIES = [
  {
    href: "/gardening/flowers",
    emoji: "🌸",
    tag: {
      label: "꽃 도감",
      style: "bg-rose-50 text-rose-600 border-rose-200",
    },
    title: "꽃 교배",
    desc: "다양한 꽃을 교배해 새로운 색상의 꽃을 얻을 수 있어요. 데이지, 팬지, 칼라 등 다양한 꽃의 정보를 확인하세요.",
    meta: ["🌼 10종", "⭐ 성급", "🌸 교배"],
    metaStyle: "bg-pink-50 text-pink-600 border-pink-200",
    ctaStyle: "text-pink-500",
    color: "#f8a4c8",
    bg: "#fff0f6",
    border: "#ffd6e8",
    accent: "#e8739b",
  },
  {
    href: "/gardening/crops",
    emoji: "🌾",
    tag: {
      label: "작물 도감",
      style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    title: "작물 재배",
    desc: "작물을 심고 재배하는 방법과 정보를 확인할 수 있어요. 수확 기간, 판매 가격, 재배 팁을 한눈에 확인하세요.",
    meta: ["🌽 12종", "💰 수익", "🌱 재배 시간"],
    metaStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ctaStyle: "text-emerald-600",
    color: "#6ee7b7",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    accent: "#059669",
  },
] as const;

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function GardeningPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      className="px-6 pt-8 pb-16"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Breadcrumb */}
        <nav
          className="mb-8 flex items-center gap-1.5 text-sm font-bold tracking-wide"
          style={{ color: "#b080c0" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>원예</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <h1
            className="m-0 text-[clamp(24px,4vw,34px)] font-bold tracking-tight"
            style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
          >
            원예
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#8a6898" }}>
            꽃 교배와 작물 재배 정보를 확인할 수 있어요. 두근두근타운의 다양한
            식물을 키워보세요.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: "🌸 꽃 교배", style: "text-rose-500 border-rose-200" },
              {
                label: "🌾 작물 재배",
                style: "text-emerald-600 border-emerald-200",
              },
              // { label: "📖 도감 2종", style: "text-sky-600 border-sky-200" },
            ].map(({ label, style }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[12px] font-bold ${style}`}
                style={{ background: "rgba(255,255,255,0.8)" }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Sub-category Cards */}
        <div className="mb-4 flex items-baseline justify-between">
          <h2
            className="text-[0.95rem] font-bold tracking-tight"
            style={{ color: "#6b4a7a" }}
          >
            하위 카테고리
          </h2>
          <span
            className="rounded-full border px-2.5 py-0.5 text-[12px] font-bold"
            style={{
              background: "rgba(248,164,200,0.15)",
              borderColor: "rgba(248,164,200,0.4)",
              color: "#c06898",
            }}
          >
            2개
          </span>
        </div>

        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {SUBCATEGORIES.map((cat) => {
            const isHovered = hovered === cat.href;
            const isCrops = cat.href === "/gardening/crops";
            return (
              <Link
                key={cat.href}
                href={isCrops ? "#" : cat.href}
                className="group relative flex flex-col overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
                style={{
                  background: isHovered ? cat.bg : "rgba(255,252,254,0.9)",
                  border: `1.5px solid ${
                    isHovered ? cat.border : "rgba(230,210,230,0.6)"
                  }`,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${cat.border}`
                    : "0 2px 12px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={() => setHovered(cat.href)}
                onMouseLeave={() => setHovered(null)}
                onClick={isCrops ? (e) => e.preventDefault() : undefined}
                aria-disabled={isCrops}
              >
                {/* 작물 도감: 호버 시 준비중 메시지 */}
                {isCrops && isHovered && (
                  <div
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-[20px] bg-white backdrop-blur-sm"
                    aria-live="polite"
                  >
                    <span className="text-lg font-bold text-emerald-600">
                      준비중입니다
                    </span>
                  </div>
                )}
                {/* Background accent blob */}
                <div
                  className="absolute -right-2.5 -bottom-2.5 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1]"
                  style={{
                    transform: "scale(2) rotate(-10deg)",
                    transformOrigin: "bottom right",
                  }}
                  aria-hidden
                >
                  <span className="text-4xl">{cat.emoji}</span>
                </div>

                <div
                  className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-[1.5px] text-3xl transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `${cat.color}22`,
                    borderColor: `${cat.color}44`,
                  }}
                >
                  {cat.emoji}
                </div>

                <span
                  className={`mb-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[12px] font-bold ${cat.tag.style}`}
                >
                  {cat.tag.label}
                </span>

                <h3
                  className="mb-2 text-xl leading-tight font-bold"
                  style={{ color: "#4a3060" }}
                >
                  {cat.title}
                </h3>

                <p
                  className="mb-4 flex-1 text-[13px] leading-relaxed"
                  style={{ color: "#8a6898" }}
                >
                  {cat.desc}
                </p>

                <div
                  className="h-px"
                  style={{
                    background: `linear-gradient(to right, ${cat.border}, transparent)`,
                  }}
                />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.meta.map((m) => (
                      <span
                        key={m}
                        className={`rounded-full border px-2.5 py-0.5 text-[12px] font-bold ${cat.metaStyle}`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`flex items-center gap-1 text-[12px] font-bold ${cat.ctaStyle}`}
                  >
                    보러 가기 →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
