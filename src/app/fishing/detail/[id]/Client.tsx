"use client";

import Image from "next/image";
import Link from "next/link";
import type { FishDetail } from "../../_data/fishes";

const FISHING_BG = "#e8f4fb";
const FISHING_BORDER = "#b8dcf0";

const SHADOW_SIZE_STYLE: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  소형: { bg: "#F0EBFF", color: "#7B5EAE", border: "#D8C8F0" },
  중형: { bg: "#F0EBFF", color: "#7B5EAE", border: "#D8C8F0" },
  대형: { bg: "#F0EBFF", color: "#7B5EAE", border: "#D8C8F0" },
  파랑: { bg: "#EBF3F9", color: "#4A8DB7", border: "#B8DCF0" },
  금색: { bg: "#FDF8EC", color: "#B45309", border: "#F0D898" },
};

function starsOf(n: number) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
}

interface FishDetailClientProps {
  fish: FishDetail;
}

export default function FishDetailClient({ fish }: FishDetailClientProps) {
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
            href="/fishing"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            낚시
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {fish.name}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/fishing"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 물고기 도감으로 돌아가기
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
                style={{ background: FISHING_BG, borderColor: FISHING_BORDER }}
              >
                {fish.thumbnail ? (
                  <Image
                    src={fish.thumbnail}
                    alt={fish.name}
                    width={130}
                    height={130}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl" aria-hidden>
                    {fish.emoji}
                  </span>
                )}
              </div>
              <div
                className="mb-3 text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {fish.name}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                <span className="rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                  낚시 Lv.{fish.level}
                </span>
                <span
                  className="rounded-md border px-3 py-1 text-sm font-semibold"
                  style={{
                    background:
                      SHADOW_SIZE_STYLE[fish.shadowSize]?.bg ?? "#F0EBFF",
                    color:
                      SHADOW_SIZE_STYLE[fish.shadowSize]?.color ?? "#7B5EAE",
                    borderColor:
                      SHADOW_SIZE_STYLE[fish.shadowSize]?.border ?? "#D8C8F0",
                  }}
                >
                  그림자 {fish.shadowSize}
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
                    <th className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold" style={{ color: "var(--wiki-text-secondary)" }}>
                      낚시 레벨
                    </th>
                    <td className="px-5 py-3.5 text-sm" style={{ color: "var(--wiki-text-primary)" }}>
                      <span className="inline-flex rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                        Lv.{fish.level}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold" style={{ color: "var(--wiki-text-secondary)" }}>
                      활동시기
                    </th>
                    <td className="px-5 py-3.5 text-sm" style={{ color: "var(--wiki-text-primary)" }}>
                      {fish.availability === "always" ? (
                        <span className="inline-flex rounded-md bg-[#EEF6F0] px-3 py-1 text-sm font-semibold text-[#5B9A6F]">
                          일상
                        </span>
                      ) : (
                        <span className="inline-flex rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                          이벤트
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      어종
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {fish.fishType}
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
                      {fish.location || "-"}
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
                      {fish.times.join(", ")}
                    </td>
                  </tr>
                  <tr
                    className={
                      fish.desc
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
                      {fish.weathers.join(", ")}
                    </td>
                  </tr>
                  {fish.desc && (
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
                        {fish.desc}
                      </td>
                    </tr>
                  )}
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
                  {fish.grades.map((g) => (
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
                          {g.sellPrice.toLocaleString()} G
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
                🎣 낚시 포인트
              </div>
              <div
                className="flex min-h-[160px] items-center justify-center"
                style={{ background: FISHING_BG }}
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
