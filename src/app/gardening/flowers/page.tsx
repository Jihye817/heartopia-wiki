"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, Search, Sparkles } from "lucide-react";
import type { Flower, Rarity } from "./_data/flowers";
import { FLOWERS, RARITY_LABEL, RARITY_STYLE } from "./_data/flowers";

// ── Subcomponents ─────────────────────────────────────────────────────────────
interface RarityBadgeProps {
  rarity: Rarity;
}

function RarityBadge({ rarity }: RarityBadgeProps) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${RARITY_STYLE[rarity]}`}
    >
      {RARITY_LABEL[rarity]}
    </span>
  );
}

interface FlowerCardProps {
  flower: Flower;
}

function FlowerCard({ flower }: FlowerCardProps) {
  return (
    <Link
      href={`/gardening/flowers/detail/${flower.id}`}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] px-6 pb-6 pt-7 no-underline transition-all duration-300 ease-out"
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
      <div
        className="absolute -bottom-2.5 -right-2.5 text-[#f8a4c8] opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1]"
        style={{
          transform: "scale(2) rotate(-10deg)",
          transformOrigin: "bottom right",
        }}
        aria-hidden
      >
        <span className="text-4xl">🌸</span>
      </div>

      <div
        className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-[1.5px] text-3xl transition-transform duration-300 group-hover:scale-105"
        style={{
          background: "rgba(248,164,200,0.15)",
          borderColor: "rgba(248,164,200,0.35)",
        }}
      >
        {flower.emoji}
      </div>

      <div className="mb-3.5">
        <div
          className="text-xl font-bold leading-tight"
          style={{ color: "#4a3060" }}
        >
          {flower.ko}
        </div>
      </div>

      <div
        className="mb-3.5 h-px"
        style={{
          background: "linear-gradient(to right, #ffd6e8, transparent)",
        }}
      />

      <p
        className="mb-3 text-[13px] leading-relaxed"
        style={{ color: "#8a6898" }}
      >
        {flower.desc}
      </p>

      <div className="flex flex-wrap gap-1.5">
        <span
          className="rounded-full border px-2.5 py-1 text-xs font-bold"
          style={{
            background: "rgba(248,164,200,0.2)",
            color: "#c06898",
            borderColor: "rgba(248,164,200,0.4)",
          }}
        >
          {flower.stages} 단계
        </span>
        <RarityBadge rarity={flower.rarity} />
      </div>
    </Link>
  );
}

interface FlowerListViewProps {
  flowers: Flower[];
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
            {["꽃 이름", "설명", "성장 단계", "희귀도"].map((h) => (
              <th
                key={h}
                className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider"
                style={{ color: "#b080c0" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flowers.map((f) => (
            <tr
              key={f.id}
              className="border-b border-[rgba(230,210,230,0.4)] last:border-0 transition-colors hover:bg-[#fff0f6]/50"
            >
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span className="mr-2.5 text-xl">{f.emoji}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#4a3060" }}
                  >
                    {f.ko}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 text-sm no-underline transition-opacity hover:opacity-90"
                  style={{ color: "#8a6898" }}
                >
                  {f.desc}
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-bold"
                    style={{
                      background: "rgba(248,164,200,0.2)",
                      color: "#c06898",
                      borderColor: "rgba(248,164,200,0.4)",
                    }}
                  >
                    {f.stages} 단계
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/gardening/flowers/detail/${f.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <RarityBadge rarity={f.rarity} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FlowersPage() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");

  const filteredFlowers = FLOWERS.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.ko.includes(search) ||
      f.desc.includes(search)
  );

  return (
    <section
      className="px-6 pb-16 pt-8"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Breadcrumb */}
        <nav
          className="mb-8 flex items-center gap-1.5 text-xs font-bold tracking-wide"
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
                className="m-0 text-[clamp(24px,4vw,34px)] font-bold tracking-tight"
                style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
              >
                꽃 도감
              </h1>
              <p className="mt-1 text-sm" style={{ color: "#8a6898" }}>
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
                  className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all"
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

        {/* Toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="relative max-w-xs flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
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
              className="w-full rounded-xl border-[1.5px] py-2.5 pl-9 pr-4 text-sm outline-none transition-all placeholder:opacity-70 focus:border-[#e8739b]"
              style={{
                background: "rgba(255,240,246,0.5)",
                borderColor: "rgba(230,210,230,0.6)",
                color: "#4a3060",
              }}
            />
          </div>
          <span
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold"
            style={{
              background: "rgba(248,164,200,0.15)",
              borderColor: "rgba(248,164,200,0.4)",
              color: "#c06898",
            }}
          >
            <Sparkles size={12} aria-hidden />
            {filteredFlowers.length}종
          </span>
        </div>

        {/* Content */}
        {filteredFlowers.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-3 text-4xl" aria-hidden>
              🔍
            </div>
            <p className="text-sm" style={{ color: "#8a6898" }}>
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
