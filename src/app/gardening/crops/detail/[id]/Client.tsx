"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CropDetail } from "../../_data/crops";

const CROP_BG = "#eef9f4";
const CROP_BORDER = "#b3e5cc";

interface CropDetailClientProps {
  crop: CropDetail;
}

function starsOf(stars: number) {
  return "★".repeat(stars) + "☆".repeat(Math.max(0, 5 - stars));
}

const RECIPES_INITIAL = 6;

export default function CropDetailClient({ crop }: CropDetailClientProps) {
  const [recipesExpanded, setRecipesExpanded] = useState(false);
  const visibleRecipes = recipesExpanded
    ? crop.relatedRecipes
    : crop.relatedRecipes.slice(0, RECIPES_INITIAL);
  const hiddenCount = crop.relatedRecipes.length - RECIPES_INITIAL;

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
            href="/gardening/crops"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            작물 도감
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {crop.name}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/gardening/crops"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 작물 도감으로 돌아가기
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
                style={{ background: CROP_BG, borderColor: CROP_BORDER }}
              >
                <Image
                  src={crop.thumbnail}
                  alt={crop.name}
                  width={130}
                  height={130}
                  className="h-full w-full object-contain"
                />
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {crop.name}
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
                  {crop.level !== null && (
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
                          Lv.{crop.level}
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
                      {crop.availability === "event" ? (
                        <span className="inline-flex rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                          {`이벤트 : ${crop.event ?? "이벤트"}`}
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
                      {crop.grow_time}
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
                      {crop.seed_cost} G
                    </td>
                  </tr>
                  <tr>
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
                      {crop.seed_npc}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Grade Table + Related Recipes */}
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
                  {crop.grades.map((g) => (
                    <tr
                      key={g.stars}
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
                        <span
                          className="text-sm font-semibold"
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
                  🍳 이 작물이 사용되는 요리
                </span>
                <span
                  className="font-outfit text-sm font-medium"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  {crop.relatedRecipes.length}개
                </span>
              </div>

              {crop.relatedRecipes.length === 0 ? (
                <div
                  className="py-8 text-center text-sm"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  이 작물이 사용되는 요리가 없어요
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
