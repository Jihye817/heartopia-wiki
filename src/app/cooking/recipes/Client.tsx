"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, Search, UtensilsCrossed } from "lucide-react";
import { FOODS } from "../_data/foods";
import type { FoodDetail } from "../_data/foods";

const FOOD_BORDER = "#f5c4a0";
const FOOD_BG_HOVER = "#fff5ee";
const FOOD_TINT = "245, 168, 120";

// ── Subcomponents ─────────────────────────────────────────────────────────────

function FoodCard({ food }: { food: FoodDetail }) {
  return (
    <Link
      href={`/cooking/recipes/detail/${food.id}`}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] px-6 pt-7 pb-6 no-underline transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,252,250,0.9)",
        border: `1.5px solid rgba(${FOOD_TINT},0.34)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = FOOD_BG_HOVER;
        e.currentTarget.style.borderColor = FOOD_BORDER;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${FOOD_BORDER}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,252,250,0.9)";
        e.currentTarget.style.borderColor = `rgba(${FOOD_TINT},0.34)`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      <div
        className="absolute -right-2.5 -bottom-2.5 opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.12]"
        style={{
          transform: "scale(2) rotate(-10deg)",
          transformOrigin: "bottom right",
        }}
        aria-hidden
      >
        <span className="text-4xl">🥗</span>
      </div>

      <div
        className="mb-4 inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-2 transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `rgba(${FOOD_TINT},0.22)`,
          borderColor: `rgba(${FOOD_TINT},0.42)`,
        }}
      >
        {food.thumbnail ? (
          <Image
            src={food.thumbnail}
            alt=""
            width={60}
            height={60}
            className="object-contain"
          />
        ) : (
          <span className="text-3xl">{food.emoji}</span>
        )}
      </div>

      <div className="mb-3.5">
        <div
          className="text-lg leading-tight font-bold md:text-xl"
          style={{ color: "#4a3060" }}
        >
          {food.ko}
        </div>
      </div>

      <div
        className="mb-3.5 h-px"
        style={{
          background: `linear-gradient(to right, ${FOOD_BORDER}, transparent)`,
        }}
      />

      <div className="flex flex-wrap gap-1.5">
        <span
          className="rounded-full border px-2.5 py-1 text-xs font-bold"
          style={{
            background: "rgba(189,222,255,0.3)",
            color: "#0284c7",
            borderColor: "rgba(189,222,255,0.6)",
          }}
        >
          요리 Lv.{food.level}
        </span>
        <span
          className="rounded-full border px-2.5 py-1 text-xs font-bold"
          style={{
            background: `rgba(${FOOD_TINT},0.18)`,
            color: "#d47840",
            borderColor: `rgba(${FOOD_TINT},0.45)`,
          }}
        >
          💰 {food.sellMin.toLocaleString()} ~ {food.sellMax.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}

function FoodListView({ foods }: { foods: FoodDetail[] }) {
  return (
    <div
      className="overflow-x-auto rounded-[20px] border-[1.5px]"
      style={{
        background: "rgba(255,252,250,0.9)",
        borderColor: `rgba(${FOOD_TINT},0.34)`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <table className="w-full">
        <thead>
          <tr
            className="border-b-[1.5px]"
            style={{ borderColor: `rgba(${FOOD_TINT},0.4)` }}
          >
            {["요리 이름", "요리 레벨", "가격 범위"].map((h) => (
              <th
                key={h}
                className="px-4 py-3.5 text-left text-sm font-bold tracking-wider uppercase"
                style={{ color: "#b080c0" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr
              key={food.id}
              className="border-b last:border-0"
              style={{ borderColor: `rgba(${FOOD_TINT},0.25)` }}
            >
              <td className="p-0">
                <Link
                  href={`/cooking/recipes/${food.id}`}
                  className="flex items-center px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span className="mr-2.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                    {food.thumbnail ? (
                      <Image
                        src={food.thumbnail}
                        alt=""
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-lg">{food.emoji}</span>
                    )}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#4a3060" }}
                  >
                    {food.ko}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/cooking/recipes/${food.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background: "rgba(189,222,255,0.3)",
                      color: "#0284c7",
                      borderColor: "rgba(189,222,255,0.6)",
                    }}
                  >
                    Lv.{food.level}
                  </span>
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={`/cooking/recipes/${food.id}`}
                  className="block px-4 py-3.5 no-underline transition-opacity hover:opacity-90"
                >
                  <span
                    className="rounded-full border px-2.5 py-1 text-sm font-bold"
                    style={{
                      background: `rgba(${FOOD_TINT},0.18)`,
                      color: "#d47840",
                      borderColor: `rgba(${FOOD_TINT},0.45)`,
                    }}
                  >
                    {food.sellMin.toLocaleString()} ~{" "}
                    {food.sellMax.toLocaleString()}
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Page Client ──────────────────────────────────────────────────────────

export default function FoodsPageClient() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");

  const filteredFoods = FOODS.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.ko.includes(search),
  );

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
          <Link href="/cooking" className="transition-colors hover:opacity-80">
            요리
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>요리 도감</span>
        </nav>

        <div className="mb-11">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="m-0 text-[clamp(20px,4vw,28px)] font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
              >
                요리 도감
              </h1>
              <p
                className="mt-1 text-xs md:text-sm"
                style={{ color: "#8a6898" }}
              >
                두근두근타운 요리 레시피 및 수익 정보
              </p>
            </div>

            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "rgba(230,210,230,0.3)" }}
              role="tablist"
              aria-label="보기 방식"
            >
              {[
                { mode: "card" as const, icon: LayoutGrid, label: "카드" },
                { mode: "list" as const, icon: List, label: "리스트" },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  role="tab"
                  aria-selected={viewMode === mode}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all md:px-3.5 md:text-sm"
                  style={{
                    background: viewMode === mode ? "white" : "transparent",
                    color: viewMode === mode ? "#6b4a7a" : "#8a6898",
                    boxShadow:
                      viewMode === mode ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <Icon size={14} strokeWidth={2.2} aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="relative max-w-xs flex-1">
            <Search
              size={14}
              className="absolute top-1/2 left-3 -translate-y-1/2"
              style={{ color: "#8a6898" }}
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              type="search"
              placeholder="요리 이름 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="요리 이름 검색"
              className="w-full rounded-xl border-[1.5px] py-2 pr-4 pl-9 text-xs transition-all outline-none placeholder:opacity-70 focus:border-[#f5a060] md:py-2.5 md:text-sm"
              style={{
                background: "rgba(255,248,240,0.5)",
                borderColor: "rgba(230,210,200,0.6)",
                color: "#4a3060",
              }}
            />
          </div>
          <span
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold md:text-sm"
            style={{
              background: `rgba(${FOOD_TINT},0.15)`,
              borderColor: `rgba(${FOOD_TINT},0.4)`,
              color: "#d47840",
            }}
          >
            <UtensilsCrossed size={12} aria-hidden />
            {filteredFoods.length}종
          </span>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-3 text-4xl" aria-hidden>
              🔍
            </div>
            <p className="text-xs md:text-sm" style={{ color: "#8a6898" }}>
              검색 결과가 없어요
            </p>
          </div>
        ) : viewMode === "card" ? (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <FoodListView foods={filteredFoods} />
        )}
      </div>
    </section>
  );
}
