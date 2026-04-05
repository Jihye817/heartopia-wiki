"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, MapPin, Search, Bird } from "lucide-react";
import type { BirdDetail } from "./_data/birds";

// ── Constants ──────────────────────────────────────────────────────────────────

/** 새 관찰 테마 색상 (category-section.tsx birds 참고) */
const BIRD_TINT = "184, 159, 220";
const BIRD_BORDER = "rgba(184,159,220,0.6)";
const BIRD_BG_HOVER = "#f8f0ff";

const RARITY_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  일반: { bg: "rgba(230,210,230,0.3)", color: "#8a6898", border: "rgba(200,160,200,0.5)" },
  희귀: { bg: "rgba(186,230,253,0.4)", color: "#0284c7", border: "rgba(125,211,252,0.6)" },
  전설: { bg: "rgba(254,243,199,0.5)", color: "#b45309", border: "rgba(252,211,77,0.6)" },
};

// ── Subcomponents ──────────────────────────────────────────────────────────────

interface BirdCardProps {
  bird: BirdDetail;
}

function BirdCard({ bird }: BirdCardProps) {
  return (
    <Link
      href={`/birds/detail/${bird.id}`}
      className="group relative block overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,252,254,0.9)",
        border: `1.5px solid rgba(${BIRD_TINT},0.32)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = BIRD_BG_HOVER;
        e.currentTarget.style.borderColor = BIRD_BORDER;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${BIRD_BORDER}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,252,254,0.9)";
        e.currentTarget.style.borderColor = `rgba(${BIRD_TINT},0.32)`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      {/* BG decoration */}
      <div
        className="absolute -right-2.5 -bottom-2.5 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.11]"
        style={{
          transform: "scale(2) rotate(-10deg)",
          transformOrigin: "bottom right",
        }}
        aria-hidden
      >
        <span className="text-4xl">🐦</span>
      </div>

      {/* Thumbnail / Emoji */}
      <div
        className="mb-4 inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] text-3xl transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `rgba(${BIRD_TINT},0.18)`,
          borderColor: `rgba(${BIRD_TINT},0.4)`,
        }}
      >
        {bird.thumbnail ? (
          <Image
            src={bird.thumbnail}
            alt={bird.ko}
            width={60}
            height={60}
            className="h-4/5 w-4/5 object-contain"
          />
        ) : (
          <span aria-hidden>{bird.emoji}</span>
        )}
      </div>

      {/* Name */}
      <div className="mb-3.5">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {bird.ko}
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-3.5 h-px"
        style={{
          background: `linear-gradient(to right, ${BIRD_BORDER}, transparent)`,
        }}
      />

      {/* Badges */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(189,200,255,0.3)",
              color: "#6b4abf",
              borderColor: "rgba(189,200,255,0.6)",
            }}
          >
            관찰 Lv.{bird.level}
          </span>
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: RARITY_STYLE[bird.rarity]?.bg ?? "rgba(230,210,230,0.3)",
              color: RARITY_STYLE[bird.rarity]?.color ?? "#8a6898",
              borderColor: RARITY_STYLE[bird.rarity]?.border ?? "rgba(200,160,200,0.5)",
            }}
          >
            {bird.rarity}
          </span>
        </div>
        <div>
          <span
            className="flex w-fit items-center gap-1 rounded-lg border px-2 py-1 text-xs font-bold md:text-[13px]"
            style={{
              background: "rgba(255,245,235,0.9)",
              borderColor: "rgba(210,170,120,0.5)",
              color: "#8a6020",
            }}
          >
            <MapPin size={11} strokeWidth={2.2} aria-hidden />
            {bird.location || "-"}
          </span>
        </div>
      </div>
    </Link>
  );
}

interface BirdListViewProps {
  birds: BirdDetail[];
}

function BirdListView({ birds }: BirdListViewProps) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,254,0.9)",
        borderColor: `rgba(${BIRD_TINT},0.34)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full min-w-[580px]">
        <thead>
          <tr
            className="border-b-[1.5px]"
            style={{ borderColor: `rgba(${BIRD_TINT},0.4)` }}
          >
            {["이름", "레벨", "서식지", "희귀도", "위치", "거리", "1성 ~ 5성 가격"].map((h) => (
              <th
                key={h}
                className="px-4 py-3.5 text-left text-sm font-bold tracking-wider uppercase"
                style={{ color: "#b080c0" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {birds.map((bird) => (
            <tr
              key={bird.id}
              className="border-b border-[rgba(184,159,220,0.3)] transition-colors last:border-0 hover:bg-[#f8f0ff]/50"
            >
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <div
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1.5px]"
                    style={{
                      background: `rgba(${BIRD_TINT},0.18)`,
                      borderColor: `rgba(${BIRD_TINT},0.4)`,
                    }}
                  >
                    {bird.thumbnail ? (
                      <Image
                        src={bird.thumbnail}
                        alt={bird.ko}
                        width={32}
                        height={32}
                        className="h-4/5 w-4/5 object-contain"
                      />
                    ) : (
                      <span className="text-base" aria-hidden>{bird.emoji}</span>
                    )}
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#4a3060" }}
                  >
                    {bird.ko}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: "rgba(189,200,255,0.3)",
                    color: "#6b4abf",
                    borderColor: "rgba(189,200,255,0.6)",
                  }}
                >
                  Lv.{bird.level}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: `rgba(${BIRD_TINT},0.2)`,
                    color: "#8a6bbf",
                    borderColor: `rgba(${BIRD_TINT},0.45)`,
                  }}
                >
                  {bird.habitat}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: RARITY_STYLE[bird.rarity]?.bg ?? "rgba(230,210,230,0.3)",
                    color: RARITY_STYLE[bird.rarity]?.color ?? "#6b4a7a",
                    borderColor: RARITY_STYLE[bird.rarity]?.border ?? "rgba(230,210,230,0.6)",
                  }}
                >
                  {bird.rarity}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="flex w-fit items-center gap-1 rounded-lg border px-2 py-1 text-xs font-bold md:text-[13px]"
                  style={{
                    background: "rgba(255,245,235,0.9)",
                    borderColor: "rgba(210,170,120,0.5)",
                    color: "#8a6020",
                  }}
                >
                  <MapPin size={11} strokeWidth={2.2} aria-hidden />
                  {bird.location || "-"}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: `rgba(${BIRD_TINT},0.15)`,
                    color: "#6b4a7a",
                    borderColor: `rgba(${BIRD_TINT},0.4)`,
                  }}
                >
                  {bird.distance}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: "rgba(255,248,230,0.9)",
                    borderColor: "rgba(210,170,100,0.45)",
                    color: "#7a5a10",
                  }}
                >
                  {bird.sellMin.toLocaleString()}~
                  {bird.sellMax.toLocaleString()}G
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

type CategoryFilter = "all" | "일반" | "이벤트" | "새들의 복귀";

interface BirdsClientProps {
  birds: BirdDetail[];
}

export default function BirdsClient({ birds }: BirdsClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const tabCounts = useMemo(
    () => ({
      all: birds.length,
      일반: birds.filter((b) => b.habitat !== "새들의 복귀").length,
      이벤트: 0,
      "새들의 복귀": birds.filter((b) => b.habitat === "새들의 복귀").length,
    }),
    [birds],
  );

  const filtered = useMemo(() => {
    const byCategory =
      categoryFilter === "all"
        ? birds
        : categoryFilter === "새들의 복귀"
          ? birds.filter((b) => b.habitat === "새들의 복귀")
          : categoryFilter === "이벤트"
            ? birds.filter(() => false)
            : birds.filter((b) => b.habitat !== "새들의 복귀");

    if (!search.trim()) return byCategory;

    const q = search.trim().toLowerCase();
    return byCategory.filter(
      (b) =>
        b.ko.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q),
    );
  }, [birds, categoryFilter, search]);

  const tabs: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: "전체" },
    { id: "일반", label: "일반" },
    { id: "이벤트", label: "이벤트" },
    { id: "새들의 복귀", label: "새들의 복귀" },
  ];

  return (
    <section
      className="px-6 pt-8 pb-16"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Breadcrumb */}
        <nav
          className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-bold tracking-wide md:mb-8 md:text-sm"
          style={{ color: "#b080c0" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>새 도감</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
              >
                새 도감
              </h1>
              <p
                className="mt-1 text-xs md:text-sm"
                style={{ color: "#8a6898" }}
              >
                두근두근타운 새 종류
              </p>
            </div>

            {/* View Toggle */}
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "rgba(230,210,230,0.3)" }}
              role="tablist"
              aria-label="보기 방식"
            >
              {[
                { mode: "card" as const, icon: LayoutGrid, label: "카드" },
                { mode: "list" as const, icon: List, label: "리스트" },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  role="tab"
                  aria-selected={viewMode === mode}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all md:px-3.5 md:text-sm"
                  style={{
                    background: viewMode === mode ? "white" : "transparent",
                    color: viewMode === mode ? "#6b4a7a" : "#8a6898",
                    boxShadow:
                      viewMode === mode ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <Icon size={14} strokeWidth={2.2} aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="분류 필터"
        >
          {tabs.map((tab) => {
            const isActive = categoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategoryFilter(tab.id)}
                className="flex items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-xs font-bold transition-all md:text-sm"
                style={{
                  background: isActive ? "white" : "rgba(255,252,254,0.85)",
                  borderColor: isActive
                    ? `rgba(${BIRD_TINT},0.55)`
                    : "rgba(230,210,230,0.6)",
                  color: isActive ? "#6b4a7a" : "#8a6898",
                  boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                }}
              >
                {tab.label}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] md:text-xs"
                  style={{
                    background: isActive
                      ? `rgba(${BIRD_TINT},0.25)`
                      : "rgba(230,210,230,0.45)",
                    color: "#6b4a7a",
                  }}
                >
                  {tabCounts[tab.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + Count */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="relative max-w-xs min-w-[200px] flex-1">
            <Search
              size={14}
              className="absolute top-1/2 left-3 -translate-y-1/2"
              style={{ color: "#8a6898" }}
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              type="search"
              placeholder="이름·장소 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="새 이름 또는 장소 검색"
              className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#b89fdc] md:py-2.5 md:text-sm"
              style={{
                background: "rgba(248,240,255,0.5)",
                borderColor: "rgba(230,210,230,0.6)",
                color: "#4a3060",
              }}
            />
          </div>
          <span
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold md:text-sm"
            style={{
              background: `rgba(${BIRD_TINT},0.15)`,
              borderColor: `rgba(${BIRD_TINT},0.4)`,
              color: "#8a6bbf",
            }}
          >
            <Bird size={12} aria-hidden />
            {filtered.length}종
          </span>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-3 text-4xl" aria-hidden>
              🔍
            </div>
            <p className="text-xs md:text-sm" style={{ color: "#8a6898" }}>
              검색 결과가 없어요
            </p>
          </div>
        ) : viewMode === "card" ? (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {filtered.map((bird) => (
              <BirdCard key={bird.id} bird={bird} />
            ))}
          </div>
        ) : (
          <BirdListView birds={filtered} />
        )}
      </div>
    </section>
  );
}
