"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { FishDetail } from "../../_data/fishes";

// ── Constants ──────────────────────────────────────────────────────────────────

const FISHING_TINT = "126, 200, 227";
const FISHING_BORDER = "#c8e8f8";

const FISH_TYPE_EMOJI: Record<string, string> = {
  강: "🏞️",
  호수: "💧",
  바다: "🌊",
};

function starsOf(n: number) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
}

// ── Main ───────────────────────────────────────────────────────────────────────

interface FishDetailClientProps {
  fish: FishDetail;
}

export default function FishDetailClient({ fish }: FishDetailClientProps) {
  return (
    <section
      className="px-6 pt-8 pb-16"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Breadcrumb */}
        <nav
          className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-bold tracking-wide md:mb-8 md:text-sm"
          style={{ color: "#b080c0" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <Link href="/fishing" className="transition-colors hover:opacity-80">
            물고기 도감
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>{fish.ko}</span>
        </nav>

        {/* Back */}
        <Link
          href="/fishing"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5 md:mb-4 md:text-sm"
          style={{ color: "#b080c0" }}
        >
          ← 물고기 목록으로
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
            {/* ── 왼쪽: 기본 정보 + 지도 ──────────────────────────── */}
            <div>
              {/* Thumbnail / Emoji box */}
              <div
                className="mb-4 inline-flex h-[144px] w-[144px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] text-7xl"
                style={{
                  background: `rgba(${FISHING_TINT},0.18)`,
                  borderColor: `rgba(${FISHING_TINT},0.4)`,
                }}
              >
                {fish.thumbnail ? (
                  <Image
                    src={fish.thumbnail}
                    alt={fish.ko}
                    width={120}
                    height={120}
                    className="h-4/5 w-4/5 object-contain"
                  />
                ) : (
                  <span aria-hidden>{fish.emoji}</span>
                )}
              </div>

              {/* Name */}
              <h1
                className="m-0 mb-3 text-[clamp(20px,4vw,28px)] leading-tight font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#4a3060" }}
              >
                {fish.ko}
              </h1>

              {/* Divider */}
              <div
                className="mb-4 h-px"
                style={{
                  background: `linear-gradient(to right, ${FISHING_BORDER}, transparent)`,
                }}
              />

              {/* Badges */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                  style={{
                    background: "rgba(189,222,255,0.3)",
                    color: "#0284c7",
                    borderColor: "rgba(189,222,255,0.6)",
                  }}
                >
                  낚시 Lv.{fish.level}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                  style={{
                    background: `rgba(${FISHING_TINT},0.2)`,
                    color: "#4a9bbf",
                    borderColor: `rgba(${FISHING_TINT},0.45)`,
                  }}
                >
                  그림자 : {fish.shadowSize}
                </span>
              </div>

              {/* 상세 정보 표 */}
              <div
                className="mb-5 overflow-hidden rounded-2xl border-[1.5px]"
                style={{
                  background: "rgba(255,252,254,0.95)",
                  borderColor: "rgba(230,210,230,0.6)",
                }}
              >
                {/* 헤더 */}
                <div
                  className="flex items-center gap-2 border-b-[1.5px] px-4 py-3"
                  style={{ borderColor: "rgba(230,210,230,0.6)" }}
                >
                  <div
                    className="h-[7px] w-[7px] rounded-full"
                    style={{ background: "#4a9bbf" }}
                  />
                  <span
                    className="text-xs font-bold tracking-widest uppercase md:text-sm"
                    style={{ color: "#8a6898" }}
                  >
                    상세 정보
                  </span>
                </div>

                {/* 어종 + 위치 (2칸 그리드) */}
                <div className="grid grid-cols-2">
                  <div
                    className="border-r-[1.5px] border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1.5 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      어종
                    </p>
                    <p
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#4a3060" }}
                    >
                      {FISH_TYPE_EMOJI[fish.fishType]} {fish.fishType}
                    </p>
                  </div>
                  <div
                    className="border-b-[1.5px] p-4"
                    style={{ borderColor: "rgba(230,210,230,0.6)" }}
                  >
                    <p
                      className="mb-1.5 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      위치
                    </p>
                    <p
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#4a3060" }}
                    >
                      {fish.location || "-"}
                    </p>
                  </div>
                </div>

                {/* 시간 */}
                <div
                  className="border-b-[1.5px] px-4 py-3"
                  style={{ borderColor: "rgba(230,210,230,0.6)" }}
                >
                  <p
                    className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                    style={{ color: "#8a6898" }}
                  >
                    시간
                  </p>
                  <p
                    className="text-sm font-bold md:text-base"
                    style={{ color: "#4a3060" }}
                  >
                    {fish.times.join(", ")}
                  </p>
                </div>

                {/* 날씨 */}
                <div
                  className={
                    fish.desc ? "border-b-[1.5px] px-4 py-3" : "px-4 py-3"
                  }
                  style={{ borderColor: "rgba(230,210,230,0.6)" }}
                >
                  <p
                    className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                    style={{ color: "#8a6898" }}
                  >
                    날씨
                  </p>
                  <p
                    className="text-sm font-bold md:text-base"
                    style={{ color: "#4a3060" }}
                  >
                    {fish.weathers.join(", ")}
                  </p>
                </div>

                {/* 특이사항 (있을 때만) */}
                {fish.desc && (
                  <div className="px-4 py-3">
                    <p
                      className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      특이사항
                    </p>
                    <p
                      className="text-sm leading-relaxed font-bold whitespace-pre-line md:text-base"
                      style={{ color: "#4a3060" }}
                    >
                      {fish.desc}
                    </p>
                  </div>
                )}
              </div>

              {/* Map placeholder */}
              <div
                className="mt-5 flex flex-col rounded-2xl border-[1.5px] p-4"
                style={{
                  background: "rgba(255,252,254,0.9)",
                  borderColor: "rgba(230,210,230,0.6)",
                }}
              >
                <div
                  className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase md:text-sm"
                  style={{ color: "#b080c0" }}
                >
                  <MapPin size={13} strokeWidth={2.2} aria-hidden />
                  낚시 포인트
                </div>
                <div
                  className="relative flex min-h-[160px] flex-1 items-center justify-center overflow-hidden rounded-xl border-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(240,250,255,0.95) 0%, rgba(255,252,254,1) 55%, rgba(200,232,248,0.3) 100%)",
                    borderColor: `rgba(${FISHING_TINT},0.35)`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 20%, rgba(${FISHING_TINT},0.5) 0%, transparent 45%)`,
                    }}
                    aria-hidden
                  />
                  <div className="relative z-[1] flex flex-col items-center gap-2">
                    <span className="text-7xl drop-shadow-md" aria-hidden>
                      🎣
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: "rgba(138,104,152,0.6)" }}
                    >
                      준비중입니다
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 오른쪽: 성급 테이블 ──────────────────────────────── */}
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
                    {["성급", "별점", "판매가"].map((h) => (
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
                  {fish.grades.map((g) => (
                    <tr
                      key={g.stars}
                      className="border-b border-[rgba(230,210,230,0.4)] last:border-0"
                    >
                      <td className="px-2 py-2.5">
                        <span
                          className="text-xs font-bold md:text-sm"
                          style={{ color: "#4a3060" }}
                        >
                          {g.stars}성
                        </span>
                      </td>
                      <td className="px-2 py-2.5">
                        <span className="text-xs text-amber-500 md:text-sm">
                          {starsOf(g.stars)}
                        </span>
                      </td>
                      <td className="px-2 py-2.5">
                        <span
                          className="text-xs font-bold tabular-nums md:text-sm"
                          style={{ color: "#b45309" }}
                        >
                          {g.sellPrice.toLocaleString()}G
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
