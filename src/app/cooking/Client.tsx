"use client";

import { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface CookingSubcategory {
  href: string;
  emoji: string;
  tag: { label: string; style: string };
  title: string;
  desc: string;
  meta: readonly string[];
  metaStyle: string;
  ctaStyle: string;
  color: string;
  bg: string;
  border: string;
  accent: string;
}

export interface CookingClientProps {
  subcategories: CookingSubcategory[];
}

// ─────────────────────────────────────────────
// Client Page
// ─────────────────────────────────────────────
export function CookingClient({ subcategories }: CookingClientProps) {
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
          <span style={{ color: "#6b4a7a" }}>요리</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <h1
            className="m-0 text-[clamp(24px,4vw,34px)] font-bold tracking-tight"
            style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
          >
            요리
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#8a6898" }}>
            두근두근타운 요리 레시피, 재료 계산, 수익 정보를 확인할 수 있어요.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold"
              style={{
                background: "rgba(255,248,240,0.9)",
                borderColor: "rgba(253,224,200,0.8)",
                color: "#d47840",
              }}
            >
              🍳 요리
            </span>
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
            className="rounded-full border px-2.5 py-0.5 text-xs font-bold"
            style={{
              background: "rgba(245,168,120,0.12)",
              borderColor: "rgba(245,168,120,0.35)",
              color: "#d47840",
            }}
          >
            {subcategories.length}개
          </span>
        </div>

        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {subcategories.map((cat) => {
            const isHovered = hovered === cat.href;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative flex flex-col overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
                style={{
                  background: isHovered ? cat.bg : "rgba(255,252,250,0.9)",
                  border: `1.5px solid ${
                    isHovered ? cat.border : "rgba(240,220,200,0.6)"
                  }`,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${cat.border}`
                    : "0 2px 12px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={() => setHovered(cat.href)}
                onMouseLeave={() => setHovered(null)}
              >
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
                  className={`mb-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${cat.tag.style}`}
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
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${cat.metaStyle}`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-bold ${cat.ctaStyle}`}
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
