"use client";

import Image from "next/image";
import Link from "next/link";
import type { BirdDetail } from "../../_data/birds";

const BIRD_BG = "#f0ebff";
const BIRD_BORDER = "#d8c8f0";

function starsOf(n: number) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
}

interface BirdDetailClientProps {
  bird: BirdDetail;
}

export default function BirdDetailClient({ bird }: BirdDetailClientProps) {
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
            href="/birds"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            새 관찰
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {bird.name}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/birds"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 새 도감으로 돌아가기
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
                style={{ background: BIRD_BG, borderColor: BIRD_BORDER }}
              >
                {bird.thumbnail ? (
                  <Image
                    src={bird.thumbnail}
                    alt={bird.name}
                    width={130}
                    height={130}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl" aria-hidden>
                    {bird.emoji}
                  </span>
                )}
              </div>
              <div
                className="mb-3 text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {bird.name}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {bird.level > 0 && (
                  <span className="rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                    관찰 Lv.{bird.level}
                  </span>
                )}
                {bird.availability === "event" ? (
                  <span className="rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                    이벤트
                  </span>
                ) : bird.availability === "birds-return" ? (
                  <span
                    className="rounded-md px-3 py-1 text-sm font-semibold"
                    style={{ background: BIRD_BG, color: "#7B5EAE" }}
                  >
                    새들의 복귀
                  </span>
                ) : (
                  <span className="rounded-md bg-[#EEF6F0] px-3 py-1 text-sm font-semibold text-[#5B9A6F]">
                    일상
                  </span>
                )}
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
                  {bird.level > 0 && (
                    <tr className="border-b border-[var(--wiki-border-light)]">
                      <th
                        className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        관찰 레벨
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm"
                        style={{ color: "var(--wiki-text-primary)" }}
                      >
                        <span className="inline-flex rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                          Lv.{bird.level}
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
                      {bird.availability === "event" ? (
                        <span className="inline-flex rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                          이벤트
                        </span>
                      ) : bird.availability === "birds-return" ? (
                        <span
                          className="inline-flex rounded-md px-3 py-1 text-sm font-semibold"
                          style={{ background: BIRD_BG, color: "#7B5EAE" }}
                        >
                          새들의 복귀
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
                      서식지
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {bird.habitat || "-"}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      거리
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {bird.distance ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      위치
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {bird.location || "-"}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      시간
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {bird.times.length > 0 ? bird.times.join(", ") : "-"}
                    </td>
                  </tr>
                  <tr
                    className={
                      bird.desc
                        ? "border-b border-[var(--wiki-border-light)]"
                        : ""
                    }
                  >
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      날씨
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {bird.weathers.length > 0
                        ? bird.weathers.join(", ")
                        : "-"}
                    </td>
                  </tr>
                  {bird.desc && (
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
                        {bird.desc}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Grade Table + Map */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="flex items-center gap-1.5 border-b border-[var(--wiki-border-light)] px-5 py-3.5 text-sm font-semibold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                성급별 판매가
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--wiki-border-light)] bg-[var(--wiki-bg)]">
                    {["성급", "판매가"].map((h) => (
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
                  {bird.grades.map((g) => (
                    <tr
                      key={g.stars}
                      className="border-b border-[var(--wiki-border-light)] transition-colors last:border-0 hover:bg-[rgba(0,0,0,0.01)]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3.5">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "var(--wiki-text-primary)" }}
                          >
                            {g.stars}성
                          </span>
                          <span className="hidden text-sm text-amber-500 sm:inline">
                            {starsOf(g.stars)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#b45309" }}
                        >
                          {g.sellPrice > 0
                            ? `${g.sellPrice.toLocaleString()} G`
                            : "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="flex items-center gap-1.5 border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                🐦 관찰 포인트
              </div>
              <div
                className="flex min-h-[160px] items-center justify-center"
                style={{ background: BIRD_BG }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-5xl drop-shadow-sm" aria-hidden>
                    🗺️
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
