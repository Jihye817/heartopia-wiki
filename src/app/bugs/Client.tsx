"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, LayoutGrid, List, Search } from "lucide-react";
import type { BugListItem } from "./_data/bugs";

type AvailFilter = "전체" | "일상" | "이벤트";

// ── Subcomponents ─────────────────────────────────────────────────────────────

function BugCard({ bug, hideImage }: { bug: BugListItem; hideImage: boolean }) {
  return (
    <Link
      href={`/bugs/detail/${bug.id}`}
      className="group flex flex-col items-center rounded-2xl border border-[var(--wiki-border)] bg-white px-5 pt-6 pb-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#689f3866] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      {/* 썸네일 */}
      <div
        className="mb-4 flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-xl border bg-[var(--wiki-cat-bugs-bg)] p-2 transition-transform duration-200 group-hover:scale-105"
        style={{ borderColor: "#c5e6a0" }}
      >
        {!hideImage && bug.thumbnail ? (
          <div className="relative h-full w-full">
            <Image src={bug.thumbnail} alt="" fill className="object-contain" />
          </div>
        ) : (
          <span className="text-4xl" aria-hidden>
            {bug.emoji || "🦋"}
          </span>
        )}
      </div>

      {/* 곤충 이름 */}
      <div
        className="mb-2.5 text-xl font-bold"
        style={{ color: "var(--wiki-text-primary)" }}
      >
        {bug.name}
      </div>

      {/* 뱃지 */}
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        {bug.level !== null && bug.availability !== "event" && (
          <span className="rounded-full border border-[#C8DFF0] bg-[#EBF3F9] px-2.5 py-0.5 text-sm font-semibold text-[#4A8DB7]">
            채집 Lv.{bug.level}
          </span>
        )}
        {bug.availability === "event" ? (
          <span className="rounded-full border border-[#F0D4C0] bg-[#FDF2EC] px-2.5 py-0.5 text-sm font-semibold text-[#D4845A]">
            이벤트
          </span>
        ) : (
          <span className="rounded-full border border-[#C8E0CF] bg-[#EEF6F0] px-2.5 py-0.5 text-sm font-semibold text-[#5B9A6F]">
            일상
          </span>
        )}
      </div>

      {/* 성급별 가격 */}
      {bug.bug_grades.length > 0 && (
        <div className="grid w-full grid-cols-5 gap-1 border-t border-[var(--wiki-border-light)] pt-3.5">
          {bug.bug_grades.map((g) => (
            <div
              key={g.stars}
              className="flex flex-col items-center gap-1 rounded-md border border-[var(--wiki-border-light)] bg-[var(--wiki-bg)] py-1.5"
            >
              <span className="text-sm font-bold text-amber-500">
                {g.stars}★
              </span>
              <div
                className="h-px w-3.5"
                style={{ background: "var(--wiki-border)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--wiki-text-secondary)" }}
              >
                {g.sellPrice ?? "-"}
              </span>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}

function BugListView({
  bugs,
  hideImage,
}: {
  bugs: BugListItem[];
  hideImage: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--wiki-border-light)] bg-white">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="border-b border-[var(--wiki-border-light)] bg-[var(--wiki-bg)]">
            {["이름", "레벨", "서식지", "위치", "판매 가격"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-sm font-semibold tracking-wide"
                style={{ color: "var(--wiki-text-tertiary)" }}
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
              className="border-b border-[var(--wiki-border-light)] transition-colors last:border-0 hover:bg-[rgba(0,0,0,0.015)]"
            >
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="flex items-center gap-2.5 px-4 py-3 no-underline"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[var(--wiki-cat-bugs-bg)]">
                    {!hideImage && bug.thumbnail ? (
                      <Image
                        src={bug.thumbnail}
                        alt=""
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-sm" aria-hidden>
                        {bug.emoji || "🦋"}
                      </span>
                    )}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--wiki-text-primary)" }}
                  >
                    {bug.name}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="block px-4 py-3 no-underline"
                >
                  {bug.level !== null && bug.availability !== "event" && (
                    <span className="rounded-full border border-[#C8DFF0] bg-[#EBF3F9] px-2.5 py-0.5 text-sm font-semibold text-[#4A8DB7]">
                      Lv.{bug.level}
                    </span>
                  )}
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="block px-4 py-3 no-underline"
                >
                  <span className="rounded-full border border-[#c5e6a0] bg-[var(--wiki-cat-bugs-bg)] px-2.5 py-0.5 text-sm font-semibold text-[#689f38]">
                    {bug.habitat}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="block px-4 py-3 no-underline"
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--wiki-text-secondary)" }}
                  >
                    {bug.location || "-"}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/bugs/detail/${bug.id}`}
                  className="block px-4 py-3 no-underline"
                >
                  {bug.sellMin || bug.sellMax ? (
                    <span
                      className="text-sm font-semibold whitespace-nowrap tabular-nums"
                      style={{ color: "#b45309" }}
                    >
                      {bug.sellMin} ~ {bug.sellMax} G
                    </span>
                  ) : (
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--wiki-text-muted)" }}
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

// ── Main Page Client ──────────────────────────────────────────────────────────

interface BugsClientProps {
  bugs: BugListItem[];
}

export default function BugsClient({ bugs }: BugsClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [hideImage, setHideImage] = useState(false);
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState<AvailFilter>("전체");
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

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

  const levels = useMemo(() => {
    return Array.from(
      new Set(
        bugs
          .map((b) => b.level)
          .filter((l): l is number => l !== null && l > 0),
      ),
    ).sort((a, b) => a - b);
  }, [bugs]);

  const tabCounts = useMemo(
    () => ({
      전체: bugs.length,
      일상: bugs.filter((b) => b.availability !== "event").length,
      이벤트: bugs.filter((b) => b.availability === "event").length,
    }),
    [bugs],
  );

  const filtered = useMemo(() => {
    let result =
      availFilter === "일상"
        ? bugs.filter((b) => b.availability !== "event")
        : availFilter === "이벤트"
          ? bugs.filter((b) => b.availability === "event")
          : bugs;
    if (levelFilter !== null)
      result = result.filter((b) => b.level === levelFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q));
    }
    return result;
  }, [bugs, availFilter, levelFilter, search]);

  const tabs: { id: AvailFilter; label: string }[] = [
    { id: "전체", label: "전체" },
    { id: "일상", label: "일상" },
    { id: "이벤트", label: "이벤트" },
  ];

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
            곤충 도감
          </span>
        </nav>

        {/* Page Header */}
        <div
          className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          style={{ animation: "fadeUp 0.4s ease-out" }}
        >
          <div>
            <h1
              className="m-0 mb-1 text-3xl font-bold tracking-tight"
              style={{
                color: "var(--wiki-text-primary)",
                fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              곤충 도감
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--wiki-text-secondary)" }}
            >
              두근두근타운 곤충 종류
            </p>
          </div>

          {/* 사진 가리기 + View Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleHideImage}
              aria-pressed={hideImage}
              aria-label="사진 가리기"
              className="flex h-8 items-center gap-1.5 rounded-lg border px-3 text-sm font-semibold transition-all"
              style={{
                background: hideImage ? "var(--wiki-cat-bugs-bg)" : "white",
                borderColor: hideImage ? "#c5e6a0" : "var(--wiki-border)",
                color: hideImage ? "#689f38" : "var(--wiki-text-tertiary)",
              }}
            >
              {hideImage ? (
                <Eye size={14} strokeWidth={2.2} />
              ) : (
                <EyeOff size={14} strokeWidth={2.2} />
              )}
              {hideImage ? "사진 보기" : "사진 가리기"}
            </button>

            <div
              className="flex w-fit gap-0.5 rounded-lg bg-[var(--wiki-border-light)] p-0.5"
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
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-all"
                  style={{
                    background: viewMode === mode ? "white" : "transparent",
                    color:
                      viewMode === mode
                        ? "var(--wiki-text-primary)"
                        : "var(--wiki-text-tertiary)",
                    boxShadow:
                      viewMode === mode ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
                  }}
                >
                  <Icon size={14} strokeWidth={2.2} aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          className="mb-5 flex flex-wrap items-center gap-3"
          style={{ animation: "fadeUp 0.4s ease-out 0.05s both" }}
        >
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="가용 필터"
          >
            {tabs.map((tab) => {
              const isActive = availFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setAvailFilter(tab.id)}
                  className="flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-all"
                  style={{
                    background: isActive ? "var(--wiki-cat-bugs-bg)" : "white",
                    borderColor: isActive ? "#c5e6a0" : "var(--wiki-border)",
                    color: isActive
                      ? "var(--wiki-cat-bugs)"
                      : "var(--wiki-text-secondary)",
                  }}
                >
                  {tab.label}
                  <span
                    className="rounded-[10px] px-1.5 py-0.5 text-sm"
                    style={{
                      background: isActive
                        ? "rgba(104,159,56,0.15)"
                        : "var(--wiki-border-light)",
                      color: isActive
                        ? "var(--wiki-cat-bugs)"
                        : "var(--wiki-text-tertiary)",
                    }}
                  >
                    {tabCounts[tab.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <select
              value={levelFilter ?? ""}
              onChange={(e) =>
                setLevelFilter(e.target.value ? Number(e.target.value) : null)
              }
              aria-label="레벨 필터"
              className="h-[34px] cursor-pointer rounded-lg border border-[var(--wiki-border)] bg-white pr-8 pl-3 text-sm font-semibold transition-all outline-none"
              style={{
                color:
                  levelFilter !== null
                    ? "#4A8DB7"
                    : "var(--wiki-text-secondary)",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
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

            <div className="relative w-44 md:w-52">
              <Search
                size={14}
                className="absolute top-1/2 left-3 -translate-y-1/2"
                style={{ color: "var(--wiki-text-muted)" }}
                strokeWidth={2.2}
                aria-hidden
              />
              <input
                type="search"
                placeholder="곤충 이름 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="곤충 이름 검색"
                className="h-[34px] w-full rounded-lg border border-[var(--wiki-border)] bg-white pr-4 pl-8 text-sm transition-all outline-none placeholder:text-[var(--wiki-text-muted)] focus:border-[var(--wiki-text-muted)]"
                style={{ color: "var(--wiki-text-primary)" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}>
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-3 text-4xl" aria-hidden>
                🔍
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--wiki-text-tertiary)" }}
              >
                검색 결과가 없어요
              </p>
            </div>
          ) : viewMode === "card" ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {filtered.map((bug) => (
                <BugCard key={bug.id} bug={bug} hideImage={hideImage} />
              ))}
            </div>
          ) : (
            <BugListView bugs={filtered} hideImage={hideImage} />
          )}
        </div>
      </div>
    </section>
  );
}
