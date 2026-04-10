"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { BugDetail } from "../../_data/bugs";

const BUG_BG = "#eef6e8";
const BUG_BORDER = "#c5e1a5";

function starsOf(n: number) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
}

interface BugDetailClientProps {
  bug: BugDetail;
}

export default function BugDetailClient({ bug }: BugDetailClientProps) {
  const [hideImage, setHideImage] = useState(false);
  const [peeking, setPeeking] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHideImage(sessionStorage.getItem("bugs_hideImage") === "true");
  }, []);

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
            href="/bugs"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            곤충 채집
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {bug.name}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/bugs"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 곤충 도감으로 돌아가기
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
              <div className="mb-5 flex items-end gap-2">
                <div
                  className="flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-xl border p-5"
                  style={{ background: BUG_BG, borderColor: BUG_BORDER }}
                >
                  {(!hideImage || peeking) && bug.thumbnail ? (
                    <Image
                      src={bug.thumbnail}
                      alt={bug.name}
                      width={130}
                      height={130}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-6xl" aria-hidden>
                      {bug.emoji}
                    </span>
                  )}
                </div>
                {hideImage && bug.thumbnail && (
                  <button
                    type="button"
                    aria-label="이미지 잠깐 보기"
                    onMouseDown={() => setPeeking(true)}
                    onMouseUp={() => setPeeking(false)}
                    onMouseLeave={() => setPeeking(false)}
                    onTouchStart={() => setPeeking(true)}
                    onTouchEnd={() => setPeeking(false)}
                    className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all select-none"
                    style={{
                      background: peeking ? "#d4edbc" : BUG_BG,
                      borderColor: BUG_BORDER,
                      color: "#689f38",
                    }}
                  >
                    <Eye size={16} strokeWidth={2.2} />
                  </button>
                )}
              </div>
              <div
                className="mb-3 text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {bug.name}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {bug.level > 0 && (
                  <span className="rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                    채집 Lv.{bug.level}
                  </span>
                )}
                {bug.availability === "event" ? (
                  <span className="rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                    이벤트
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
                  {bug.level > 0 && (
                    <tr className="border-b border-[var(--wiki-border-light)]">
                      <th
                        className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        채집 레벨
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm"
                        style={{ color: "var(--wiki-text-primary)" }}
                      >
                        <span className="inline-flex rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                          Lv.{bug.level}
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
                      {bug.availability === "event" ? (
                        <span className="inline-flex rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                          이벤트
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
                      {bug.habitat || "-"}
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
                      {bug.location || "-"}
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
                      {bug.times.length > 0 ? bug.times.join(", ") : "-"}
                    </td>
                  </tr>
                  <tr
                    className={
                      bug.desc
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
                      {bug.weathers.length > 0 ? bug.weathers.join(", ") : "-"}
                    </td>
                  </tr>
                  {bug.desc && (
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
                        {bug.desc}
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
                  {bug.grades.map((g) => (
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
                🦋 채집 포인트
              </div>
              <div
                className="flex min-h-[160px] items-center justify-center"
                style={{ background: BUG_BG }}
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
