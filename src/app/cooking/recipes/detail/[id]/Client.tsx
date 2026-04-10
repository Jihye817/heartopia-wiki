"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FoodDetail, IngredientSlot } from "../../../_data/foods";

const FOOD_BG = "#fef3e8";
const FOOD_BORDER = "#f5c4a0";

function starsOf(n: number) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
}

// ── Recipe Card ───────────────────────────────────────────────────────────────

function IngredientRow({ slot }: { slot: IngredientSlot }) {
  const [open, setOpen] = useState(false);

  if (slot.specific) {
    const inner = (
      <>
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
            style={{ background: FOOD_BG, borderColor: FOOD_BORDER }}
          >
            {slot.specific.thumbnail ? (
              <Image
                src={slot.specific.thumbnail}
                alt=""
                width={20}
                height={20}
                className="object-contain"
              />
            ) : (
              <span className="text-base">{slot.specific.name[0]}</span>
            )}
          </div>
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--wiki-text-primary)" }}
          >
            {slot.specific.ko}
          </span>
        </div>
        <span
          className="shrink-0 text-sm font-semibold tabular-nums"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          × {slot.amount}
        </span>
      </>
    );

    const rowClass =
      "flex items-center justify-between gap-3 border-b border-[var(--wiki-border-light)] px-4 py-3 last:border-0";

    return slot.specific.href ? (
      <Link
        href={slot.specific.href}
        className={`${rowClass} no-underline transition-opacity hover:opacity-70`}
      >
        {inner}
      </Link>
    ) : (
      <div className={rowClass}>{inner}</div>
    );
  }

  // group slot (accordion)
  const optionCount = slot.options?.length ?? 0;
  return (
    <div className="border-b border-[var(--wiki-border-light)] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--wiki-bg)]"
      >
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden>
            {slot.groupEmoji}
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--wiki-text-primary)" }}
          >
            {slot.groupLabel}
            {optionCount > 0 && (
              <span
                className="ml-1 text-xs font-normal"
                style={{ color: "var(--wiki-text-tertiary)" }}
              >
                ({optionCount}종)
              </span>
            )}
          </span>
          <span className="text-xs" style={{ color: "var(--wiki-text-muted)" }}>
            {open ? "▲" : "▼"}
          </span>
        </div>
        <span
          className="shrink-0 text-sm font-semibold tabular-nums"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          × {slot.amount}
        </span>
      </button>

      {open && slot.options && slot.options.length > 0 && (
        <div className="border-t border-[var(--wiki-border-light)] bg-[var(--wiki-bg)] px-4 pb-2">
          {slot.options.map((opt) => {
            const optInner = (
              <>
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
                  style={{ background: FOOD_BG, borderColor: FOOD_BORDER }}
                >
                  {opt.thumbnail ? (
                    <Image
                      src={opt.thumbnail}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm">{opt.name[0]}</span>
                  )}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--wiki-text-primary)" }}
                >
                  {opt.ko}
                </span>
              </>
            );
            return opt.href ? (
              <Link
                key={opt.id}
                href={opt.href}
                className="flex items-center gap-2.5 py-2 no-underline transition-opacity hover:opacity-70"
              >
                {optInner}
              </Link>
            ) : (
              <div key={opt.id} className="flex items-center gap-2.5 py-2">
                {optInner}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RecipeCard({ ingredients }: { ingredients: IngredientSlot[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
      <div
        className="flex items-center gap-1.5 border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
        style={{ color: "var(--wiki-text-primary)" }}
      >
        레시피
      </div>
      <div>
        {ingredients.map((slot, i) => (
          <IngredientRow key={i} slot={slot} />
        ))}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

interface FoodDetailClientProps {
  food: FoodDetail;
}

export default function FoodDetailClient({ food }: FoodDetailClientProps) {
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
            href="/cooking"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            요리
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <Link
            href="/cooking/recipes"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            요리 도감
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {food.ko}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/cooking/recipes"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 요리 도감으로 돌아가기
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
                style={{ background: FOOD_BG, borderColor: FOOD_BORDER }}
              >
                {food.thumbnail ? (
                  <Image
                    src={food.thumbnail}
                    alt={food.ko}
                    width={130}
                    height={130}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl" aria-hidden>
                    {food.emoji || "🍳"}
                  </span>
                )}
              </div>
              <div
                className="mb-3 text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {food.ko}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                <span className="rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                  요리 Lv.{food.level}
                </span>
                {food.availability === "event" ? (
                  <span className="rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                    이벤트 : {food.event ?? "이벤트"}
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
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      요리 레벨
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      <span className="inline-flex rounded-md bg-[#EBF3F9] px-3 py-1 text-sm font-semibold text-[#4A8DB7]">
                        Lv.{food.level}
                      </span>
                    </td>
                  </tr>
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
                      {food.availability === "event" ? (
                        <span className="inline-flex rounded-md bg-[#FDF2EC] px-3 py-1 text-sm font-semibold text-[#D4845A]">
                          이벤트 : {food.event ?? "이벤트"}
                        </span>
                      ) : (
                        <span className="inline-flex rounded-md bg-[#EEF6F0] px-3 py-1 text-sm font-semibold text-[#5B9A6F]">
                          일상
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr
                    className={
                      food.desc
                        ? "border-b border-[var(--wiki-border-light)]"
                        : ""
                    }
                  >
                    <th
                      className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      판매 가격
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "#b45309" }}
                    >
                      {food.sellMin} ~ {food.sellMax} G
                    </td>
                  </tr>
                  {food.desc && (
                    <tr>
                      <th
                        className="w-[110px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        설명
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm leading-relaxed font-semibold"
                        style={{ color: "var(--wiki-text-primary)" }}
                      >
                        {food.desc}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Recipe Card */}
            <RecipeCard ingredients={food.ingredients} />
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
                  {food.grades.map((g) => (
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
                          {g.sellPrice} G
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
