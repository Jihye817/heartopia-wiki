"use client";

import Image from "next/image";
import Link from "next/link";
import type { CropDetail } from "../../_data/crops";

const CROP_BORDER = "#b3e5cc";
const CROP_TINT = "126, 203, 170";

interface CropDetailClientProps {
  crop: CropDetail;
}

function starsOf(stars: number) {
  return "★".repeat(stars) + "☆".repeat(Math.max(0, 5 - stars));
}

export default function CropDetailClient({ crop }: CropDetailClientProps) {
  return (
    <section
      className="px-6 pt-8 pb-16"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
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
            href="/gardening/crops"
            className="transition-colors hover:opacity-80"
          >
            작물 도감
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>{crop.name}</span>
        </nav>

        <Link
          href="/gardening/crops"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5 md:mb-4 md:text-sm"
          style={{ color: "#b080c0" }}
        >
          ← 작물 목록으로
        </Link>

        <div
          className="relative mt-4 overflow-hidden rounded-[20px] border-[1.5px] p-6 md:p-7"
          style={{
            background: "rgba(255,252,254,0.95)",
            borderColor: "rgba(230,210,230,0.6)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            <div>
              <div
                className="mb-4 inline-flex h-[144px] w-[144px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-3"
                style={{
                  background: `rgba(${CROP_TINT},0.15)`,
                  borderColor: `rgba(${CROP_TINT},0.42)`,
                }}
              >
                <Image
                  src={crop.thumbnail}
                  alt={crop.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </div>

              <h1
                className="m-0 mb-3 text-[clamp(20px,4vw,28px)] leading-tight font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#4a3060" }}
              >
                {crop.name}
              </h1>
              <div
                className="mb-4 h-px"
                style={{
                  background: `linear-gradient(to right, ${CROP_BORDER}, transparent)`,
                }}
              />

              <div className="mb-4 flex flex-wrap gap-1.5">
                {crop.level !== null && (
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                    style={{
                      background: "rgba(189,222,255,0.3)",
                      color: "#0284c7",
                      borderColor: "rgba(189,222,255,0.6)",
                    }}
                  >
                    원예 Lv.{crop.level}
                  </span>
                )}
                {crop.availability === "event" ? (
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                    style={{
                      background: "rgba(255,220,130,0.25)",
                      color: "#9a7020",
                      borderColor: "rgba(255,220,130,0.55)",
                    }}
                  >
                    이벤트 : {crop.event ?? "이벤트"}
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
                    style={{ background: "#7dceb0" }}
                  />
                  <span
                    className="text-xs font-bold tracking-widest uppercase md:text-sm"
                    style={{ color: "#8a6898" }}
                  >
                    상세 정보
                  </span>
                </div>

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
                      {crop.grow_time}
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
                      💰 {crop.sell_min} ~ {crop.sell_max}G
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div
                    className="border-r-[1.5px] p-4"
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
                      {crop.seed_cost}G
                    </p>
                  </div>
                  <div className="p-4">
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
                      {crop.seed_npc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
                ⭐ 성급별 판매가
              </div>
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b-[1.5px]"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    {["성급", "판매가"].map((h) => (
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
                  {crop.grades.map((g) => (
                    <tr
                      key={g.stars}
                      className="border-b border-[rgba(230,210,230,0.4)] last:border-0"
                    >
                      <td className="px-2 py-2.5">
                        <div
                          className="text-xs font-bold md:text-sm"
                          style={{ color: "#4a3060" }}
                        >
                          {g.stars}성
                        </div>
                        <div
                          className="text-xs leading-none text-amber-500 md:text-sm"
                          aria-hidden
                        >
                          {starsOf(g.stars)}
                        </div>
                      </td>
                      <td className="px-2 py-2.5">
                        <span
                          className="text-xs font-bold tabular-nums md:text-sm"
                          style={{ color: "#b45309" }}
                        >
                          {g.sell_price ?? "-"} G
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
