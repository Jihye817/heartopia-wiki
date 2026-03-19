"use client";

import Image from "next/image";
import Link from "next/link";
import type { FlowerDetail } from "../../_data/flowers";
import { FlowerCrossTable } from "../_components/FlowerCrossTable";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface FlowerDetailClientProps {
  flower: FlowerDetail;
}

// ─────────────────────────────────────────────
// Sub-components
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

function starsOf(n: number) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function FlowerDetailClient({
  flower,
}: FlowerDetailClientProps) {
  return (
    <section
      className="px-6 pt-8 pb-16"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Breadcrumb */}
        <nav
          className="mb-8 flex items-center gap-1.5 text-sm font-bold tracking-wide"
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
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
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
                className="m-0 mb-3 text-[clamp(24px,4vw,34px)] leading-tight font-bold tracking-tight"
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

              <div className="mb-4 flex flex-wrap gap-1.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: "rgba(189,222,255,0.3)",
                    color: "#0284c7",
                    borderColor: "rgba(189,222,255,0.6)",
                  }}
                >
                  원예 Lv.{flower.level}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: "rgba(248,164,200,0.2)",
                    color: "#c06898",
                    borderColor: "rgba(248,164,200,0.4)",
                  }}
                >
                  {flower.stages} 종류
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-sm font-bold"
                  style={{
                    background: "rgba(254,215,170,0.3)",
                    color: "#b45309",
                    borderColor: "rgba(251,191,36,0.4)",
                  }}
                >
                  활동시기 : {flower.season}
                </span>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  ["성장 기간", flower.growTime],
                  ["판매 가격", `💰 ${flower.sellMin} - ${flower.sellMax}G`],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl border-[1.5px] px-3.5 py-2.5"
                    style={{
                      background: "rgba(255,240,246,0.5)",
                      borderColor: "rgba(230,210,230,0.6)",
                    }}
                  >
                    <div
                      className="mb-0.5 text-sm font-bold tracking-wider uppercase"
                      style={{ color: "#8a6898" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-base font-bold"
                      style={{ color: "#6b4a7a" }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="my-5 h-px w-full"
                style={{ background: "rgba(230,210,230,0.6)" }}
              />

              {/* Seed info — 카드형 */}
              <div
                className="overflow-hidden rounded-2xl border-[1.5px]"
                style={{
                  background: "rgba(255,252,254,0.95)",
                  borderColor: "rgba(230,210,230,0.6)",
                }}
              >
                <div
                  className="flex items-center gap-2 border-b-[1.5px] px-4 py-3"
                  style={{ borderColor: "rgba(230,210,230,0.6)" }}
                >
                  <div
                    className="h-[7px] w-[7px] rounded-full"
                    style={{ background: "#c06898" }}
                  />
                  <span
                    className="text-sm font-bold tracking-widest uppercase"
                    style={{ color: "#8a6898" }}
                  >
                    씨앗 정보
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <div
                    className="border-r-[1.5px] border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1.5 text-sm font-bold tracking-wider uppercase"
                      style={{ color: "#8a6898" }}
                    >
                      구매 가격
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-2xl leading-none font-bold tabular-nums"
                        style={{ color: "#b45309" }}
                      >
                        {flower.seedCost}
                      </span>
                      <span
                        className="text-base font-semibold"
                        style={{ color: "#8a6898" }}
                      >
                        G
                      </span>
                    </div>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "rgba(138,104,152,0.6)" }}
                    >
                      씨앗 1개당
                    </p>
                  </div>

                  <div
                    className="border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1.5 text-sm font-bold tracking-wider uppercase"
                      style={{ color: "#8a6898" }}
                    >
                      구매 NPC
                    </p>
                    <p
                      className="text-lg leading-none font-bold"
                      style={{ color: "#4a3060" }}
                    >
                      {flower.seedNPC}
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "rgba(138,104,152,0.6)" }}
                    >
                      원예 상점 판매
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <p
                    className="mb-2.5 text-sm font-bold tracking-wider uppercase"
                    style={{ color: "#8a6898" }}
                  >
                    구매 가능 씨앗 색상
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {flower.seedColors.map((colorName) => {
                      const grade = flower.grades.find(
                        (g) => g.color === colorName,
                      );
                      return (
                        <div
                          key={colorName}
                          className="flex items-center gap-2.5 rounded-xl border-[1px] px-3 py-2"
                          style={{
                            background: "rgba(255,240,246,0.5)",
                            borderColor: "rgba(230,210,230,0.6)",
                          }}
                        >
                          {grade && (
                            <div
                              className="h-7 w-7 flex-shrink-0 rounded-full border-2 border-white/90 shadow-sm"
                              style={{ background: grade.hex }}
                            />
                          )}
                          <span
                            className="text-sm font-bold"
                            style={{ color: "#4a3060" }}
                          >
                            {colorName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                className="mb-3 flex items-center gap-1.5 text-sm font-bold tracking-widest uppercase"
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
                        className="px-2 pb-2.5 text-left text-sm font-bold tracking-wider uppercase"
                        style={{ color: "#8a6898" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flower.grades.map((g) => {
                    return (
                      <tr
                        key={`${g.stars}-${g.color}`}
                        className="border-b border-[rgba(230,210,230,0.4)] last:border-0"
                      >
                        <td className="px-2 py-2.5">
                          <div
                            className="text-sm font-bold"
                            style={{ color: "#4a3060" }}
                          >
                            {g.stars}성
                          </div>
                          <div className="text-sm leading-none text-amber-500">
                            {starsOf(g.stars)}
                          </div>
                        </td>
                        <td className="flex items-center px-2 py-3">
                          {g.image ? (
                            <span className="inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 bg-gray-100">
                              <Image
                                src={g.image}
                                alt={g.color}
                                width={34}
                                height={34}
                                className="h-full w-full object-contain"
                              />
                            </span>
                          ) : (
                            <ColorDot hex={g.hex} emoji={g.emoji} size={26} />
                          )}
                        </td>
                        <td className="px-2 py-2.5">
                          <div
                            className="text-sm font-bold"
                            style={{ color: "#4a3060" }}
                          >
                            {g.color}
                          </div>
                          <div
                            className="text-sm font-semibold"
                            style={{ color: "#8a6898" }}
                          >
                            {g.colorEn}
                          </div>
                        </td>
                        <td className="px-2 py-2.5">
                          <span
                            className="text-sm font-bold tabular-nums"
                            style={{ color: "#b45309" }}
                          >
                            {g.sellPrice ?? flower.sellMin} G
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
          <FlowerCrossTable flower={flower} />
        </div>
      </div>
    </section>
  );
}
