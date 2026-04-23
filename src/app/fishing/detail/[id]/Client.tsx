"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FishDetail } from "../../_data/fishes";
import { TIME_SLOTS } from "../../_constants/time-slots";

const TIME_SLOT_STYLE: Record<string, { iconBg: string; color: string }> = {
  always:  { iconBg: "#E8F4ED", color: "#5B9A6F" },
  dawn:    { iconBg: "#EDEAFF", color: "#6B5EC8" },
  morning: { iconBg: "#FFF8E1", color: "#A87820" },
  day:     { iconBg: "#FEF0E7", color: "#B8653A" },
  night:   { iconBg: "#EAF0F9", color: "#3A5A8C" },
};

function TimeSlotBadge({ slot }: { slot: string }) {
  const def = TIME_SLOTS[slot];
  const style = TIME_SLOT_STYLE[slot] ?? { iconBg: "#F4F4F4", color: "#666" };
  if (!def) return (
    <span className="inline-flex rounded-md px-2 py-1 text-sm font-semibold" style={{ color: "var(--wiki-text-secondary)" }}>
      {slot}
    </span>
  );
  const { Icon, range, label } = def;
  return (
    <span className="inline-flex items-center overflow-hidden rounded-md text-sm font-semibold" style={{ background: "#F4F4F4" }}>
      <span
        className="flex h-full items-center px-2 py-1"
        style={{ background: style.iconBg }}
      >
        <Icon size={13} strokeWidth={2} color={style.color} aria-hidden />
      </span>
      <span className="px-2 py-1" style={{ color: "var(--wiki-text-secondary)" }}>
        {range ?? label}
      </span>
    </span>
  );
}

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

const RECIPES_INITIAL = 6;

export default function FishDetailClient({ fish }: FishDetailClientProps) {
  const [recipesExpanded, setRecipesExpanded] = useState(false);
  const visibleRecipes = recipesExpanded
    ? fish.relatedRecipes
    : fish.relatedRecipes.slice(0, RECIPES_INITIAL);
  const hiddenCount = fish.relatedRecipes.length - RECIPES_INITIAL;

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
                  className="rounded-md px-3 py-1 text-sm font-semibold"
                  style={{
                    background:
                      SHADOW_SIZE_STYLE[fish.shadowSize]?.bg ?? "#F0EBFF",
                    color:
                      SHADOW_SIZE_STYLE[fish.shadowSize]?.color ?? "#7B5EAE",
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
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {fish.times.length > 0
                          ? fish.times.map((t) => <TimeSlotBadge key={t} slot={t} />)
                          : <span className="text-sm font-semibold" style={{ color: "var(--wiki-text-primary)" }}>-</span>
                        }
                      </div>
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

            {/* Related Recipes */}
            <div
              className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white"
              style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}
            >
              <div className="flex items-center justify-between border-b border-[var(--wiki-border-light)] px-5 py-3.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--wiki-text-primary)" }}
                >
                  🍳 이 물고기가 사용되는 요리
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  {fish.relatedRecipes.length}개
                </span>
              </div>

              {fish.relatedRecipes.length === 0 ? (
                <div
                  className="py-8 text-center text-sm"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  이 물고기가 사용되는 요리가 없어요
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2 p-4">
                    {visibleRecipes.map((recipe) => (
                      <Link
                        key={recipe.id}
                        href={`/cooking/recipes/detail/${recipe.id}`}
                        className="flex items-center gap-2.5 rounded-lg border border-[var(--wiki-border-light)] px-3 py-2.5 no-underline transition-all hover:border-[#F0D4C0] hover:bg-[#FDF2EC]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#F0D4C0] bg-[#FDF2EC]">
                          {recipe.thumbnail ? (
                            <Image
                              src={recipe.thumbnail}
                              alt=""
                              width={32}
                              height={32}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-base">🍳</span>
                          )}
                        </span>
                        <span
                          className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold"
                          style={{ color: "var(--wiki-text-primary)" }}
                        >
                          {recipe.name}
                        </span>
                        <span
                          className="shrink-0 text-sm"
                          style={{ color: "var(--wiki-text-muted)" }}
                        >
                          ›
                        </span>
                      </Link>
                    ))}
                  </div>
                  {!recipesExpanded && hiddenCount > 0 && (
                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        onClick={() => setRecipesExpanded(true)}
                        className="w-full cursor-pointer rounded-lg border border-[var(--wiki-border)] bg-white py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--wiki-bg)]"
                        style={{ color: "var(--wiki-text-tertiary)" }}
                      >
                        + {hiddenCount}개 더보기
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
