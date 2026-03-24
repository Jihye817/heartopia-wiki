"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, MapPin, Package, Search } from "lucide-react";
import type { Product, ProductCategory } from "./_data/products";

// ── Category visuals (도감 톤에 맞춘 버섯/과일 구분) ───────────────────────────

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  mushroom: "버섯",
  fruit: "과일",
};

const CATEGORY_EMOJI: Record<ProductCategory, string> = {
  mushroom: "🍄",
  fruit: "🍎",
};

/** 버섯: 보라 계열 */
const MUSHROOM_TINT = "160, 100, 220";
const MUSHROOM_BORDER = "rgba(160,100,220,0.38)";
const MUSHROOM_BG_HOVER = "rgba(250,245,255,0.95)";

/** 과일: 플로럴 핑크에 가까운 코랄 */
const FRUIT_TINT = "232, 120, 140";
const FRUIT_BORDER = "rgba(232,120,140,0.4)";
const FRUIT_BG_HOVER = "rgba(255,248,250,0.95)";

const getCategoryStyles = (category: ProductCategory) => {
  if (category === "mushroom") {
    return {
      tint: MUSHROOM_TINT,
      border: MUSHROOM_BORDER,
      hoverBg: MUSHROOM_BG_HOVER,
      accentBorder: "#c4b5e8",
    };
  }
  return {
    tint: FRUIT_TINT,
    border: FRUIT_BORDER,
    hoverBg: FRUIT_BG_HOVER,
    accentBorder: "#fbcfe8",
  };
};

// ── Subcomponents ─────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const styles = getCategoryStyles(product.category);
  const emoji = CATEGORY_EMOJI[product.category];
  const detailHref = `/others/products/detail/${product.id}`;

  return (
    <Link
      href={detailHref}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,252,254,0.9)",
        border: `1.5px solid rgba(${styles.tint},0.32)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = styles.hoverBg;
        e.currentTarget.style.borderColor = styles.border;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${styles.border}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,252,254,0.9)";
        e.currentTarget.style.borderColor = `rgba(${styles.tint},0.32)`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      <div
        className="absolute -right-2.5 -bottom-2.5 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.11]"
        style={{
          transform: "scale(2) rotate(-10deg)",
          transformOrigin: "bottom right",
        }}
        aria-hidden
      >
        <span className="text-4xl">{emoji}</span>
      </div>

      <div
        className="mb-4 inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-2 text-3xl transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `rgba(${styles.tint},0.18)`,
          borderColor: `rgba(${styles.tint},0.4)`,
        }}
      >
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt=""
            width={60}
            height={60}
            className="object-contain"
          />
        ) : (
          <span aria-hidden>{emoji}</span>
        )}
      </div>

      <div className="mb-3.5">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {product.ko}
        </div>
      </div>

      <div
        className="mb-3.5 h-px"
        style={{
          background: `linear-gradient(to right, ${styles.accentBorder}, transparent)`,
        }}
      />

      <div className="flex flex-wrap gap-1.5">
        <span
          className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
          style={{
            background: "rgba(189,222,255,0.3)",
            color: "#0284c7",
            borderColor: "rgba(189,222,255,0.6)",
          }}
        >
          {CATEGORY_LABEL[product.category]}
        </span>
        <span
          className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
          style={{
            background: `rgba(${styles.tint},0.2)`,
            color: "#6b4a7a",
            borderColor: `rgba(${styles.tint},0.45)`,
          }}
        >
          {product.respawnTime}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
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
    </Link>
  );
}

interface ProductListViewProps {
  products: Product[];
}

function ProductListView({ products }: ProductListViewProps) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,254,0.9)",
        borderColor: "rgba(230,210,230,0.6)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full min-w-[520px]">
        <thead>
          <tr
            className="border-b-[1.5px]"
            style={{ borderColor: "rgba(230,210,230,0.6)" }}
          >
            {["이름", "채집 장소", "리스폰", "분류"].map((headerLabel) => (
              <th
                key={headerLabel}
                className="px-4 py-3.5 text-left text-sm font-bold tracking-wider uppercase"
                style={{ color: "#b080c0" }}
              >
                {headerLabel}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const styles = getCategoryStyles(product.category);
            const emoji = CATEGORY_EMOJI[product.category];

            const detailHref = `/others/products/detail/${product.id}`;

            return (
              <tr
                key={product.id}
                className="border-b border-[rgba(230,210,230,0.4)] transition-colors last:border-0 hover:bg-[#fff0f6]/50"
              >
                <td className="px-4 py-3.5">
                  <Link
                    href={detailHref}
                    className="flex max-w-fit items-center gap-2.5 rounded-lg no-underline outline-offset-2 transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#b080c0]/40"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg text-lg">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt=""
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      ) : (
                        <span aria-hidden>{emoji}</span>
                      )}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#4a3060" }}
                    >
                      {product.ko}
                    </span>
                  </Link>
                </td>
                <td
                  className="px-4 py-3.5 text-sm"
                  style={{ color: "#6b4a7a" }}
                >
                  {product.location}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background: `rgba(${styles.tint},0.2)`,
                      color: "#6b4a7a",
                      borderColor: `rgba(${styles.tint},0.45)`,
                    }}
                  >
                    {product.respawnTime}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background: "rgba(189,222,255,0.3)",
                      color: "#0284c7",
                      borderColor: "rgba(189,222,255,0.6)",
                    }}
                  >
                    {CATEGORY_LABEL[product.category]}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

type CategoryFilter = "all" | ProductCategory;

interface ProductsPageClientProps {
  products: Product[];
}

export default function ProductsPageClient({
  products,
}: ProductsPageClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const tabCounts = useMemo(() => {
    return {
      all: products.length,
      mushroom: products.filter((p) => p.category === "mushroom").length,
      fruit: products.filter((p) => p.category === "fruit").length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const byCategory =
      categoryFilter === "all"
        ? products
        : products.filter((p) => p.category === categoryFilter);

    if (!search.trim()) {
      return byCategory;
    }

    const query = search.trim().toLowerCase();

    return byCategory.filter(
      (p) =>
        p.ko.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query),
    );
  }, [products, categoryFilter, search]);

  const tabs: { id: CategoryFilter; label: string; emoji: string }[] = [
    { id: "all", label: "전체", emoji: "✨" },
    { id: "mushroom", label: "버섯", emoji: "🍄" },
    { id: "fruit", label: "과일", emoji: "🍎" },
  ];

  return (
    <section
      className="px-6 pt-8 pb-16"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <nav
          className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-bold tracking-wide md:mb-8 md:text-sm"
          style={{ color: "#b080c0" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <Link href="/others" className="transition-colors hover:opacity-80">
            기타 수집
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>생산품 도감</span>
        </nav>

        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
              >
                생산품 도감
              </h1>
              <p
                className="mt-1 text-xs md:text-sm"
                style={{ color: "#8a6898" }}
              >
                맵에서 채집할 수 있는 버섯·과일 정보
              </p>
            </div>

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

        <div
          className="mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="카테고리 필터"
        >
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
                className="flex items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-xs font-bold transition-all md:text-sm"
                style={{
                  background: isActive ? "white" : "rgba(255,252,254,0.85)",
                  borderColor: isActive
                    ? "rgba(248,164,200,0.55)"
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
                      ? "rgba(248,164,200,0.25)"
                      : "rgba(230,210,230,0.45)",
                    color: "#6b4a7a",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

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
              aria-label="생산품 이름 또는 장소 검색"
              className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#e8739b] md:py-2.5 md:text-sm"
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
              background: "rgba(248,164,200,0.15)",
              borderColor: "rgba(248,164,200,0.4)",
              color: "#c06898",
            }}
          >
            <Package size={12} aria-hidden />
            {filteredProducts.length}종
          </span>
        </div>

        {filteredProducts.length === 0 ? (
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <ProductListView products={filteredProducts} />
        )}
      </div>
    </section>
  );
}
