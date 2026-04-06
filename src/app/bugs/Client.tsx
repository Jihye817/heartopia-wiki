"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, MapPin, Search, Bug } from "lucide-react";
import type { BugDetail } from "./_data/bugs";

// ── Constants ──────────────────────────────────────────────────────────────────

/** 곤충 채집 테마 색상 (category-section.tsx bugs 참고) */
const BUG_TINT = "139, 195, 74";
const BUG_BORDER = "rgba(139,195,74,0.6)";
const BUG_BG_HOVER = "#f1f8e9";

const RARITY_STYLE: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  일반: {
    bg: "rgba(230,210,230,0.3)",
    color: "#8a6898",
    border: "rgba(200,160,200,0.5)",
  },
  희귀: {
    bg: "rgba(186,230,253,0.4)",
    color: "#0284c7",
    border: "rgba(125,211,252,0.6)",
  },
  전설: {
    bg: "rgba(254,243,199,0.5)",
    color: "#b45309",
    border: "rgba(252,211,77,0.6)",
  },
};

// ── Subcomponents ──────────────────────────────────────────────────────────────

interface BugCardProps {
  bug: BugDetail;
}

function BugCard({ bug }: BugCardProps) {
  return (
    <Link
      href={`/bugs/detail/${bug.id}`}
      className="group relative block overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,252,254,0.9)",
        border: `1.5px solid rgba(${BUG_TINT},0.32)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = BUG_BG_HOVER;
        e.currentTarget.style.borderColor = BUG_BORDER;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${BUG_BORDER}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,252,254,0.9)";
        e.currentTarget.style.borderColor = `rgba(${BUG_TINT},0.32)`;
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
        <span className="text-4xl">🦋</span>
      </div>

      {/* Thumbnail / Emoji */}
      <div
        className="mb-4 inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] text-3xl transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `rgba(${BUG_TINT},0.18)`,
          borderColor: `rgba(${BUG_TINT},0.4)`,
        }}
      >
        {bug.thumbnail ? (
          <Image
            src={bug.thumbnail}
            alt={bug.ko}
            width={60}
            height={60}
            className="h-4/5 w-4/5 object-contain"
          />
        ) : (
          <span aria-hidden>{bug.emoji}</span>
        )}
      </div>

      {/* Name */}
      <div className="mb-3.5">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {bug.ko}
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-3.5 h-px"
        style={{
          background: `linear-gradient(to right, ${BUG_BORDER}, transparent)`,
        }}
      />

      {/* Badges */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(189,225,150,0.3)",
              color: "#689f38",
              borderColor: "rgba(189,225,150,0.6)",
            }}
          >
            채집 Lv.{bug.level}
          </span>
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background:
                RARITY_STYLE[bug.rarity]?.bg ?? "rgba(230,210,230,0.3)",
              color: RARITY_STYLE[bug.rarity]?.color ?? "#8a6898",
              borderColor:
                RARITY_STYLE[bug.rarity]?.border ?? "rgba(200,160,200,0.5)",
            }}
          >
            {bug.rarity}
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
            {bug.location || "-"}
          </span>
        </div>
      </div>
    </Link>
  );
}

interface BugListViewProps {
  bugs: BugDetail[];
}

function BugListView({ bugs }: BugListViewProps) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,254,0.9)",
        borderColor: `rgba(${BUG_TINT},0.34)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full min-w-[580px]">
        <thead>
          <tr
            className="border-b-[1.5px]"
            style={{ borderColor: `rgba(${BUG_TINT},0.4)` }}
          >
            {[
              "이름",
              "레벨",
              "서식지",
              "희귀도",
              "위치",
              "1성 ~ 5성 가격",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3.5 text-left text-sm font-bold tracking-wider uppercase"
                style={{ color: "#7aaa40" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr
              key={bug.id}
              className="border-b border-[rgba(139,195,74,0.3)] transition-colors last:border-0 hover:bg-[#f1f8e9]/50"
            >
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <div
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1.5px]"
                    style={{
                      background: `rgba(${BUG_TINT},0.18)`,
                      borderColor: `rgba(${BUG_TINT},0.4)`,
                    }}
                  >
                    {bug.thumbnail ? (
                      <Image
                        src={bug.thumbnail}
                        alt={bug.ko}
                        width={32}
                        height={32}
                        className="h-4/5 w-4/5 object-contain"
                      />
                    ) : (
                      <span className="text-base" aria-hidden>
                        {bug.emoji}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#4a3060" }}
                  >
                    {bug.ko}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: "rgba(189,225,150,0.3)",
                    color: "#689f38",
                    borderColor: "rgba(189,225,150,0.6)",
                  }}
                >
                  Lv.{bug.level}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: `rgba(${BUG_TINT},0.2)`,
                    color: "#5a8a28",
                    borderColor: `rgba(${BUG_TINT},0.45)`,
                  }}
                >
                  {bug.habitat}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background:
                      RARITY_STYLE[bug.rarity]?.bg ?? "rgba(230,210,230,0.3)",
                    color: RARITY_STYLE[bug.rarity]?.color ?? "#6b4a7a",
                    borderColor:
                      RARITY_STYLE[bug.rarity]?.border ??
                      "rgba(230,210,230,0.6)",
                  }}
                >
                  {bug.rarity}
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
                  {bug.location || "-"}
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
                  {bug.sellMin.toLocaleString()}~{bug.sellMax.toLocaleString()}G
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

type CategoryFilter = "all" | "일반" | "곤충 유인" | "이벤트";

const LURE_HABITATS = ["곤충 유인", "에어벌 유인장치"];

interface BugsClientProps {
  bugs: BugDetail[];
}

export default function BugsClient({ bugs }: BugsClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const tabCounts = useMemo(
    () => ({
      all: bugs.length,
      일반: bugs.filter((b) => !LURE_HABITATS.includes(b.habitat)).length,
      "곤충 유인": bugs.filter((b) => LURE_HABITATS.includes(b.habitat)).length,
      이벤트: 0,
    }),
    [bugs],
  );

  const filtered = useMemo(() => {
    const byCategory =
      categoryFilter === "all"
        ? bugs
        : categoryFilter === "곤충 유인"
          ? bugs.filter((b) => LURE_HABITATS.includes(b.habitat))
          : categoryFilter === "이벤트"
            ? bugs.filter(() => false)
            : bugs.filter((b) => !LURE_HABITATS.includes(b.habitat));

    if (!search.trim()) return byCategory;

    const q = search.trim().toLowerCase();
    return byCategory.filter(
      (b) =>
        b.ko.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q),
    );
  }, [bugs, categoryFilter, search]);

  const tabs: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: "전체" },
    { id: "일반", label: "일반" },
    { id: "곤충 유인", label: "곤충 유인" },
    { id: "이벤트", label: "이벤트" },
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
          style={{ color: "#7aaa40" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(180,220,140,0.5)" }}>›</span>
          <span style={{ color: "#4a6a20" }}>곤충 도감</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#4a6a20", letterSpacing: "-0.02em" }}
              >
                곤충 도감
              </h1>
              <p
                className="mt-1 text-xs md:text-sm"
                style={{ color: "#689f38" }}
              >
                두근두근타운 곤충 종류
              </p>
            </div>

            {/* View Toggle */}
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "rgba(197,225,165,0.3)" }}
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
                    color: viewMode === mode ? "#4a6a20" : "#689f38",
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
                    ? `rgba(${BUG_TINT},0.55)`
                    : "rgba(197,225,165,0.6)",
                  color: isActive ? "#4a6a20" : "#689f38",
                  boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                }}
              >
                {tab.label}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] md:text-xs"
                  style={{
                    background: isActive
                      ? `rgba(${BUG_TINT},0.25)`
                      : "rgba(197,225,165,0.45)",
                    color: "#4a6a20",
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
              style={{ color: "#689f38" }}
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              type="search"
              placeholder="이름·장소 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="곤충 이름 또는 장소 검색"
              className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#8bc34a] md:py-2.5 md:text-sm"
              style={{
                background: "rgba(240,248,230,0.5)",
                borderColor: "rgba(197,225,165,0.6)",
                color: "#3a5010",
              }}
            />
          </div>
          <span
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold md:text-sm"
            style={{
              background: `rgba(${BUG_TINT},0.15)`,
              borderColor: `rgba(${BUG_TINT},0.4)`,
              color: "#5a8a28",
            }}
          >
            <Bug size={12} aria-hidden />
            {filtered.length}종
          </span>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-3 text-4xl" aria-hidden>
              🔍
            </div>
            <p className="text-xs md:text-sm" style={{ color: "#689f38" }}>
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
            {filtered.map((bug) => (
              <BugCard key={bug.id} bug={bug} />
            ))}
          </div>
        ) : (
          <BugListView bugs={filtered} />
        )}
      </div>
    </section>
  );
}
