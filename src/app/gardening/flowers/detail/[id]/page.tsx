"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import {
  FLOWER_DETAILS,
  RARITY_LABEL,
  RARITY_STYLE,
} from "../../_data/flowers";
import { FlowerBreedingCard } from "../_components/FlowerBreedingCard";
import { FlowerCrossTable } from "../_components/FlowerCrossTable";

// ─────────────────────────────────────────────
// sub-components
// ─────────────────────────────────────────────

function ColorDot({
  hex,
  emoji,
  size = 28,
}: {
  hex: string;
  emoji: string;
  size?: number;
}) {
  return (
    <span
      className="inline-flex flex-shrink-0 items-center justify-center rounded-full border-2 border-white/90 text-sm shadow-sm"
      style={{
        background: hex,
        width: size,
        height: size,
        fontSize: size * 0.52,
      }}
    >
      {emoji}
    </span>
  );
}

// ─────────────────────────────────────────────
// main page component
// ─────────────────────────────────────────────
export default function FlowerDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const flower = id ? FLOWER_DETAILS[id] : null;

  if (!flower) {
    notFound();
  }

  const starsOf = (n: number) => "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));

  const gradePrices = flower.grades.map(
    (g) => g.sellPrice ?? Math.round(flower.sell * (0.75 + 0.25 * g.stars))
  );
  const sellPriceMin = Math.min(...gradePrices);
  const sellPriceMax = Math.max(...gradePrices);
  const sellPriceRange =
    sellPriceMin === sellPriceMax
      ? `${sellPriceMin}G`
      : `${sellPriceMin}G~${sellPriceMax}G`;

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
          <Link
            href="/gardening/flowers"
            className="transition-colors hover:opacity-80"
          >
            꽃 도감
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>{flower.ko}</span>
        </nav>

        {/* Back */}
        <Link
          href="/gardening/flowers"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5"
          style={{ color: "#b080c0" }}
        >
          ← 꽃 목록으로
        </Link>

        {/* Hero card */}
        <div
          className="relative mt-4 overflow-hidden rounded-[20px] border-[1.5px] p-6 md:p-7"
          style={{
            background: "rgba(255,252,254,0.95)",
            borderColor: "rgba(230,210,230,0.6)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="absolute -bottom-2.5 -right-2.5 text-[#f8a4c8] opacity-[0.08]"
            style={{
              transform: "scale(2) rotate(-10deg)",
              transformOrigin: "bottom right",
            }}
            aria-hidden
          >
            <span className="text-5xl">{flower.emoji}</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            {/* Left: flower info */}
            <div>
              <div
                className="mb-4 inline-flex h-[144px] w-[144px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] bg-[rgba(248,164,200,0.15)] p-3"
                style={{ borderColor: "rgba(248,164,200,0.35)" }}
              >
                <Image
                  src={flower.thumbnail}
                  alt={flower.ko}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </div>

              <h1
                className="m-0 mb-3 text-[clamp(24px,4vw,34px)] font-bold leading-tight tracking-tight"
                style={{ color: "#4a3060" }}
              >
                {flower.ko}
              </h1>
              <div
                className="mb-4 h-px"
                style={{
                  background: "linear-gradient(to right, #ffd6e8, transparent)",
                }}
              />
              <p
                className="mb-4 text-[13px] leading-relaxed"
                style={{ color: "#8a6898" }}
              >
                {flower.desc}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
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
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                    RARITY_STYLE[flower.rarity]
                  }`}
                >
                  {RARITY_LABEL[flower.rarity]}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-bold"
                  style={{
                    background: "rgba(254,215,170,0.3)",
                    color: "#b45309",
                    borderColor: "rgba(251,191,36,0.4)",
                  }}
                >
                  🌿 {flower.season}
                </span>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  ["성장 기간", flower.growTime],
                  ["판매 가격", `💰 ${sellPriceRange}`],
                  ["희귀도", RARITY_LABEL[flower.rarity]],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border-[1.5px] px-3.5 py-2.5"
                    style={{
                      background: "rgba(255,240,246,0.5)",
                      borderColor: "rgba(230,210,230,0.6)",
                    }}
                  >
                    <div
                      className="mb-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#8a6898" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: "#6b4a7a" }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: grade table */}
            <div
              className="rounded-2xl border-[1.5px] p-4"
              style={{
                background: "rgba(255,252,254,0.9)",
                borderColor: "rgba(230,210,230,0.6)",
              }}
            >
              <div
                className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
                style={{ color: "#b080c0" }}
              >
                ⭐ 성급별 색상
              </div>
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b-[1.5px]"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    {["성급", "꽃", "색상", "판매가"].map((h) => (
                      <th
                        key={h}
                        className="px-1.5 pb-2 text-left text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "#8a6898" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flower.grades.map((g) => {
                    const price =
                      g.sellPrice ??
                      Math.round(flower.sell * (0.75 + 0.25 * g.stars));
                    return (
                      <tr
                        key={`${g.stars}-${g.color}`}
                        className="border-b border-[rgba(230,210,230,0.4)] last:border-0"
                      >
                        <td className="px-1.5 py-2">
                          <div
                            className="text-xs font-bold"
                            style={{ color: "#4a3060" }}
                          >
                            {g.stars}성
                          </div>
                          <div className="text-[10px] leading-none text-amber-500">
                            {starsOf(g.stars)}
                          </div>
                        </td>
                        <td className="px-1.5 py-2">
                          {g.image ? (
                            <span className="inline-flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 bg-gray-100">
                              <Image
                                src={g.image}
                                alt={g.color}
                                width={32}
                                height={32}
                                className="h-full w-full object-contain"
                              />
                            </span>
                          ) : (
                            <ColorDot hex={g.hex} emoji={g.emoji} size={26} />
                          )}
                        </td>
                        <td className="px-1.5 py-2">
                          <div
                            className="text-xs font-bold"
                            style={{ color: "#4a3060" }}
                          >
                            {g.color}
                          </div>
                          <div
                            className="text-[10px] font-semibold"
                            style={{ color: "#8a6898" }}
                          >
                            {g.colorEn}
                          </div>
                        </td>
                        <td className="px-1.5 py-2">
                          <span
                            className="text-xs font-bold tabular-nums"
                            style={{ color: "#b45309" }}
                          >
                            {price}G
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Breeding rules + color cross table */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-1 lg:items-start">
          {/* <FlowerBreedingCard /> */}
          <FlowerCrossTable flower={flower} />
        </div>
      </div>
    </section>
  );
}
