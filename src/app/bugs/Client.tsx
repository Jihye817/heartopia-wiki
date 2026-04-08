"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LayoutGrid, List, MapPin, Search } from "lucide-react";
import type { BugListItem } from "./_data/bugs";

// ── Constants ──────────────────────────────────────────────────────────────────

const BUG_TINT = "139, 195, 74";
const BUG_BORDER = "rgba(139,195,74,0.6)";
const BUG_BG_HOVER = "#f1f8e9";


// ── Subcomponents ──────────────────────────────────────────────────────────────

function BugCard({ bug, hideImage }: { bug: BugListItem; hideImage: boolean }) {
  return (
    <Link
      href={`/bugs/detail/${bug.id}`}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
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
      {/* 썸네일 */}
      <div className="mb-4 flex justify-center">
        <div
          className="inline-flex h-[110px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-4 text-5xl transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `rgba(${BUG_TINT},0.15)`,
            borderColor: `rgba(${BUG_TINT},0.35)`,
          }}
        >
          {!hideImage && bug.thumbnail ? (
            <Image
              src={bug.thumbnail}
              alt=""
              width={110}
              height={110}
              className="h-full w-full object-contain"
            />
          ) : (
            <span aria-hidden>{bug.emoji || "🦋"}</span>
          )}
        </div>
      </div>

      {/* 이름 */}
      <div className="mb-3 text-center">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {bug.name}
        </div>
      </div>

      {/* 뱃지 */}
      <div className="mb-3.5 flex flex-wrap justify-center gap-1.5">
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
        {bug.availability === "event" ? (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: "rgba(255,220,130,0.25)",
              color: "#9a7020",
              borderColor: "rgba(255,220,130,0.55)",
            }}
          >
            이벤트
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
      {bug.bug_grades.length > 0 && (
        <>
          <div
            className="mb-3 h-px"
            style={{ background: `rgba(${BUG_TINT},0.4)` }}
          />
          <div className="grid grid-cols-5 gap-1">
            {bug.bug_grades.map((g) => (
              <div
                key={g.stars}
                className="flex flex-col items-center rounded-lg border py-1.5"
                style={{
                  background: "rgba(245,245,247,0.7)",
                  borderColor: "rgba(209,213,219,0.5)",
                }}
              >
                <span className="text-xs font-bold text-amber-500">{g.stars}★</span>
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

function BugListView({ bugs, hideImage }: { bugs: BugListItem[]; hideImage: boolean }) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,254,0.9)",
        borderColor: `rgba(${BUG_TINT},0.34)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full min-w-[620px]">
        <thead>
          <tr
            className="border-b-[1.5px]"
            style={{ borderColor: `rgba(${BUG_TINT},0.4)` }}
          >
            {["이름", "레벨", "서식지", "위치", "판매 가격"].map((h) => (
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
          {bugs.map((bug) => (
            <tr
              key={bug.id}
              className="border-b last:border-0 transition-colors hover:bg-[#f1f8e9]/50"
              style={{ borderColor: `rgba(${BUG_TINT},0.3)` }}
            >
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="flex items-center px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <div
                    className="mr-2.5 inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1.5px]"
                    style={{
                      background: `rgba(${BUG_TINT},0.18)`,
                      borderColor: `rgba(${BUG_TINT},0.4)`,
                    }}
                  >
                    {!hideImage && bug.thumbnail ? (
                      <Image
                        src={bug.thumbnail}
                        alt=""
                        width={28}
                        height={28}
                        className="h-4/5 w-4/5 object-contain"
                      />
                    ) : (
                      <span className="text-sm" aria-hidden>
                        {bug.emoji || "🦋"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold" style={{ color: "#4a3060" }}>
                    {bug.name}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
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
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
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
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
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
                    {bug.location || "-"}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  {bug.sellMin || bug.sellMax ? (
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: "#b45309" }}
                    >
                      {bug.sellMin} ~ {bug.sellMax} G
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

// ── Main ───────────────────────────────────────────────────────────────────────

type AvailFilter = "전체" | "일상" | "이벤트";

interface BugsClientProps {
  bugs: BugListItem[];
}

export default function BugsClient({ bugs }: BugsClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [hideImage, setHideImage] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHideImage(sessionStorage.getItem("bugs_hideImage") === "true");
  }, []);

  function toggleHideImage() {
    setHideImage((v) => {
      const next = !v;
      sessionStorage.setItem("bugs_hideImage", String(next));
      return next;
    });
  }
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState<AvailFilter>("전체");
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

  const levels = useMemo(() => {
    return Array.from(
      new Set(
        bugs.map((b) => b.level).filter((l): l is number => l !== null && l > 0),
      ),
    ).sort((a, b) => a - b);
  }, [bugs]);

  const tabCounts = useMemo(() => ({
    전체: bugs.length,
    일상: bugs.filter((b) => b.availability !== "event").length,
    이벤트: bugs.filter((b) => b.availability === "event").length,
  }), [bugs]);

  const filtered = useMemo(() => {
    let result =
      availFilter === "일상" ? bugs.filter((b) => b.availability !== "event")
      : availFilter === "이벤트" ? bugs.filter((b) => b.availability === "event")
      : bugs;
    if (levelFilter !== null) result = result.filter((b) => b.level === levelFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q));
    }
    return result;
  }, [bugs, availFilter, levelFilter, search]);

  const availTabs: { id: AvailFilter; label: string; emoji: string }[] = [
    { id: "전체", label: "전체", emoji: "✨" },
    { id: "일상", label: "일상", emoji: "🌿" },
    { id: "이벤트", label: "이벤트", emoji: "🎉" },
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
          <span style={{ color: "#6b4a7a" }}>곤충 도감</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
              >
                곤충 도감
              </h1>
              <p className="mt-1 text-xs md:text-sm" style={{ color: "#8a6898" }}>
                두근두근타운 곤충 종류
              </p>
            </div>

            {/* 사진가리기 + View Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleHideImage}
                aria-pressed={hideImage}
                aria-label="사진 가리기"
                className="flex items-center justify-center rounded-xl p-2 transition-all"
                style={{
                  background: hideImage ? "rgba(139,195,74,0.2)" : "rgba(189,225,150,0.3)",
                  color: hideImage ? "#5a8a28" : "#8a6898",
                  border: hideImage ? "1.5px solid rgba(139,195,74,0.5)" : "1.5px solid transparent",
                }}
              >
                {hideImage ? <EyeOff size={16} strokeWidth={2.2} /> : <Eye size={16} strokeWidth={2.2} />}
              </button>

            {/* View Toggle */}
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "rgba(189,225,150,0.3)" }}
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
            </div>{/* 사진가리기 + View Toggle 래퍼 끝 */}
          </div>
        </div>

        {/* Filter + Search 통합 행 */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {/* 왼쪽: 일상/이벤트 탭 */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="가용 필터">
            {availTabs.map((tab) => {
              const isActive = availFilter === tab.id;
              const count = tabCounts[tab.id];
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
                      ? `rgba(${BUG_TINT},0.2)`
                      : "rgba(255,252,254,0.85)",
                    borderColor: isActive
                      ? `rgba(${BUG_TINT},0.6)`
                      : `rgba(${BUG_TINT},0.3)`,
                    color: isActive ? "#5a8a28" : "#8a6898",
                    boxShadow: isActive
                      ? `0 2px 8px rgba(${BUG_TINT},0.25)`
                      : "none",
                  }}
                >
                  <span aria-hidden>{tab.emoji}</span>
                  {tab.label}
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] md:text-xs"
                    style={{
                      background: isActive
                        ? `rgba(${BUG_TINT},0.25)`
                        : "rgba(189,225,150,0.35)",
                      color: isActive ? "#5a8a28" : "#8a6898",
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
            {/* 레벨 셀렉트 */}
            <select
              value={levelFilter ?? ""}
              onChange={(e) =>
                setLevelFilter(e.target.value ? Number(e.target.value) : null)
              }
              aria-label="레벨 필터"
              className="rounded-xl border-[1.5px] py-2 pr-8 pl-3 text-xs font-bold transition-all outline-none md:py-2.5 md:text-sm"
              style={{
                background: "rgba(241,248,233,0.5)",
                borderColor: `rgba(${BUG_TINT},0.4)`,
                color: levelFilter !== null ? "#5a8a28" : "#8a6898",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a6898' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="">전체 레벨</option>
              {levels.map((lv) => (
                <option key={lv} value={lv}>
                  채집 Lv.{lv}
                </option>
              ))}
            </select>

            {/* 검색 */}
            <div className="relative w-40 md:w-52">
              <Search
                size={14}
                className="absolute top-1/2 left-3 -translate-y-1/2"
                style={{ color: "#8a6898" }}
                strokeWidth={2.2}
                aria-hidden
              />
              <input
                type="search"
                placeholder="이름 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="곤충 이름 검색"
                className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#8bc34a] md:py-2.5 md:text-sm"
                style={{
                  background: "rgba(241,248,233,0.5)",
                  borderColor: `rgba(${BUG_TINT},0.4)`,
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
            {filtered.map((bug) => (
              <BugCard key={bug.id} bug={bug} hideImage={hideImage} />
            ))}
          </div>
        ) : (
          <BugListView bugs={filtered} hideImage={hideImage} />
        )}
      </div>
    </section>
  );
}
