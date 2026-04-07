"use client";

import Image from "next/image";
import Link from "next/link";
import type { FlowerDetail } from "../../_data/flowers";
import { FlowerCrossTable } from "../_components/FlowerCrossTable";

// ─────────────────────────────────────────────
// Color map
// ─────────────────────────────────────────────
const COLOR_HEX: Record<string, string> = {
  빨간색: "#ef4444",
  붉은색: "#ef4444",
  분홍색: "#f472b6",
  핑크색: "#f472b6",
  흰색: "#f9fafb",
  하얀색: "#f9fafb",
  노란색: "#facc15",
  주황색: "#fb923c",
  보라색: "#a855f7",
  파란색: "#60a5fa",
  하늘색: "#7dd3fc",
  초록색: "#4ade80",
  검정색: "#374151",
  검은색: "#374151",
  갈색: "#92400e",
  연두색: "#a3e635",
};

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface FlowerDetailClientProps {
  flower: FlowerDetail;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
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
          className="mb-4 flex items-center gap-1.5 text-xs font-bold tracking-wide md:mb-8 md:text-sm"
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
          <span style={{ color: "#6b4a7a" }}>{flower.name}</span>
        </nav>

        {/* Back */}
        <Link
          href="/gardening/flowers"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5 md:mb-4 md:text-sm"
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
                  alt={flower.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </div>

              <h1
                className="m-0 mb-3 text-[clamp(20px,4vw,28px)] leading-tight font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#4a3060" }}
              >
                {flower.name}
              </h1>
              <div
                className="mb-4 h-px"
                style={{
                  background: "linear-gradient(to right, #ffd6e8, transparent)",
                }}
              />

              <div className="mb-4 flex flex-wrap gap-1.5">
                {flower.level !== null && (
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                    style={{
                      background: "rgba(189,222,255,0.3)",
                      color: "#0284c7",
                      borderColor: "rgba(189,222,255,0.6)",
                    }}
                  >
                    원예 Lv.{flower.level}
                  </span>
                )}
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                  style={{
                    background: "rgba(248,164,200,0.2)",
                    color: "#c06898",
                    borderColor: "rgba(248,164,200,0.4)",
                  }}
                >
                  {flower.stages} 종류
                </span>
                {flower.availability === "event" ? (
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                    style={{
                      background: "rgba(255,220,130,0.25)",
                      color: "#9a7020",
                      borderColor: "rgba(255,220,130,0.55)",
                    }}
                  >
                    {`이벤트 : ${flower.event ?? "이벤트"}`}
                  </span>
                ) : (
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                    style={{
                      background: "rgba(220,252,231,0.4)",
                      color: "#16a34a",
                      borderColor: "rgba(134,239,172,0.5)",
                    }}
                  >
                    일상
                  </span>
                )}
              </div>

              {/* 상세 정보 표 */}
              <div
                className="mb-5 overflow-hidden rounded-2xl border-[1.5px]"
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
                    className="text-xs font-bold tracking-widest uppercase md:text-sm"
                    style={{ color: "#8a6898" }}
                  >
                    상세 정보
                  </span>
                </div>

                {/* 성장 기간 + 판매 가격 */}
                <div className="grid grid-cols-2">
                  <div
                    className="border-r-[1.5px] border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      성장 기간
                    </p>
                    <p
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#4a3060" }}
                    >
                      {flower.grow_time}
                    </p>
                  </div>
                  <div
                    className="border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      판매 가격
                    </p>
                    <p
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#b45309" }}
                    >
                      💰 {flower.sell_min} ~ {flower.sell_max}G
                    </p>
                  </div>
                </div>

                {/* 씨앗 구매 가격 + NPC */}
                <div className="grid grid-cols-2">
                  <div
                    className="border-r-[1.5px] border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      씨앗 가격
                    </p>
                    <p
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#b45309" }}
                    >
                      {flower.seed_cost}G
                    </p>
                  </div>
                  <div
                    className="border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      구매 NPC
                    </p>
                    <p
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#4a3060" }}
                    >
                      {flower.seed_npc}
                    </p>
                  </div>
                </div>

                {/* 씨앗 색상 */}
                <div className="p-4">
                  <p
                    className="mb-2 text-xs font-bold tracking-wider uppercase md:text-sm"
                    style={{ color: "#8a6898" }}
                  >
                    씨앗 색상
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {flower.seed_colors.map((colorName) => (
                      <span
                        key={colorName}
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                        style={{
                          background: "rgba(248,164,200,0.1)",
                          borderColor: "rgba(248,164,200,0.35)",
                          color: "#4a3060",
                        }}
                      >
                        {COLOR_HEX[colorName] && (
                          <span
                            className="inline-block h-3 w-3 shrink-0 rounded-full border border-white/80 shadow-sm"
                            style={{ background: COLOR_HEX[colorName] }}
                          />
                        )}
                        {colorName}
                      </span>
                    ))}
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
                className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase md:text-sm"
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
                        className="px-2 pb-2.5 text-left text-xs font-bold tracking-wider uppercase md:text-sm"
                        style={{ color: "#8a6898" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flower.grades.map((g) => (
                    <tr
                      key={`${g.stars}-${g.color}`}
                      className="border-b border-[rgba(230,210,230,0.4)] last:border-0"
                    >
                      <td className="px-2 py-2.5">
                        <div
                          className="text-xs font-bold md:text-sm"
                          style={{ color: "#4a3060" }}
                        >
                          {g.stars}성
                        </div>
                        <div className="text-xs leading-none text-amber-500 md:text-sm">
                          {starsOf(g.stars)}
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        {g.image && (
                          <span className="inline-flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 bg-gray-100 md:h-[34px] md:w-[34px]">
                            <Image
                              src={g.image}
                              alt={g.color}
                              width={34}
                              height={34}
                              className="h-full w-full object-contain"
                            />
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2.5">
                        <div
                          className="text-xs font-bold md:text-sm"
                          style={{ color: "#4a3060" }}
                        >
                          {g.color}
                        </div>
                      </td>
                      <td className="px-2 py-2.5">
                        <span
                          className="text-xs font-bold tabular-nums md:text-sm"
                          style={{ color: "#b45309" }}
                        >
                          {g.sell_price ?? flower.sell_min} G
                        </span>
                        {flower.availability === "event" &&
                          g.event_price != null && (
                            <div
                              className="mt-0.5 text-xs font-bold tabular-nums md:text-sm"
                              style={{ color: "#7c3aed" }}
                            >
                              Ⓔ {g.event_price}
                            </div>
                          )}
                      </td>
                    </tr>
                  ))}
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
