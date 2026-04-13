"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, MapPin, Search } from "lucide-react";
import type { Product, ProductCategory } from "./_data/products";

type AvailFilter = "all" | "always" | "event";

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

// 카테고리별 뱃지 색상
const CATEGORY_COLOR: Record<ProductCategory, { bg: string; color: string; border: string }> = {
  mushroom: { bg: "#F0EBFF", color: "#7B5EAE", border: "#D8C8F0" },
  fruit:    { bg: "#FDF0F5", color: "#C4607A", border: "#F0C8D8" },
  wood:     { bg: "#EEF6F0", color: "#5B9A6F", border: "#C8E0CF" },
  stone:    { bg: "#F2F4F7", color: "#6B7A8D", border: "#D0D8E4" },
};

// ── Subcomponents ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const catColor = CATEGORY_COLOR[product.category];
  const emoji = CATEGORY_EMOJI[product.category] ?? "📦";

  return (
    <Link
      href={`/others/products/detail/${product.id}`}
      className="group flex flex-col items-center rounded-2xl border border-[var(--wiki-border)] bg-white px-5 pt-6 pb-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5a6f8266] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      {/* 썸네일 */}
      <div
        className="mb-4 flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-xl border bg-[var(--wiki-cat-others-bg)] p-2 transition-transform duration-200 group-hover:scale-105"
        style={{ borderColor: "#d0d8e0" }}
      >
        {product.thumbnail ? (
          <div className="relative h-full w-full">
            <Image
              src={product.thumbnail}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <span className="text-4xl" aria-hidden>{emoji}</span>
        )}
      </div>

      {/* 이름 */}
      <div
        className="mb-2.5 text-xl font-bold"
        style={{ color: "var(--wiki-text-primary)" }}
      >
        {product.name}
      </div>

      {/* 뱃지 */}
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        <span
          className="rounded-full border px-2.5 py-0.5 text-sm font-semibold"
          style={{
            background: catColor.bg,
            color: catColor.color,
            borderColor: catColor.border,
          }}
        >
          {CATEGORY_LABEL[product.category]}
        </span>
        {product.respawn_time && (
          <span className="rounded-full border border-[var(--wiki-border)] bg-[var(--wiki-bg)] px-2.5 py-0.5 text-sm font-semibold" style={{ color: "var(--wiki-text-secondary)" }}>
            {product.respawn_time}
          </span>
        )}
      </div>

      {/* 판매가 + 위치 */}
      {(product.sell_price != null || product.location) && (
        <div className="w-full border-t border-[var(--wiki-border-light)] pt-3.5 space-y-1.5">
          {product.sell_price != null && (
            <div className="flex items-center justify-center rounded-md border border-[var(--wiki-border-light)] bg-[var(--wiki-bg)] py-1.5">
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ color: "#b45309" }}
              >
                {product.sell_price.toLocaleString()} G
              </span>
            </div>
          )}
          {product.location && (
            <p className="flex items-center justify-center gap-1 text-sm font-semibold" style={{ color: "var(--wiki-text-secondary)" }}>
              <MapPin size={12} strokeWidth={2} aria-hidden />
              {product.location}
            </p>
          )}
        </div>
      )}
    </Link>
  );
}

function ProductListView({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--wiki-border-light)] bg-white">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="border-b border-[var(--wiki-border-light)] bg-[var(--wiki-bg)]">
            {["이름", "분류", "채집 장소", "리스폰", "판매 가격"].map((h) => (
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
          {products.map((product) => {
            const catColor = CATEGORY_COLOR[product.category];
            const emoji = CATEGORY_EMOJI[product.category] ?? "📦";
            return (
              <tr
                key={product.id}
                className="border-b border-[var(--wiki-border-light)] transition-colors last:border-0 hover:bg-[rgba(0,0,0,0.015)]"
              >
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="flex items-center gap-2.5 px-4 py-3 no-underline"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[var(--wiki-cat-others-bg)]">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt=""
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm" aria-hidden>{emoji}</span>
                      )}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {product.name}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="block px-4 py-3 no-underline"
                  >
                    <span
                      className="rounded-full border px-2.5 py-0.5 text-sm font-semibold"
                      style={{
                        background: catColor.bg,
                        color: catColor.color,
                        borderColor: catColor.border,
                      }}
                    >
                      {CATEGORY_LABEL[product.category]}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="block px-4 py-3 no-underline"
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      {product.location || "-"}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="block px-4 py-3 no-underline"
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      {product.respawn_time || "-"}
                    </span>
                  </Link>
                </td>
                <td className="p-0">
                  <Link
                    href={`/others/products/detail/${product.id}`}
                    className="block px-4 py-3 no-underline"
                  >
                    {product.sell_price != null ? (
                      <span
                        className="text-sm font-semibold tabular-nums whitespace-nowrap"
                        style={{ color: "#b45309" }}
                      >
                        {product.sell_price.toLocaleString()} G
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Page Client ──────────────────────────────────────────────────────────

interface ProductsPageClientProps {
  products: Product[];
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState<AvailFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "">("");
  const [locationFilter, setLocationFilter] = useState<string>("");

  const locations = useMemo(
    () => Array.from(new Set(products.map((p) => p.location).filter(Boolean) as string[])).sort(),
    [products],
  );

  const tabCounts = useMemo(
    () => ({
      all: products.length,
      always: products.filter((p) => p.availability === "always").length,
      event: products.filter((p) => p.availability === "event").length,
    }),
    [products],
  );

  const filtered = useMemo(() => {
    let result = products;
    if (availFilter !== "all")
      result = result.filter((p) => p.availability === availFilter);
    if (categoryFilter)
      result = result.filter((p) => p.category === categoryFilter);
    if (locationFilter)
      result = result.filter((p) => p.location === locationFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [products, availFilter, categoryFilter, locationFilter, search]);

  const tabs: { id: AvailFilter; label: string }[] = [
    { id: "all", label: "전체" },
    { id: "always", label: "일상" },
    { id: "event", label: "이벤트" },
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
          <Link
            href="/others"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            기타 수집
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            생산품 도감
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
              생산품 도감
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--wiki-text-secondary)" }}
            >
              맵에서 채집할 수 있는 버섯·과일·나무·돌 정보
            </p>
          </div>

          {/* View Toggle */}
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

        {/* Filter Bar */}
        <div
          className="mb-5 flex flex-wrap items-center gap-3"
          style={{ animation: "fadeUp 0.4s ease-out 0.05s both" }}
        >
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="활동시기 필터"
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
                    background: isActive ? "var(--wiki-cat-others-bg)" : "white",
                    borderColor: isActive ? "#c0cad4" : "var(--wiki-border)",
                    color: isActive ? "var(--wiki-cat-others)" : "var(--wiki-text-secondary)",
                  }}
                >
                  {tab.label}
                  <span
                    className="rounded-[10px] px-1.5 py-0.5 text-sm"
                    style={{
                      background: isActive
                        ? "rgba(90,111,130,0.15)"
                        : "var(--wiki-border-light)",
                      color: isActive
                        ? "var(--wiki-cat-others)"
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | "")}
              aria-label="분류 필터"
              className="h-[34px] cursor-pointer rounded-lg border border-[var(--wiki-border)] bg-white pr-8 pl-3 text-sm font-semibold transition-all outline-none"
              style={{
                color: categoryFilter ? "var(--wiki-cat-others)" : "var(--wiki-text-secondary)",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="">전체 분류</option>
              <option value="mushroom">버섯</option>
              <option value="fruit">과일</option>
              <option value="wood">나무</option>
              <option value="stone">돌</option>
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              aria-label="채집 장소 필터"
              className="h-[34px] cursor-pointer rounded-lg border px-3 pr-7 text-sm font-semibold transition-all outline-none appearance-none"
              style={{
                borderColor: locationFilter ? "#c0cad4" : "var(--wiki-border)",
                background: locationFilter
                  ? `var(--wiki-cat-others-bg) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235a6f82' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 8px center`
                  : `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b0b0b0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 8px center`,
                color: locationFilter ? "var(--wiki-cat-others)" : "var(--wiki-text-secondary)",
              }}
            >
              <option value="">전체 장소</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
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
                placeholder="이름 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="생산품 이름 검색"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ProductListView products={filtered} />
          )}
        </div>
      </div>
    </section>
  );
}
