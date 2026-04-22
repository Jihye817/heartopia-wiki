"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import type { Npc, NpcCategory } from "./_data/npcs";

const CATEGORY_LABEL: NpcCategory[] = ["상점", "사건", "퀘스트", "가이드", "주민"];

const CATEGORY_COLOR: Record<
  NpcCategory,
  { bg: string; color: string; border: string }
> = {
  상점: { bg: "#EEF6F0", color: "#5B9A6F", border: "#C8E0CF" },
  사건: { bg: "#FFF4ED", color: "#C06A2A", border: "#F0D0B8" },
  퀘스트: { bg: "#F0EBFF", color: "#7B5EAE", border: "#D8C8F0" },
  가이드: { bg: "#EFF6FF", color: "#3B7AC4", border: "#C0D8F0" },
  주민: { bg: "#FFF0F6", color: "#C4507A", border: "#F0C0D8" },
};

function CategoryBadge({ category }: { category: NpcCategory }) {
  const c = CATEGORY_COLOR[category];
  return (
    <span
      className="rounded-full border px-2.5 py-0.5 text-sm font-semibold"
      style={{ background: c.bg, color: c.color, borderColor: c.border }}
    >
      {category}
    </span>
  );
}

function NpcCard({ npc }: { npc: Npc }) {
  return (
    <Link
      href={`/npc/detail/${npc.id}`}
      className="group flex flex-col items-center rounded-2xl border border-[var(--wiki-border)] bg-white px-5 pt-6 pb-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b8920a33] hover:shadow-[0_8px_24px_rgba(184,146,10,0.10)]"
    >
      {/* 썸네일 */}
      <div
        className="mb-4 flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-xl border bg-[var(--wiki-cat-npc-bg)] p-2 transition-transform duration-200 group-hover:scale-105"
        style={{ borderColor: "#e8d080" }}
      >
        {npc.thumbnail ? (
          <div className="relative h-full w-full">
            <Image src={npc.thumbnail} alt="" fill className="object-contain" />
          </div>
        ) : (
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--wiki-cat-npc)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="7"
              r="4"
              fill="var(--wiki-cat-npc)"
              fillOpacity="0.2"
              stroke="var(--wiki-cat-npc)"
            />
            <path
              d="M4 21c0-4.42 3.58-8 8-8s8 3.58 8 8"
              fill="var(--wiki-cat-npc)"
              fillOpacity="0.12"
              stroke="var(--wiki-cat-npc)"
            />
          </svg>
        )}
      </div>

      {/* 이름 */}
      <div
        className="mb-2.5 text-xl font-bold"
        style={{ color: "var(--wiki-text-primary)" }}
      >
        {npc.name}
      </div>

      {/* 카테고리 뱃지 */}
      <div className="mb-3 flex flex-wrap justify-center gap-1.5">
        {npc.category.map((cat) => (
          <CategoryBadge key={cat} category={cat} />
        ))}
      </div>

      {/* 설명 */}
      {npc.description && (
        <p
          className="mb-4 text-center text-sm leading-relaxed"
          style={{ color: "var(--wiki-text-secondary)" }}
        >
          {npc.description}
        </p>
      )}

      {/* 위치 & 해금 */}
      <div className="w-full space-y-1.5 border-t border-[var(--wiki-border-light)] pt-3.5">
        {npc.location && (
          <div
            className="flex items-center justify-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 1 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {npc.location}
          </div>
        )}
        {npc.unlock_level != null && (
          <div className="flex items-center justify-center rounded-md border border-[var(--wiki-border-light)] bg-[var(--wiki-bg)] py-1.5">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--wiki-cat-npc)" }}
            >
              Lv.{npc.unlock_level} 해금
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

interface NpcPageClientProps {
  npcs: Npc[];
}

export default function NpcPageClient({ npcs }: NpcPageClientProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<NpcCategory | "">("");

  const filtered = useMemo(() => {
    let result = npcs;
    if (categoryFilter)
      result = result.filter((n) => n.category.includes(categoryFilter));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((n) => n.name.toLowerCase().includes(q));
    }
    return result;
  }, [npcs, categoryFilter, search]);

  const categoryCounts = useMemo(() => {
    const counts: Record<NpcCategory, number> = {
      상점: 0,
      사건: 0,
      퀘스트: 0,
      가이드: 0,
      주민: 0,
    };
    for (const npc of npcs) {
      for (const cat of npc.category) counts[cat]++;
    }
    return counts;
  }, [npcs]);

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
            NPC
          </span>
        </nav>

        {/* Header */}
        <div className="mb-7" style={{ animation: "fadeUp 0.4s ease-out" }}>
          <h1
            className="m-0 mb-1 text-3xl font-bold tracking-tight"
            style={{
              color: "var(--wiki-text-primary)",
              fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            NPC 도감
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            마을 주민과 캐릭터 정보
          </p>
        </div>

        {/* Filter Bar */}
        <div
          className="mb-5 flex flex-wrap items-center gap-3"
          style={{ animation: "fadeUp 0.4s ease-out 0.05s both" }}
        >
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="카테고리 필터"
          >
            <button
              type="button"
              role="tab"
              aria-selected={categoryFilter === ""}
              onClick={() => setCategoryFilter("")}
              className="flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-all"
              style={{
                background:
                  categoryFilter === "" ? "var(--wiki-cat-npc-bg)" : "white",
                borderColor:
                  categoryFilter === "" ? "#e0c860" : "var(--wiki-border)",
                color:
                  categoryFilter === ""
                    ? "var(--wiki-cat-npc)"
                    : "var(--wiki-text-secondary)",
              }}
            >
              전체
              <span
                className="rounded-[10px] px-1.5 py-0.5 text-sm"
                style={{
                  background:
                    categoryFilter === ""
                      ? "rgba(184,146,10,0.15)"
                      : "var(--wiki-border-light)",
                  color:
                    categoryFilter === ""
                      ? "var(--wiki-cat-npc)"
                      : "var(--wiki-text-tertiary)",
                }}
              >
                {npcs.length}
              </span>
            </button>
            {CATEGORY_LABEL.map((cat) => {
              const isActive = categoryFilter === cat;
              const c = CATEGORY_COLOR[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategoryFilter(isActive ? "" : cat)}
                  className="flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-all"
                  style={{
                    background: isActive ? c.bg : "white",
                    borderColor: isActive ? c.border : "var(--wiki-border)",
                    color: isActive ? c.color : "var(--wiki-text-secondary)",
                  }}
                >
                  {cat}
                  <span
                    className="rounded-[10px] px-1.5 py-0.5 text-sm"
                    style={{
                      background: isActive
                        ? `${c.color}22`
                        : "var(--wiki-border-light)",
                      color: isActive ? c.color : "var(--wiki-text-tertiary)",
                    }}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ml-auto">
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
                placeholder="이름 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="NPC 이름 검색"
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
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
              {filtered.map((npc) => (
                <NpcCard key={npc.id} npc={npc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
