"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FoodDetail, IngredientSlot } from "../../../_data/foods";

const FOOD_TINT = "245, 168, 120";
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
            style={{
              background: `rgba(${FOOD_TINT},0.15)`,
              borderColor: `rgba(${FOOD_TINT},0.35)`,
            }}
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
          <span className="text-sm font-bold" style={{ color: "#4a3060" }}>
            {slot.specific.ko}
          </span>
        </div>
        <span
          className="shrink-0 text-sm font-bold tabular-nums"
          style={{ color: "#8a6898" }}
        >
          × {slot.amount}
        </span>
      </>
    );

    const rowClass =
      "flex items-center justify-between gap-3 border-b px-4 py-3 last:border-0";
    const rowStyle = { borderColor: "rgba(230,210,230,0.4)" };

    return slot.specific.href ? (
      <Link
        href={slot.specific.href}
        className={`${rowClass} no-underline transition-opacity hover:opacity-70`}
        style={rowStyle}
      >
        {inner}
      </Link>
    ) : (
      <div className={rowClass} style={rowStyle}>
        {inner}
      </div>
    );
  }

  // group slot (accordion)
  const optionCount = slot.options?.length ?? 0;
  return (
    <div
      className="border-b last:border-0"
      style={{ borderColor: "rgba(230,210,230,0.4)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[rgba(245,168,120,0.06)]"
      >
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden>
            {slot.groupEmoji}
          </span>
          <span className="text-sm font-bold" style={{ color: "#4a3060" }}>
            {slot.groupLabel}
            {optionCount > 0 && (
              <span
                className="ml-1 text-xs font-normal"
                style={{ color: "#8a6898" }}
              >
                ({optionCount}종)
              </span>
            )}
          </span>
          <span className="text-xs" style={{ color: "#b080c0" }}>
            {open ? "▲" : "▼"}
          </span>
        </div>
        <span
          className="shrink-0 text-sm font-bold tabular-nums"
          style={{ color: "#8a6898" }}
        >
          × {slot.amount}
        </span>
      </button>

      {open && slot.options && slot.options.length > 0 && (
        <div
          className="border-t px-4 pb-2"
          style={{
            borderColor: "rgba(230,210,230,0.4)",
            background: "rgba(245,168,120,0.04)",
          }}
        >
          {slot.options.map((opt) => {
            const optInner = (
              <>
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
                  style={{
                    background: `rgba(${FOOD_TINT},0.15)`,
                    borderColor: `rgba(${FOOD_TINT},0.3)`,
                  }}
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
                  className="text-sm font-bold"
                  style={{ color: "#4a3060" }}
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
    <div
      className="overflow-hidden rounded-2xl border-[1.5px]"
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
          style={{ background: "#d47840" }}
        />
        <span
          className="text-xs font-bold tracking-widest uppercase md:text-sm"
          style={{ color: "#8a6898" }}
        >
          레시피
        </span>
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
          <Link href="/cooking" className="transition-colors hover:opacity-80">
            요리
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <Link
            href="/cooking/recipes"
            className="transition-colors hover:opacity-80"
          >
            요리 도감
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>{food.ko}</span>
        </nav>

        {/* Back */}
        <Link
          href="/cooking/recipes"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5 md:mb-4 md:text-sm"
          style={{ color: "#b080c0" }}
        >
          ← 요리 목록으로
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
            {/* ── 왼쪽 ── */}
            <div>
              {/* Thumbnail */}
              <div
                className="mb-4 inline-flex h-[144px] w-[144px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] text-7xl"
                style={{
                  background: `rgba(${FOOD_TINT},0.18)`,
                  borderColor: `rgba(${FOOD_TINT},0.4)`,
                }}
              >
                {food.thumbnail ? (
                  <Image
                    src={food.thumbnail}
                    alt={food.ko}
                    width={120}
                    height={120}
                    className="h-4/5 w-4/5 object-contain"
                  />
                ) : (
                  <span aria-hidden>{food.emoji}</span>
                )}
              </div>

              {/* Name */}
              <h1
                className="m-0 mb-3 text-[clamp(20px,4vw,28px)] leading-tight font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#4a3060" }}
              >
                {food.ko}
              </h1>

              {/* Divider */}
              <div
                className="mb-4 h-px"
                style={{
                  background: `linear-gradient(to right, ${FOOD_BORDER}, transparent)`,
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
                  요리 Lv.{food.level}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                  style={{
                    background: `rgba(${FOOD_TINT},0.2)`,
                    color: "#d47840",
                    borderColor: `rgba(${FOOD_TINT},0.45)`,
                  }}
                >
                  {food.availability === "always" ? "상시" : "이벤트"}
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
                <div
                  className="flex items-center gap-2 border-b-[1.5px] px-4 py-3"
                  style={{ borderColor: "rgba(230,210,230,0.6)" }}
                >
                  <div
                    className="h-[7px] w-[7px] rounded-full"
                    style={{ background: "#d47840" }}
                  />
                  <span
                    className="text-xs font-bold tracking-widest uppercase md:text-sm"
                    style={{ color: "#8a6898" }}
                  >
                    상세 정보
                  </span>
                </div>

                <div
                  className={food.desc ? "border-b-[1.5px] px-4 py-3" : "px-4 py-3"}
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
                    style={{ color: "#4a3060" }}
                  >
                    💰 {food.sellMin.toLocaleString()} ~ {food.sellMax.toLocaleString()}G
                  </p>
                </div>

                {food.desc && (
                  <div className="px-4 py-3">
                    <p
                      className="mb-1 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      설명
                    </p>
                    <p
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#4a3060" }}
                    >
                      {food.desc}
                    </p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div
                className="my-5 h-px w-full"
                style={{ background: "rgba(230,210,230,0.6)" }}
              />

              {/* Recipe card */}
              <RecipeCard ingredients={food.ingredients} />
            </div>

            {/* ── 오른쪽: 성급별 판매가 ── */}
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
                  {food.grades.map((g) => (
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
                        <span
                          className="text-xs text-amber-500 md:text-sm"
                          aria-hidden
                        >
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
