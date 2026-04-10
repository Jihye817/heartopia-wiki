"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Product, ProductCategory } from "../../_data/products";

const OTHERS_BG = "#f0f4f7";
const OTHERS_BORDER = "#c8d4de";

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

const CATEGORY_COLOR: Record<ProductCategory, { bg: string; color: string; border: string }> = {
  mushroom: { bg: "#F0EBFF", color: "#7B5EAE", border: "#D8C8F0" },
  fruit:    { bg: "#FDF0F5", color: "#C4607A", border: "#F0C8D8" },
  wood:     { bg: "#EEF6F0", color: "#5B9A6F", border: "#C8E0CF" },
  stone:    { bg: "#F2F4F7", color: "#6B7A8D", border: "#D0D8E4" },
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const catColor = CATEGORY_COLOR[product.category] ?? CATEGORY_COLOR.stone;
  const emoji = CATEGORY_EMOJI[product.category] ?? "📦";

  return (
    <section className="px-4 pt-8 pb-16 md:px-6">
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
          <Link
            href="/others/products"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            생산품 도감
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {product.name}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/others/products"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 생산품 도감으로 돌아가기
        </Link>

        {/* Two Column Detail */}
        <div
          className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-[340px_1fr]"
          style={{ animation: "fadeUp 0.4s ease-out" }}
        >
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Thumbnail Card */}
            <div className="flex flex-col items-center rounded-2xl border border-[var(--wiki-border)] bg-white p-8">
              <div
                className="mb-5 flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-xl border p-5"
                style={{ background: OTHERS_BG, borderColor: OTHERS_BORDER }}
              >
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    width={130}
                    height={130}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl" aria-hidden>
                    {emoji}
                  </span>
                )}
              </div>
              <div
                className="mb-3 text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {product.name}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                <span
                  className="rounded-md border px-3 py-1 text-sm font-semibold"
                  style={{
                    background: catColor.bg,
                    color: catColor.color,
                    borderColor: catColor.border,
                  }}
                >
                  {CATEGORY_LABEL[product.category]}
                </span>
              </div>
            </div>

            {/* Info Table */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="flex items-center gap-1.5 border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                상세 정보
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      채집 장소
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      <span className="flex items-center gap-1">
                        <MapPin size={13} strokeWidth={2.2} className="shrink-0" aria-hidden />
                        {product.location || "-"}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      리스폰
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {product.respawn_time || "-"}
                    </td>
                  </tr>
                  <tr className={product.stamina != null || product.notes ? "border-b border-[var(--wiki-border-light)]" : ""}>
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      판매 가격
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "#b45309" }}
                    >
                      {product.sell_price != null ? `${product.sell_price.toLocaleString()} G` : "-"}
                    </td>
                  </tr>
                  {product.stamina != null && (
                    <tr className={product.notes ? "border-b border-[var(--wiki-border-light)]" : ""}>
                      <th
                        className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        스태미나
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm font-semibold"
                        style={{ color: "var(--wiki-text-primary)" }}
                      >
                        {product.stamina}
                      </td>
                    </tr>
                  )}
                  {product.notes && (
                    <tr>
                      <th
                        className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        특이사항
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm leading-relaxed font-semibold whitespace-pre-line"
                        style={{ color: "var(--wiki-text-primary)" }}
                      >
                        {product.notes}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="flex items-center gap-1.5 border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                🗺️ 채집 지도
              </div>
              <div
                className="flex min-h-[160px] items-center justify-center"
                style={{ background: OTHERS_BG }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-5xl drop-shadow-sm" aria-hidden>
                    {emoji}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--wiki-text-muted)" }}
                  >
                    준비중입니다
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
