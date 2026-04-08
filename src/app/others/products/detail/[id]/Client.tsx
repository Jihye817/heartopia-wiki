"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Product, ProductCategory } from "../../_data/products";

// ── Constants ──────────────────────────────────────────────────────────────────

const BRAND_TINT = "123, 143, 163";
const BRAND_ACCENT = "#5a6f82";
const BRAND_LIGHT = "#7b8fa3";
const BRAND_BORDER = "rgba(216, 224, 232, 0.6)";

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

// 카테고리 뱃지·썸네일은 카테고리별 색상 유지
const CATEGORY_TINT: Record<ProductCategory, string> = {
  mushroom: "160, 100, 220",
  fruit: "232, 120, 140",
  wood: "100, 160, 80",
  stone: "150, 150, 170",
};

const CATEGORY_BORDER: Record<ProductCategory, string> = {
  mushroom: "#c4b5e8",
  fruit: "#fbcfe8",
  wood: "#b5d8b5",
  stone: "#c8c8d8",
};

// ── Main ───────────────────────────────────────────────────────────────────────

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const catTint = CATEGORY_TINT[product.category] ?? "150, 150, 150";
  const accentBorder = CATEGORY_BORDER[product.category] ?? "#c4b5e8";
  const emoji = CATEGORY_EMOJI[product.category] ?? "📦";

  const strangeImages = [product.strange_1, product.strange_2, product.strange_3].filter(
    (s): s is string => Boolean(s),
  );

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
          <span style={{ color: `rgba(${BRAND_TINT},0.5)` }}>›</span>
          <Link href="/others" className="transition-colors hover:opacity-80">
            기타 수집
          </Link>
          <span style={{ color: `rgba(${BRAND_TINT},0.5)` }}>›</span>
          <Link href="/others/products" className="transition-colors hover:opacity-80">
            생산품 도감
          </Link>
          <span style={{ color: `rgba(${BRAND_TINT},0.5)` }}>›</span>
          <span style={{ color: BRAND_ACCENT }}>{product.name}</span>
        </nav>

        {/* Back */}
        <Link
          href="/others/products"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5 md:mb-4 md:text-sm"
          style={{ color: BRAND_LIGHT }}
        >
          ← 생산품 목록으로
        </Link>

        {/* Hero card */}
        <div
          className="relative mt-4 overflow-hidden rounded-[20px] border-[1.5px] p-6 md:p-7"
          style={{
            background: "rgba(255,252,254,0.95)",
            borderColor: BRAND_BORDER,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            {/* ── 왼쪽: 기본 정보 ──────────────────────────────────── */}
            <div>
              {/* Thumbnail */}
              <div
                className="mb-4 inline-flex h-[144px] w-[144px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] text-7xl"
                style={{
                  background: `rgba(${BRAND_TINT},0.18)`,
                  borderColor: `rgba(${BRAND_TINT},0.4)`,
                }}
              >
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="h-4/5 w-4/5 object-contain"
                  />
                ) : (
                  <span aria-hidden>{emoji}</span>
                )}
              </div>

              {/* Name */}
              <h1
                className="m-0 mb-3 text-[clamp(20px,4vw,28px)] leading-tight font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#4a3060" }}
              >
                {product.name}
              </h1>

              {/* Divider */}
              <div
                className="mb-4 h-px"
                style={{
                  background: `linear-gradient(to right, ${accentBorder}, transparent)`,
                }}
              />

              {/* Category badge */}
              <div className="mb-4 flex flex-wrap gap-1.5">
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
              </div>

              {/* 상세 정보 표 */}
              <div
                className="mb-5 overflow-hidden rounded-2xl border-[1.5px]"
                style={{
                  background: "rgba(255,252,254,0.95)",
                  borderColor: BRAND_BORDER,
                }}
              >
                {/* 헤더 */}
                <div
                  className="flex items-center gap-2 border-b-[1.5px] px-4 py-3"
                  style={{ borderColor: BRAND_BORDER }}
                >
                  <div
                    className="h-[7px] w-[7px] rounded-full"
                    style={{ background: BRAND_LIGHT }}
                  />
                  <span
                    className="text-xs font-bold tracking-widest uppercase md:text-sm"
                    style={{ color: BRAND_LIGHT }}
                  >
                    상세 정보
                  </span>
                </div>

                {/* 위치 */}
                <div
                  className="border-b-[1.5px] p-4"
                  style={{ borderColor: BRAND_BORDER }}
                >
                  <p
                    className="mb-1.5 text-xs font-bold tracking-wider uppercase md:text-sm"
                    style={{ color: BRAND_LIGHT }}
                  >
                    채집 장소
                  </p>
                  <p
                    className="flex items-center gap-1 text-sm font-bold md:text-base"
                    style={{ color: "#4a3060" }}
                  >
                    <MapPin size={13} strokeWidth={2.2} className="shrink-0" aria-hidden />
                    {product.location || "-"}
                  </p>
                </div>

                {/* 리스폰 + 판매가 (2칸 그리드) */}
                <div
                  className={`grid grid-cols-2 ${product.stamina != null || product.notes ? "border-b-[1.5px]" : ""}`}
                  style={{ borderColor: BRAND_BORDER }}
                >
                  <div
                    className="border-r-[1.5px] p-4"
                    style={{ borderColor: BRAND_BORDER }}
                  >
                    <p
                      className="mb-1.5 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: BRAND_LIGHT }}
                    >
                      리스폰 시간
                    </p>
                    <p className="text-sm font-bold md:text-base" style={{ color: "#4a3060" }}>
                      {product.respawn_time || "-"}
                    </p>
                  </div>
                  <div className="p-4">
                    <p
                      className="mb-1.5 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: BRAND_LIGHT }}
                    >
                      판매 가격
                    </p>
                    <p
                      className="text-sm font-bold tabular-nums md:text-base"
                      style={{ color: "#b45309" }}
                    >
                      {product.sell_price != null
                        ? `${product.sell_price.toLocaleString()}G`
                        : "-"}
                    </p>
                  </div>
                </div>

                {/* 스태미나 */}
                {product.stamina != null && (
                  <div
                    className={`p-4 ${product.notes ? "border-b-[1.5px]" : ""}`}
                    style={{ borderColor: BRAND_BORDER }}
                  >
                    <p
                      className="mb-1.5 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: BRAND_LIGHT }}
                    >
                      스태미나
                    </p>
                    <p className="text-sm font-bold md:text-base" style={{ color: "#4a3060" }}>
                      +{product.stamina}
                    </p>
                  </div>
                )}

                {/* 특이사항 */}
                {product.notes && (
                  <div className="px-4 py-3">
                    <p
                      className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: BRAND_LIGHT }}
                    >
                      특이사항
                    </p>
                    <p
                      className="text-sm leading-relaxed font-bold whitespace-pre-line md:text-base"
                      style={{ color: "#4a3060" }}
                    >
                      {product.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── 오른쪽: 이상한 버전 or 지도 플레이스홀더 ────────── */}
            <div>
              {strangeImages.length > 0 ? (
                <div
                  className="overflow-hidden rounded-2xl border-[1.5px]"
                  style={{
                    background: "rgba(255,252,254,0.9)",
                    borderColor: BRAND_BORDER,
                  }}
                >
                  <div
                    className="flex items-center gap-2 border-b-[1.5px] px-4 py-3"
                    style={{ borderColor: BRAND_BORDER }}
                  >
                    <div
                      className="h-[7px] w-[7px] rounded-full"
                      style={{ background: BRAND_LIGHT }}
                    />
                    <span
                      className="text-xs font-bold md:text-sm"
                      style={{ color: BRAND_LIGHT }}
                    >
                      이상한 {product.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {strangeImages.map((src, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="flex h-[100px] w-full items-center justify-center overflow-hidden rounded-xl border-[1.5px] p-2 md:h-[120px]"
                          style={{
                            background: `rgba(${catTint},0.12)`,
                            borderColor: `rgba(${catTint},0.35)`,
                          }}
                        >
                          <Image
                            src={src}
                            alt={`이상한 ${product.name} ${i + 1}`}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="flex flex-col rounded-2xl border-[1.5px] p-4 md:min-h-[320px]"
                  style={{
                    background: "rgba(255,252,254,0.9)",
                    borderColor: BRAND_BORDER,
                  }}
                >
                  <div
                    className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase md:text-sm"
                    style={{ color: BRAND_LIGHT }}
                  >
                    🗺️ 채집 지도
                  </div>
                  <div
                    className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden rounded-xl border-[1.5px] md:min-h-[280px]"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(244,247,250,0.95) 0%, rgba(255,252,254,1) 55%, rgba(216,224,232,0.3) 100%)",
                      borderColor: `rgba(${BRAND_TINT},0.35)`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-7xl drop-shadow-md" aria-hidden>
                        {emoji}
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: `rgba(${BRAND_TINT},0.6)` }}
                      >
                        준비중입니다
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
