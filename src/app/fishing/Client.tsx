"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, MapPin, Search, Waves } from "lucide-react";
import type { FishDetail, FishType } from "./_data/fishes";

// ── Constants ──────────────────────────────────────────────────────────────────

/** 낚시 테마 색상 (category-section.tsx fishing 참고) */
const FISHING_TINT = "126, 200, 227";
const FISHING_BORDER = "rgba(126,200,227,0.6)";
const FISHING_BG_HOVER = "#f0faff";

const FISH_TYPE_EMOJI: Record<FishType, string> = {
  강: "🏞️",
  호수: "💧",
  바다: "🌊",
};

// ── Subcomponents ──────────────────────────────────────────────────────────────

interface FishCardProps {
  fish: FishDetail;
}

function FishCard({ fish }: FishCardProps) {
  return (
    <Link
      href={`/fishing/detail/${fish.id}`}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,252,254,0.9)",
        border: `1.5px solid rgba(${FISHING_TINT},0.32)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = FISHING_BG_HOVER;
        e.currentTarget.style.borderColor = FISHING_BORDER;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${FISHING_BORDER}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,252,254,0.9)";
        e.currentTarget.style.borderColor = `rgba(${FISHING_TINT},0.32)`;
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
        <span className="text-4xl">🐟</span>
      </div>

      {/* Emoji */}
      <div
        className="mb-4 inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] text-3xl transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `rgba(${FISHING_TINT},0.18)`,
          borderColor: `rgba(${FISHING_TINT},0.4)`,
        }}
      >
        <span aria-hidden>{fish.emoji}</span>
      </div>

      {/* Name */}
      <div className="mb-3.5">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {fish.ko}
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-3.5 h-px"
        style={{
          background: `linear-gradient(to right, ${FISHING_BORDER}, transparent)`,
        }}
      />

      {/* Badges */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(189,222,255,0.3)",
              color: "#0284c7",
              borderColor: "rgba(189,222,255,0.6)",
            }}
          >
            낚시 Lv.{fish.level}
          </span>
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: `rgba(${FISHING_TINT},0.2)`,
              color: "#4a9bbf",
              borderColor: `rgba(${FISHING_TINT},0.45)`,
            }}
          >
            {fish.shadowSize}
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
            {fish.location || "-"}
          </span>
        </div>
      </div>
    </Link>
  );
}

interface FishListViewProps {
  fishes: FishDetail[];
}

function FishListView({ fishes }: FishListViewProps) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,254,0.9)",
        borderColor: `rgba(${FISHING_TINT},0.34)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full min-w-[580px]">
        <thead>
          <tr
            className="border-b-[1.5px]"
            style={{ borderColor: `rgba(${FISHING_TINT},0.4)` }}
          >
            {["이름", "어종", "그림자", "위치", "1성 ~ 5성 가격"].map((h) => (
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
          {fishes.map((fish) => (
            <tr
              key={fish.id}
              className="border-b border-[rgba(126,200,227,0.3)] transition-colors last:border-0 hover:bg-[#f0faff]/50"
            >
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden>
                    {fish.emoji}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#4a3060" }}
                  >
                    {fish.ko}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: `rgba(${FISHING_TINT},0.2)`,
                    color: "#4a9bbf",
                    borderColor: `rgba(${FISHING_TINT},0.45)`,
                  }}
                >
                  {FISH_TYPE_EMOJI[fish.fishType]} {fish.fishType}
                </span>
              </td>
              <td className="px-4 py-3.5 text-sm" style={{ color: "#6b4a7a" }}>
                {fish.shadowSize}
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
                  {fish.location || "-"}
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
                  {fish.sellMin.toLocaleString()}~
                  {fish.sellMax.toLocaleString()}G
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

type FishTypeFilter = "all" | FishType;

interface FishingClientProps {
  fishes: FishDetail[];
}

export default function FishingClient({ fishes }: FishingClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FishTypeFilter>("all");

  const tabCounts = useMemo(
    () => ({
      all: fishes.length,
      강: fishes.filter((f) => f.fishType === "강").length,
      호수: fishes.filter((f) => f.fishType === "호수").length,
      바다: fishes.filter((f) => f.fishType === "바다").length,
    }),
    [fishes],
  );

  const filtered = useMemo(() => {
    const byType =
      typeFilter === "all"
        ? fishes
        : fishes.filter((f) => f.fishType === typeFilter);

    if (!search.trim()) return byType;

    const q = search.trim().toLowerCase();
    return byType.filter(
      (f) =>
        f.ko.toLowerCase().includes(q) ||
        f.name.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q),
    );
  }, [fishes, typeFilter, search]);

  const tabs: { id: FishTypeFilter; label: string; emoji: string }[] = [
    { id: "all", label: "전체", emoji: "✨" },
    { id: "강", label: "강", emoji: "🏞️" },
    { id: "호수", label: "호수", emoji: "💧" },
    { id: "바다", label: "바다", emoji: "🌊" },
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
          <span style={{ color: "#6b4a7a" }}>물고기 도감</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
              >
                물고기 도감
              </h1>
              <p
                className="mt-1 text-xs md:text-sm"
                style={{ color: "#8a6898" }}
              >
                두근두근타운 물고기 종류
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
          aria-label="어종 필터"
        >
          {tabs.map((tab) => {
            const isActive = typeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTypeFilter(tab.id)}
                className="flex items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-xs font-bold transition-all md:text-sm"
                style={{
                  background: isActive ? "white" : "rgba(255,252,254,0.85)",
                  borderColor: isActive
                    ? `rgba(${FISHING_TINT},0.55)`
                    : "rgba(230,210,230,0.6)",
                  color: isActive ? "#6b4a7a" : "#8a6898",
                  boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                }}
              >
                <span aria-hidden>{tab.emoji}</span>
                {tab.label}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] md:text-xs"
                  style={{
                    background: isActive
                      ? `rgba(${FISHING_TINT},0.25)`
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
              aria-label="물고기 이름 또는 장소 검색"
              className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#7ec8e3] md:py-2.5 md:text-sm"
              style={{
                background: "rgba(255,240,246,0.5)",
                borderColor: "rgba(230,210,230,0.6)",
                color: "#4a3060",
              }}
            />
          </div>
          <span
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold md:text-sm"
            style={{
              background: `rgba(${FISHING_TINT},0.15)`,
              borderColor: `rgba(${FISHING_TINT},0.4)`,
              color: "#4a9bbf",
            }}
          >
            <Waves size={12} aria-hidden />
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
            {filtered.map((fish) => (
              <FishCard key={fish.id} fish={fish} />
            ))}
          </div>
        ) : (
          <FishListView fishes={filtered} />
        )}
      </div>
    </section>
  );
}
