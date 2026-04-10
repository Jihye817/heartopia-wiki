"use client";

import Link from "next/link";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface GardeningSubcategory {
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

export interface GardeningClientProps {
  subcategories: GardeningSubcategory[];
}

// ─────────────────────────────────────────────
// Client Page
// ─────────────────────────────────────────────
export function GardeningClient({ subcategories }: GardeningClientProps) {
  return (
    <section className="px-4 pt-8 pb-20 md:px-6">
      <div className="mx-auto max-w-[1100px]">
        {/* Breadcrumb */}
        <nav
          className="mb-7 flex items-center gap-1.5 text-sm"
          style={{ color: "var(--wiki-text-tertiary)" }}
          aria-label="breadcrumb"
        >
          <Link
            href="/"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            홈
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            원예
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-10" style={{ animation: "fadeUp 0.4s ease-out" }}>
          <h1
            className="m-0 mb-1.5 text-3xl font-bold tracking-tight"
            style={{
              color: "var(--wiki-text-primary)",
              fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            원예
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            꽃 교배와 작물 재배 정보를 확인할 수 있어요.
          </p>
        </div>

        {/* Subcategory Cards */}
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}
        >
          {subcategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white px-6 pt-7 pb-6 no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: `${cat.accent}44` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${cat.accent}99`;
                e.currentTarget.style.boxShadow = `0 8px 24px ${cat.accent}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${cat.accent}44`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                style={{
                  background: cat.bg,
                  borderColor: cat.border,
                }}
              >
                {cat.emoji}
              </div>

              {/* Title */}
              <h3
                className="mb-1.5 text-xl font-semibold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {cat.title}
              </h3>

              {/* Description */}
              <p
                className="mb-5 flex-1 text-sm leading-relaxed"
                style={{ color: "var(--wiki-text-secondary)" }}
              >
                {cat.desc}
              </p>

              {/* CTA */}
              <span
                className="mt-auto text-sm font-semibold transition-colors"
                style={{ color: "var(--wiki-text-tertiary)" }}
              >
                보러 가기 →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
