"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, Search } from "lucide-react";
import type { FlowerListItem } from "./_data/flowers";

type SeasonFilter = "all" | "always" | "event";

const AVAILABILITY_LABEL: Record<string, string> = {
  always: "일상",
  event: "이벤트",
};

// ── Subcomponents ─────────────────────────────────────────────────────────────

interface FlowerCardProps {
  flower: FlowerListItem;
}

function FlowerCard({ flower }: FlowerCardProps) {
  return (
    <Link
      href={`/gardening/flowers/detail/${flower.id}`}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,252,254,0.9)",
        border: "1.5px solid rgba(230,210,230,0.6)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#fff0f6";
        e.currentTarget.style.borderColor = "#ffd6e8";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px #ffd6e8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,252,254,0.9)";
        e.currentTarget.style.borderColor = "rgba(230,210,230,0.6)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      {/* 썸네일 */}
      <div className="mb-4 flex justify-center">
        <div
          className="inline-flex h-[110px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-4 transition-transform duration-300 group-hover:scale-105"
          style={{
            background: "rgba(248,164,200,0.15)",
            borderColor: "rgba(248,164,200,0.35)",
          }}
        >
          <Image
            src={flower.thumbnail}
            alt=""
            width={110}
            height={110}
            className="object-contain"
          />
        </div>
      </div>

      {/* 꽃 이름 */}
      <div className="mb-3 text-center">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {flower.name}
        </div>
      </div>

      {/* 뱃지 */}
      <div className="mb-3.5 flex flex-wrap justify-center gap-1.5">
        {flower.level !== null && (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(189,222,255,0.3)",
              color: "#0284c7",
              borderColor: "rgba(189,222,255,0.6)",
            }}
          >
            원예 Lv.{flower.level}
          </span>
        )}
        {flower.availability === "event" ? (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(255,220,130,0.25)",
              color: "#9a7020",
              borderColor: "rgba(255,220,130,0.55)",
            }}
          >
            {flower.event ?? "이벤트"}
          </span>
        ) : (
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
        )}
      </div>

      {/* 성급별 가격 */}
      {flower.flower_grades.length > 0 && (
        <>
          <div
            className="mb-3 h-px"
            style={{ background: "rgba(230,210,230,0.6)" }}
          />
          <div className="grid grid-cols-5 gap-1">
            {flower.flower_grades.map((g) => (
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
                  {g.sell_price ?? "-"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </Link>
  );
}

interface FlowerListViewProps {
  flowers: FlowerListItem[];
}

function FlowerListView({ flowers }: FlowerListViewProps) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,254,0.9)",
        borderColor: "rgba(230,210,230,0.6)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full">
        <thead>
          <tr
            className="border-b-[1.5px]"
            style={{ borderColor: "rgba(230,210,230,0.6)" }}
          >
            {["꽃 이름", "원예 레벨", "종류", "활동시기", "판매 가격"].map(
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
          {flowers.map((f) => (
            <tr
              key={f.id}
              className="border-b border-[rgba(230,210,230,0.4)] transition-colors last:border-0 hover:bg-[#fff0f6]/50"
            >
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="flex items-center px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span className="mr-2.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                    <Image
                      src={f.thumbnail}
                      alt=""
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#4a3060" }}
                  >
                    {f.name}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  {f.level !== null && (
                    <span
                      className="rounded-full border px-2.5 py-1 text-sm font-bold"
                      style={{
                        background: "rgba(189,222,255,0.3)",
                        color: "#0284c7",
                        borderColor: "rgba(189,222,255,0.6)",
                      }}
                    >
                      Lv.{f.level}
                    </span>
                  )}
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background: "rgba(248,164,200,0.2)",
                      color: "#c06898",
                      borderColor: "rgba(248,164,200,0.4)",
                    }}
                  >
                    {f.stages} 종류
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  {f.event ? (
                    <span
                      className="rounded-full border px-2.5 py-1 text-sm font-bold"
                      style={{
                        background: "rgba(255,220,130,0.25)",
                        color: "#9a7020",
                        borderColor: "rgba(255,220,130,0.55)",
                      }}
                    >
                      이벤트 : {f.event}
                    </span>
                  ) : (
                    <span
                      className="rounded-full border px-2.5 py-1 text-sm font-bold"
                      style={{
                        background: "rgba(220,252,231,0.4)",
                        color: "#16a34a",
                        borderColor: "rgba(134,239,172,0.5)",
                      }}
                    >
                      {AVAILABILITY_LABEL[f.availability] ?? f.availability}
                    </span>
                  )}
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  {f.sell_min || f.sell_max ? (
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: "#b45309" }}
                    >
                      {f.sell_min} ~ {f.sell_max} G
                    </span>
                  ) : (
                    <span className="text-sm font-bold" style={{ color: "#c4b0cc" }}>
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

// ── Main Page Client ──────────────────────────────────────────────────────────

interface FlowersPageClientProps {
  flowers: FlowerListItem[];
}

export default function FlowersPageClient({ flowers }: FlowersPageClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");
  const [eventFilter, setEventFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

  const levels = useMemo(() => {
    return Array.from(
      new Set(
        flowers.map((f) => f.level).filter((l): l is number => l !== null),
      ),
    ).sort((a, b) => a - b);
  }, [flowers]);

  const tabCounts = useMemo(() => {
    return {
      all: flowers.length,
      always: flowers.filter((f) => f.availability === "always").length,
      event: flowers.filter((f) => f.availability === "event").length,
    };
  }, [flowers]);

  const eventNames = useMemo(() => {
    const names = flowers
      .filter((f) => f.availability === "event" && f.event)
      .map((f) => f.event as string);
    return Array.from(new Set(names)).sort();
  }, [flowers]);

  const filteredFlowers = useMemo(() => {
    let result =
      seasonFilter === "all"
        ? flowers
        : flowers.filter((f) => f.availability === seasonFilter);

    if (seasonFilter === "event" && eventFilter) {
      result = result.filter((f) => f.event === eventFilter);
    }

    if (levelFilter !== null) {
      result = result.filter((f) => f.level === levelFilter);
    }

    if (!search.trim()) return result;

    const query = search.trim().toLowerCase();
    return result.filter((f) => f.name.toLowerCase().includes(query));
  }, [flowers, seasonFilter, eventFilter, levelFilter, search]);

  function handleAvailabilityChange(tab: SeasonFilter) {
    setSeasonFilter(tab);
    setEventFilter(null);
  }

  const tabs: { id: SeasonFilter; label: string; emoji: string }[] = [
    { id: "all", label: "전체", emoji: "✨" },
    { id: "always", label: "일상", emoji: "🌼" },
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
          className="mb-4 flex items-center gap-1.5 text-xs font-bold tracking-wide md:mb-8 md:text-sm"
          style={{ color: "#b080c0" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <Link
            href="/gardening"
            className="transition-colors hover:opacity-80"
          >
            원예
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>꽃 도감</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
              >
                꽃 도감
              </h1>
              <p
                className="mt-1 text-xs md:text-sm"
                style={{ color: "#8a6898" }}
              >
                두근두근타운 꽃 종류
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
          {/* 왼쪽: 탭 버튼 */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="시즌 필터"
          >
            {tabs.map((tab) => {
              const isActive = seasonFilter === tab.id;
              const count = tabCounts[tab.id];

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleAvailabilityChange(tab.id)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-xs font-bold transition-all md:text-sm"
                  style={{
                    background: isActive
                      ? "rgba(248,164,200,0.22)"
                      : "rgba(255,252,254,0.85)",
                    borderColor: isActive
                      ? "rgba(232,115,155,0.55)"
                      : "rgba(230,210,230,0.6)",
                    color: isActive ? "#9b2563" : "#8a6898",
                    boxShadow: isActive
                      ? "0 2px 8px rgba(232,115,155,0.18)"
                      : "none",
                  }}
                >
                  <span aria-hidden>{tab.emoji}</span>
                  {tab.label}
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] md:text-xs"
                    style={{
                      background: isActive
                        ? "rgba(232,115,155,0.2)"
                        : "rgba(230,210,230,0.45)",
                      color: isActive ? "#9b2563" : "#8a6898",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* 이벤트 selectbox — 이벤트 탭 선택 시 인라인으로 표시 */}
            {seasonFilter === "event" && eventNames.length > 0 && (
              <select
                value={eventFilter ?? ""}
                onChange={(e) => setEventFilter(e.target.value || null)}
                aria-label="이벤트 필터"
                className="cursor-pointer rounded-full border-[1.5px] py-1.5 pr-8 pl-3 text-xs font-bold transition-all outline-none md:text-sm"
                style={{
                  background: "white",
                  borderColor: "rgba(255,200,80,0.6)",
                  color: "#9a7020",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a7020' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="">🎉 전체 이벤트</option>
                {eventNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            )}
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
                background: "rgba(255,240,246,0.5)",
                borderColor: "rgba(230,210,230,0.6)",
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
                  원예 Lv.{lv}
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
                placeholder="꽃 이름 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="꽃 이름 검색"
                className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#e8739b] md:py-2.5 md:text-sm"
                style={{
                  background: "rgba(255,240,246,0.5)",
                  borderColor: "rgba(230,210,230,0.6)",
                  color: "#4a3060",
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredFlowers.length === 0 ? (
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
            {filteredFlowers.map((flower) => (
              <FlowerCard key={flower.id} flower={flower} />
            ))}
          </div>
        ) : (
          <FlowerListView flowers={filteredFlowers} />
        )}
      </div>
    </section>
  );
}
