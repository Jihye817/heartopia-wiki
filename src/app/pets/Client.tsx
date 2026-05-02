"use client";

import Link from "next/link";

const PET_ACCENT = "#c96a42";
const PET_BG = "var(--wiki-cat-pets-bg)";
const PET_BORDER = "#f5d0c4";

const SUBCATEGORIES = [
  {
    href: "/pets/dogs",
    emoji: "🐶",
    title: "강아지",
    desc: "두근두근타운에서 함께할 수 있는 강아지 종류를 확인해 보세요.",
    comingSoon: false,
  },
  {
    href: "/pets/cats",
    emoji: "🐱",
    title: "고양이",
    desc: "두근두근타운에서 함께할 수 있는 고양이 종류를 확인해 보세요.",
    comingSoon: true,
  },
];

export default function PetsClient() {
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
            반려동물
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
            반려동물
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            두근두근타운 반려동물 정보
          </p>
        </div>

        {/* Subcategory Cards */}
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}
        >
          {SUBCATEGORIES.map((item) =>
            item.comingSoon ? (
              <div
                key={item.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white px-6 pt-7 pb-6 opacity-60 cursor-not-allowed"
                style={{ borderColor: `${PET_ACCENT}22` }}
              >
                {/* 준비중 badge */}
                <span
                  className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ background: PET_BG, color: PET_ACCENT }}
                >
                  준비중
                </span>

                {/* Icon */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl"
                  style={{ background: PET_BG, borderColor: PET_BORDER }}
                >
                  {item.emoji}
                </div>

                {/* Title */}
                <h3
                  className="mb-1.5 text-xl font-bold"
                  style={{ color: "var(--wiki-text-primary)" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-5 flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--wiki-text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white px-6 pt-7 pb-6 no-underline transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: `${PET_ACCENT}44` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${PET_ACCENT}99`;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${PET_ACCENT}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${PET_ACCENT}44`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Icon */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: PET_BG, borderColor: PET_BORDER }}
                >
                  {item.emoji}
                </div>

                {/* Title */}
                <h3
                  className="mb-1.5 text-xl font-bold"
                  style={{ color: "var(--wiki-text-primary)" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-5 flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--wiki-text-secondary)" }}
                >
                  {item.desc}
                </p>

                {/* CTA */}
                <span
                  className="mt-auto text-sm font-semibold transition-colors"
                  style={{ color: "var(--wiki-text-tertiary)" }}
                >
                  보러 가기 →
                </span>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
