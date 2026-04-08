"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, MapPin, Search } from "lucide-react";
import type { Product, ProductCategory } from "./_data/products";

// ── Brand colors (기타 수집 계열) ──────────────────────────────────────────────
// category-section.tsx: color "#7b8fa3", accent "#5a6f82", bg "#f4f7fa", border "#d8e0e8"

const BRAND_TINT = "123, 143, 163";
const BRAND_ACCENT = "#5a6f82";
const BRAND_LIGHT = "#7b8fa3";
const BRAND_BG = "#f4f7fa";
const BRAND_BORDER = "rgba(216, 224, 232, 0.6)";

// ── Category colors (뱃지·썸네일은 카테고리별 유지) ──────────────────────────

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  mushroom: "버섯",
  fruit: "과일",
  wood: "나무",
  stone: "돌",
};

const CATEGORY_EMOJI: Record<ProductCategory, string> = {
  mushroom: "🍄",
  fruit: "🍎",
  wood: "🪵",
  stone: "🪨",
};

const CATEGORY_TINT: Record<ProductCategory, string> = {
  mushroom: "160, 100, 220",
  fruit: "232, 120, 140",
  wood: "100, 160, 80",
  stone: "150, 150, 170",
};


// ── Subcomponents ──────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const catTint = CATEGORY_TINT[product.category] ?? "150, 150, 150";
  const emoji = CATEGORY_EMOJI[product.category] ?? "📦";

  return (
    <Link
      href={`/others/products/detail/${product.id}`}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,252,254,0.9)",
        border: `1.5px solid rgba(${BRAND_TINT},0.32)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = BRAND_BG;
        e.currentTarget.style.borderColor = `rgba(${BRAND_TINT},0.6)`;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px rgba(${BRAND_TINT},0.38)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,252,254,0.9)";
        e.currentTarget.style.borderColor = `rgba(${BRAND_TINT},0.32)`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      {/* 썸네일 */}
      <div className="mb-4 flex justify-center">
        <div
          className="inline-flex h-[110px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-4 text-5xl transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `rgba(${BRAND_TINT},0.15)`,
            borderColor: `rgba(${BRAND_TINT},0.35)`,
          }}
        >
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt=""
              width={110}
              height={110}
              className="h-full w-full object-contain"
            />
          ) : (
            <span aria-hidden>{emoji}</span>
          )}
        </div>
      </div>

      {/* 이름 */}
      <div className="mb-3 text-center">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {product.name}
        </div>
      </div>

      {/* 뱃지 */}
      <div className="mb-3.5 flex flex-wrap justify-center gap-1.5">
        <span
          className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
          style={{
            background: `rgba(${catTint},0.2)`,
            color: "#6b4a7a",
            borderColor: `rgba(${catTint},0.45)`,
          }}
        >
          {CATEGORY_LABEL[product.category]}
        </span>
        {product.respawn_time && (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
            style={{
              background: `rgba(${BRAND_TINT},0.15)`,
              color: BRAND_ACCENT,
              borderColor: `rgba(${BRAND_TINT},0.35)`,
            }}
          >
            {product.respawn_time}
          </span>
        )}
      </div>

      {/* 판매가 */}
      {product.sell_price != null && (
        <>
          <div
            className="mb-3 h-px"
            style={{ background: `rgba(${BRAND_TINT},0.35)` }}
          />
          <div
            className="flex items-center justify-center rounded-lg border py-1.5"
            style={{
              background: "rgba(245,245,247,0.7)",
              borderColor: "rgba(209,213,219,0.5)",
            }}
          >
            <span
              className="text-sm font-bold tabular-nums"
              style={{ color: "#6b7280" }}
            >
              💰 {product.sell_price.toLocaleString()} G
            </span>
          </div>
        </>
      )}

      {/* 위치 */}
      {product.location && (
        <div className="mt-3 flex justify-center">
          <span
            className="flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-bold md:text-[13px]"
            style={{
              background: "rgba(255,245,235,0.9)",
              borderColor: "rgba(210,170,120,0.5)",
              color: "#8a6020",
            }}
          >
            <MapPin size={11} strokeWidth={2.2} aria-hidden />
            {product.location}
          </span>
        </div>
      )}
    </Link>
  );
}

function ProductListView({ products }: { products: Product[] }) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,254,0.9)",
        borderColor: BRAND_BORDER,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full min-w-[540px]">
        <thead>
          <tr className="border-b-[1.5px]" style={{ borderColor: BRAND_BORDER }}>
            {["이름", "분류", "채집 장소", "리스폰", "판매 가격"].map((h) => (
              <th
                key={h}
                className="px-4 py-3.5 text-left text-sm font-bold tracking-wider uppercase"
                style={{ color: BRAND_LIGHT }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const catTint = CATEGORY_TINT[product.category] ?? "150, 150, 150";
            const emoji = CATEGORY_EMOJI[product.category] ?? "📦";
            return (
              <tr
                key={product.id}
                className="border-b last:border-0 transition-colors"
                style={{ borderColor: `rgba(${BRAND_TINT},0.25)` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = BRAND_BG;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="flex items-center px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                  >
                    <div
                      className="mr-2.5 inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1.5px]"
                      style={{
                        background: `rgba(${catTint},0.18)`,
                        borderColor: `rgba(${catTint},0.4)`,
                      }}
                    >
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt=""
                          width={28}
                          height={28}
                          className="h-4/5 w-4/5 object-contain"
                        />
                      ) : (
                        <span className="text-sm" aria-hidden>
                          {emoji}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold" style={{ color: "#4a3060" }}>
                      {product.name}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                  >
                    <span
                      className="rounded-full border px-2.5 py-1 text-sm font-bold"
                      style={{
                        background: `rgba(${catTint},0.2)`,
                        color: "#6b4a7a",
                        borderColor: `rgba(${catTint},0.45)`,
                      }}
                    >
                      {CATEGORY_LABEL[product.category]}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
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
                      {product.location || "-"}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                  >
                    <span
                      className="rounded-full border px-2.5 py-1 text-sm font-bold"
                      style={{
                        background: `rgba(${BRAND_TINT},0.15)`,
                        color: BRAND_ACCENT,
                        borderColor: `rgba(${BRAND_TINT},0.35)`,
                      }}
                    >
                      {product.respawn_time || "-"}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                  >
                    {product.sell_price != null ? (
                      <span
                        className="text-sm font-bold tabular-nums"
                        style={{ color: "#b45309" }}
                      >
                        {product.sell_price.toLocaleString()} G
                      </span>
                    ) : (
                      <span className="text-sm font-bold" style={{ color: "#c4b0cc" }}>
                        -
                      </span>
                    )}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

type CategoryFilter = "all" | ProductCategory;

interface ProductsPageClientProps {
  products: Product[];
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const tabCounts = useMemo(
    () => ({
      all: products.length,
      mushroom: products.filter((p) => p.category === "mushroom").length,
      fruit: products.filter((p) => p.category === "fruit").length,
      wood: products.filter((p) => p.category === "wood").length,
      stone: products.filter((p) => p.category === "stone").length,
    }),
    [products],
  );

  const filtered = useMemo(() => {
    let result = products;
    if (categoryFilter !== "all")
      result = result.filter((p) => p.category === categoryFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [products, categoryFilter, search]);

  const tabs: { id: CategoryFilter; label: string; emoji: string }[] = [
    { id: "all", label: "전체", emoji: "✨" },
    { id: "mushroom", label: "버섯", emoji: "🍄" },
    { id: "fruit", label: "과일", emoji: "🍎" },
    { id: "wood", label: "나무", emoji: "🪵" },
    { id: "stone", label: "돌", emoji: "🪨" },
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
          style={{ color: BRAND_LIGHT }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(123,143,163,0.5)" }}>›</span>
          <Link href="/others" className="transition-colors hover:opacity-80">
            기타 수집
          </Link>
          <span style={{ color: "rgba(123,143,163,0.5)" }}>›</span>
          <span style={{ color: BRAND_ACCENT }}>생산품 도감</span>
        </nav>

        {/* Header */}
        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: BRAND_ACCENT, letterSpacing: "-0.02em" }}
              >
                생산품 도감
              </h1>
              <p className="mt-1 text-xs md:text-sm" style={{ color: BRAND_LIGHT }}>
                맵에서 채집할 수 있는 버섯·과일·나무·돌 정보
              </p>
            </div>

            {/* View Toggle */}
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: `rgba(${BRAND_TINT},0.15)` }}
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
                    color: viewMode === mode ? BRAND_ACCENT : BRAND_LIGHT,
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

        {/* Filter + Search */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {/* 왼쪽: 카테고리 탭 */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="카테고리 필터">
            {tabs.map((tab) => {
              const isActive = categoryFilter === tab.id;
              const count = tabCounts[tab.id];
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategoryFilter(tab.id)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-xs font-bold transition-all md:text-sm"
                  style={{
                    background: isActive
                      ? `rgba(${BRAND_TINT},0.2)`
                      : "rgba(255,252,254,0.85)",
                    borderColor: isActive
                      ? `rgba(${BRAND_TINT},0.6)`
                      : `rgba(${BRAND_TINT},0.3)`,
                    color: isActive ? BRAND_ACCENT : BRAND_LIGHT,
                    boxShadow: isActive
                      ? `0 2px 8px rgba(${BRAND_TINT},0.2)`
                      : "none",
                  }}
                >
                  <span aria-hidden>{tab.emoji}</span>
                  {tab.label}
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] md:text-xs"
                    style={{
                      background: isActive
                        ? `rgba(${BRAND_TINT},0.25)`
                        : `rgba(${BRAND_TINT},0.15)`,
                      color: isActive ? BRAND_ACCENT : BRAND_LIGHT,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 오른쪽: 검색 */}
          <div className="ml-auto">
            <div className="relative w-40 md:w-52">
              <Search
                size={14}
                className="absolute top-1/2 left-3 -translate-y-1/2"
                style={{ color: BRAND_LIGHT }}
                strokeWidth={2.2}
                aria-hidden
              />
              <input
                type="search"
                placeholder="이름 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="생산품 이름 검색"
                className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 md:py-2.5 md:text-sm"
                style={{
                  background: `rgba(${BRAND_TINT},0.1)`,
                  borderColor: `rgba(${BRAND_TINT},0.35)`,
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
            <p className="text-xs md:text-sm" style={{ color: BRAND_LIGHT }}>
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
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <ProductListView products={filtered} />
        )}
      </div>
    </section>
  );
}
