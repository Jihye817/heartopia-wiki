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
            href="/gardening"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            원예
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <Link
            href="/gardening/flowers"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            꽃 도감
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {flower.name}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/gardening/flowers"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 꽃 도감으로 돌아가기
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
                className="mb-5 flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-xl border bg-[var(--wiki-cat-garden-bg)] p-5"
                style={{ borderColor: "var(--wiki-cat-garden-border)" }}
              >
                {flower.thumbnail ? (
                  <Image
                    src={flower.thumbnail}
                    alt={flower.name}
                    width={130}
                    height={130}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl">🌸</span>
                )}
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {flower.name}
              </div>
            </div>

            {/* Info Table */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="flex items-center gap-1.5 border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                기본 정보
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  {flower.level !== null && (
                    <tr className="border-b border-[var(--wiki-border-light)]">
                      <th
                        className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        원예 레벨
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm"
                        style={{ color: "var(--wiki-text-primary)" }}
                      >
                        <span className="inline-flex rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                          Lv.{flower.level}
                        </span>
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      활동시기
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {flower.availability === "event" ? (
                        <span className="inline-flex rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                          {`이벤트 : ${flower.event ?? "이벤트"}`}
                        </span>
                      ) : (
                        <span className="inline-flex rounded-md bg-[#EEF6F0] px-3 py-1 text-sm font-semibold text-[#5B9A6F]">
                          일상
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      성장 기간
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {flower.grow_time}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      색상 종류
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {flower.stages} 종류
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      씨앗 가격
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "#b45309" }}
                    >
                      {flower.seed_cost} G
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      구매 NPC
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {flower.seed_npc}
                    </td>
                  </tr>
                  <tr>
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left align-middle text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      씨앗 색상
                    </th>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {flower.seed_colors.map((colorName) => (
                          <span
                            key={colorName}
                            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--wiki-border-light)] px-2.5 py-1 text-sm font-semibold"
                            style={{ color: "var(--wiki-text-primary)" }}
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Grade Table */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="flex items-center gap-1.5 border-b border-[var(--wiki-border-light)] px-5 py-3.5 text-sm font-semibold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                성급별 색상 · 가격
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--wiki-border-light)] bg-[var(--wiki-bg)]">
                    {["성급", "색상", "판매가"].map((h) => (
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
                  {flower.grades.map((g) => (
                    <tr
                      key={`${g.stars}-${g.color}`}
                      className="border-b border-[var(--wiki-border-light)] transition-colors last:border-0 hover:bg-[rgba(0,0,0,0.01)]"
                    >
                      <td className="px-4 py-3">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "var(--wiki-text-primary)" }}
                        >
                          {g.stars}성
                        </div>
                        <div className="hidden text-sm leading-none text-amber-500 sm:block">
                          {starsOf(g.stars)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {g.image && (
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--wiki-border-light)] bg-gray-100">
                              <Image
                                src={g.image}
                                alt={g.color}
                                width={32}
                                height={32}
                                className="h-full w-full object-contain"
                              />
                            </span>
                          )}
                          <div
                            className="text-sm font-semibold"
                            style={{ color: "var(--wiki-text-primary)" }}
                          >
                            {g.color}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-sm font-semibold tabular-nums"
                          style={{ color: "#b45309" }}
                        >
                          {g.sell_price ?? flower.sell_min} G
                        </span>
                        {flower.availability === "event" &&
                          g.event_price != null && (
                            <div
                              className="mt-0.5 text-sm font-semibold tabular-nums"
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
        <div
          className="grid grid-cols-1 gap-6"
          style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}
        >
          <FlowerCrossTable flower={flower} />
        </div>
      </div>
    </section>
  );
}
