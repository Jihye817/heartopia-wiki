"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, MapPin, Search } from "lucide-react";
import type { FishListItem, FishType } from "./_data/fishes";

// ── Constants ──────────────────────────────────────────────────────────────────

const FISHING_TINT = "126, 200, 227";
const FISHING_BORDER = "rgba(126,200,227,0.6)";
const FISHING_BG_HOVER = "#f0faff";

const SHADOW_SIZE_STYLE: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  소형: {
    bg: "rgba(230,210,230,0.3)",
    color: "#8a6898",
    border: "rgba(200,160,200,0.5)",
  },
  중형: {
    bg: "rgba(230,210,230,0.3)",
    color: "#8a6898",
    border: "rgba(200,160,200,0.5)",
  },
  대형: {
    bg: "rgba(230,210,230,0.3)",
    color: "#8a6898",
    border: "rgba(200,160,200,0.5)",
  },
  파랑: {
    bg: "rgba(186,230,253,0.4)",
    color: "#0284c7",
    border: "rgba(125,211,252,0.6)",
  },
  금색: {
    bg: "rgba(254,243,199,0.5)",
    color: "#b45309",
    border: "rgba(252,211,77,0.6)",
  },
};

// ── Subcomponents ──────────────────────────────────────────────────────────────

function FishCard({ fish }: { fish: FishListItem }) {
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
      {/* 썸네일 */}
      <div className="mb-4 flex justify-center">
        <div
          className="inline-flex h-[110px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-4 text-5xl transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `rgba(${FISHING_TINT},0.15)`,
            borderColor: `rgba(${FISHING_TINT},0.35)`,
          }}
        >
          {fish.thumbnail ? (
            <Image
              src={fish.thumbnail}
              alt=""
              width={110}
              height={110}
              className="h-full w-full object-contain"
            />
          ) : (
            <span aria-hidden>{fish.emoji || "🐟"}</span>
          )}
        </div>
      </div>

      {/* 이름 */}
      <div className="mb-3 text-center">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {fish.name}
        </div>
      </div>

      {/* 뱃지 */}
      <div className="mb-3.5 flex flex-wrap justify-center gap-1.5">
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
        {fish.availability === "always" ? (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(220,252,231,0.4)",
              color: "#16a34a",
              borderColor: "rgba(134,239,172,0.5)",
            }}
          >
            일상
          </span>
        ) : (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(255,220,130,0.25)",
              color: "#9a7020",
              borderColor: "rgba(255,220,130,0.55)",
            }}
          >
            {fish.availability ?? "이벤트"}
          </span>
        )}
        {fish.shadowSize && (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background:
                SHADOW_SIZE_STYLE[fish.shadowSize]?.bg ??
                "rgba(230,210,230,0.3)",
              color: SHADOW_SIZE_STYLE[fish.shadowSize]?.color ?? "#8a6898",
              borderColor:
                SHADOW_SIZE_STYLE[fish.shadowSize]?.border ??
                "rgba(200,160,200,0.5)",
            }}
          >
            {fish.shadowSize}
          </span>
        )}
      </div>

      {/* 성급별 가격 */}
      {fish.fish_grades.length > 0 && (
        <>
          <div
            className="mb-3 h-px"
            style={{ background: `rgba(${FISHING_TINT},0.4)` }}
          />
          <div className="grid grid-cols-5 gap-1">
            {fish.fish_grades.map((g) => (
              <div
                key={g.stars}
                className="flex flex-col items-center rounded-lg border py-1.5"
                style={{
                  background: "rgba(245,245,247,0.7)",
                  borderColor: "rgba(209,213,219,0.5)",
                }}
              >
                <span className="text-xs font-bold text-amber-500">
                  {g.stars}★
                </span>
                <div
                  className="my-1 h-px w-4"
                  style={{ background: "rgba(209,213,219,0.6)" }}
                />
                <span
                  className="text-xs font-bold tabular-nums"
                  style={{ color: "#6b7280" }}
                >
                  {g.sellPrice || "-"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </Link>
  );
}

function FishListView({ fishes }: { fishes: FishListItem[] }) {
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
            {["이름", "레벨", "어종", "그림자", "위치", "판매 가격"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3.5 text-left text-sm font-bold tracking-wider uppercase"
                  style={{ color: "#b080c0" }}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {fishes.map((fish) => (
            <tr
              key={fish.id}
              className="border-b border-[rgba(126,200,227,0.3)] transition-colors last:border-0 hover:bg-[#f0faff]/50"
            >
              <td className="p-0">
                <Link
                  href={`/fishing/detail/${fish.id}`}
                  className="flex items-center px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <div
                    className="mr-2.5 inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1.5px]"
                    style={{
                      background: `rgba(${FISHING_TINT},0.18)`,
                      borderColor: `rgba(${FISHING_TINT},0.4)`,
                    }}
                  >
                    {fish.thumbnail ? (
                      <Image
                        src={fish.thumbnail}
                        alt=""
                        width={28}
                        height={28}
                        className="h-4/5 w-4/5 object-contain"
                      />
                    ) : (
                      <span className="text-sm" aria-hidden>
                        {fish.emoji || "🐟"}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#4a3060" }}
                  >
                    {fish.name}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/fishing/detail/${fish.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background: "rgba(189,222,255,0.3)",
                      color: "#0284c7",
                      borderColor: "rgba(189,222,255,0.6)",
                    }}
                  >
                    Lv.{fish.level}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/fishing/detail/${fish.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background: `rgba(${FISHING_TINT},0.2)`,
                      color: "#4a9bbf",
                      borderColor: `rgba(${FISHING_TINT},0.45)`,
                    }}
                  >
                    {fish.fishType}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/fishing/detail/${fish.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background:
                        SHADOW_SIZE_STYLE[fish.shadowSize]?.bg ??
                        "rgba(230,210,230,0.3)",
                      color:
                        SHADOW_SIZE_STYLE[fish.shadowSize]?.color ?? "#6b4a7a",
                      borderColor:
                        SHADOW_SIZE_STYLE[fish.shadowSize]?.border ??
                        "rgba(230,210,230,0.6)",
                    }}
                  >
                    {fish.shadowSize || "-"}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/fishing/detail/${fish.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
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
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/fishing/detail/${fish.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  {fish.sellMin || fish.sellMax ? (
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: "#b45309" }}
                    >
                      {fish.sellMin} ~ {fish.sellMax} G
                    </span>
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#c4b0cc" }}
                    >
                      -
                    </span>
                  )}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

type AvailFilter = "all" | "always" | "event";

interface FishingClientProps {
  fishes: FishListItem[];
}

export default function FishingClient({ fishes }: FishingClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState<AvailFilter>("all");
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

  const levels = useMemo(() => {
    return Array.from(
      new Set(
        fishes.map((f) => f.level).filter((l): l is number => l !== null),
      ),
    ).sort((a, b) => a - b);
  }, [fishes]);

  const tabCounts = useMemo(
    () => ({
      all: fishes.length,
      always: fishes.filter((f) => f.availability === "always").length,
      event: fishes.filter((f) => f.availability !== "always").length,
    }),
    [fishes],
  );

  const filtered = useMemo(() => {
    let result =
      availFilter === "all"
        ? fishes
        : availFilter === "always"
          ? fishes.filter((f) => f.availability === "always")
          : fishes.filter((f) => f.availability !== "always");

    if (levelFilter !== null) {
      result = result.filter((f) => f.level === levelFilter);
    }

    if (!search.trim()) return result;
    const q = search.trim().toLowerCase();
    return result.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q),
    );
  }, [fishes, availFilter, levelFilter, search]);

  const tabs: { id: AvailFilter; label: string; emoji: string }[] = [
    { id: "all", label: "전체", emoji: "✨" },
    { id: "always", label: "일상", emoji: "🌿" },
    { id: "event", label: "이벤트", emoji: "🎉" },
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

        {/* Filter + Search 통합 행 */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {/* 왼쪽: 어종 탭 */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="가용 필터"
          >
            {tabs.map((tab) => {
              const isActive = availFilter === tab.id;
              const count = tabCounts[tab.id as keyof typeof tabCounts];
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setAvailFilter(tab.id)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-xs font-bold transition-all md:text-sm"
                  style={{
                    background: isActive
                      ? `rgba(${FISHING_TINT},0.2)`
                      : "rgba(255,252,254,0.85)",
                    borderColor: isActive
                      ? `rgba(${FISHING_TINT},0.6)`
                      : `rgba(${FISHING_TINT},0.3)`,
                    color: isActive ? "#4a9bbf" : "#8a6898",
                    boxShadow: isActive
                      ? `0 2px 8px rgba(${FISHING_TINT},0.25)`
                      : "none",
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
                      color: isActive ? "#4a9bbf" : "#8a6898",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 오른쪽: 레벨 셀렉트 + 검색 */}
          <div className="ml-auto flex items-center gap-2">
            <select
              value={levelFilter ?? ""}
              onChange={(e) =>
                setLevelFilter(e.target.value ? Number(e.target.value) : null)
              }
              aria-label="레벨 필터"
              className="rounded-xl border-[1.5px] py-2 pr-8 pl-3 text-xs font-bold transition-all outline-none md:py-2.5 md:text-sm"
              style={{
                background: "rgba(240,250,255,0.5)",
                borderColor: `rgba(${FISHING_TINT},0.4)`,
                color: levelFilter !== null ? "#0284c7" : "#8a6898",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a6898' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="">전체 레벨</option>
              {levels.map((lv) => (
                <option key={lv} value={lv}>
                  낚시 Lv.{lv}
                </option>
              ))}
            </select>
            <div className="relative w-44 md:w-56">
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
                aria-label="물고기 이름 검색"
                className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#7ec8e3] md:py-2.5 md:text-sm"
                style={{
                  background: "rgba(240,250,255,0.5)",
                  borderColor: `rgba(${FISHING_TINT},0.4)`,
                  color: "#4a3060",
                }}
              />
            </div>
          </div>
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
