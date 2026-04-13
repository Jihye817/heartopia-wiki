"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { FoodListItem, IngredientSlot } from "../_data/foods";
import { getIngredients } from "./actions";

const COOKING_ACCENT = "#D4845A";
const COOKING_BG = "#FDF2EC";
const COOKING_BORDER = "#F0D4C0";

// ── Ingredient Row ────────────────────────────────────────────────────────────

function IngredientRow({ slot, qty }: { slot: IngredientSlot; qty: number }) {
  const [open, setOpen] = useState(false);

  if (slot.specific) {
    return (
      <div
        className="flex items-center gap-3.5 border-b px-6 py-3.5 last:border-0"
        style={{ borderColor: "var(--wiki-border-light)" }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
          style={{ background: COOKING_BG, borderColor: COOKING_BORDER }}
        >
          {slot.specific.thumbnail ? (
            <Image
              src={slot.specific.thumbnail}
              alt=""
              width={24}
              height={24}
              className="object-contain"
            />
          ) : (
            <span className="text-base">{slot.specific.name?.[0] ?? "🌿"}</span>
          )}
        </div>
        <span
          className="flex-1 text-sm font-semibold"
          style={{ color: "var(--wiki-text-primary)" }}
        >
          {slot.specific.ko}
        </span>
        <span
          className="w-20 text-right text-xs"
          style={{ color: "var(--wiki-text-muted)" }}
        >
          ×{slot.amount} / 개당
        </span>
        <span
          className="w-14 text-right text-lg font-bold"
          style={{ color: COOKING_ACCENT, fontFamily: "'Outfit', sans-serif" }}
        >
          {slot.amount * qty}
        </span>
      </div>
    );
  }

  // Group (options) slot
  return (
    <div
      className="border-b last:border-0"
      style={{ borderColor: "var(--wiki-border-light)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3.5 px-6 py-3.5 text-left transition-colors hover:bg-[var(--wiki-bg)]"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border text-base"
          style={{ background: COOKING_BG, borderColor: COOKING_BORDER }}
        >
          {slot.groupEmoji ?? "🌿"}
        </div>
        <span
          className="flex-1 text-sm font-semibold"
          style={{ color: "var(--wiki-text-primary)" }}
        >
          {slot.groupLabel}
          {(slot.options?.length ?? 0) > 0 && (
            <span
              className="ml-1 text-xs font-normal"
              style={{ color: "var(--wiki-text-tertiary)" }}
            >
              ({slot.options!.length}종 중 택1)
            </span>
          )}
          <span
            className="ml-1.5 text-xs"
            style={{ color: "var(--wiki-text-muted)" }}
          >
            {open ? "▲" : "▼"}
          </span>
        </span>
        <span
          className="w-20 text-right text-xs"
          style={{ color: "var(--wiki-text-muted)" }}
        >
          ×{slot.amount} / 개당
        </span>
        <span
          className="w-14 text-right text-lg font-bold"
          style={{ color: COOKING_ACCENT, fontFamily: "'Outfit', sans-serif" }}
        >
          {slot.amount * qty}
        </span>
      </button>

      {open && slot.options && slot.options.length > 0 && (
        <div
          className="border-t bg-[var(--wiki-bg)] px-6 pb-2"
          style={{ borderColor: "var(--wiki-border-light)" }}
        >
          {slot.options.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2.5 py-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md border"
                style={{ background: COOKING_BG, borderColor: COOKING_BORDER }}
              >
                {opt.thumbnail ? (
                  <Image
                    src={opt.thumbnail}
                    alt=""
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-sm">{opt.name?.[0] ?? "🌿"}</span>
                )}
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {opt.ko}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Client ───────────────────────────────────────────────────────────────

interface Props {
  foods: FoodListItem[];
}

export default function CalculatorClient({ foods }: Props) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodListItem | null>(null);
  const [qty, setQty] = useState(1);
  const [ingredients, setIngredients] = useState<IngredientSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const searchAreaRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return foods;
    const q = search.trim().toLowerCase();
    return foods.filter((f) => f.ko.toLowerCase().includes(q));
  }, [foods, search]);

  async function handleSelect(food: FoodListItem) {
    setSelectedFood(food);
    setDropdownOpen(false);
    setSearch("");
    setQty(1);
    setLoading(true);
    try {
      const data = await getIngredients(food.id);
      setIngredients(data);
    } finally {
      setLoading(false);
    }
  }

  function handleDeselect() {
    setSelectedFood(null);
    setIngredients([]);
    setQty(1);
  }

  function changeQty(delta: number) {
    setQty((v) => Math.max(1, Math.min(99, v + delta)));
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section className="px-4 pt-8 pb-20 md:px-6">
      <div className="mx-auto max-w-[980px]">
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
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            재료 계산기
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-8" style={{ animation: "fadeUp 0.4s ease-out" }}>
          <h1
            className="mb-1.5 text-3xl font-bold tracking-tight"
            style={{
              color: "var(--wiki-text-primary)",
              fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            재료 계산기
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            만들고 싶은 음식과 수량을 선택하면 필요한 재료를 자동으로 계산해요.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[340px_1fr]">
          {/* Left: Controls */}
          <div
            className="relative z-10 rounded-2xl border border-[var(--wiki-border)] bg-white"
            style={{ animation: "fadeUp 0.4s ease-out 0.05s both" }}
          >
            {/* Step 1: Food Select */}
            <div className="border-b border-[var(--wiki-border-light)] p-5 md:p-6">
              <div className="mb-2.5 flex items-center gap-1.5">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--wiki-border-light)] text-xs font-bold"
                  style={{
                    color: "var(--wiki-text-tertiary)",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  1
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--wiki-text-tertiary)" }}
                >
                  음식 선택
                </span>
              </div>

              {selectedFood ? (
                <div
                  className="flex items-center gap-3 rounded-xl border p-3.5"
                  style={{
                    background: COOKING_BG,
                    borderColor: COOKING_BORDER,
                  }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
                    style={{ background: "white", borderColor: COOKING_BORDER }}
                  >
                    {selectedFood.thumbnail ? (
                      <Image
                        src={selectedFood.thumbnail}
                        alt=""
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-xl">🍳</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate text-sm font-bold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {selectedFood.ko}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--wiki-text-tertiary)" }}
                    >
                      요리 Lv.{selectedFood.level}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeselect}
                    aria-label="선택 해제"
                    className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors hover:border-[var(--wiki-text-muted)]"
                    style={{
                      borderColor: "var(--wiki-border)",
                      color: "var(--wiki-text-muted)",
                    }}
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </div>
              ) : (
                <div ref={searchAreaRef} className="relative">
                  <Search
                    size={15}
                    className="pointer-events-none absolute top-3 left-3.5"
                    style={{ color: "var(--wiki-text-muted)" }}
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setDropdownOpen(true)}
                    placeholder="음식 이름을 검색하세요..."
                    className="w-full rounded-xl border py-2.5 pr-4 pl-9 text-sm transition-colors outline-none placeholder:text-[var(--wiki-text-muted)]"
                    style={{
                      borderColor: dropdownOpen
                        ? COOKING_BORDER
                        : "var(--wiki-border)",
                      color: "var(--wiki-text-primary)",
                    }}
                  />
                  {dropdownOpen && (
                    <div
                      className="absolute top-[calc(100%+6px)] right-0 left-0 z-10 max-h-60 overflow-y-auto rounded-xl border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
                      style={{ borderColor: "var(--wiki-border)" }}
                    >
                      {filtered.length === 0 ? (
                        <div
                          className="px-4 py-5 text-center text-sm"
                          style={{ color: "var(--wiki-text-muted)" }}
                        >
                          검색 결과가 없어요
                        </div>
                      ) : (
                        filtered.map((food) => (
                          <button
                            key={food.id}
                            type="button"
                            onClick={() => handleSelect(food)}
                            className="flex w-full cursor-pointer items-center gap-2.5 border-b px-3.5 py-2.5 text-left transition-colors last:border-0"
                            style={{ borderColor: "var(--wiki-border-light)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = COOKING_BG;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-[var(--wiki-bg)]"
                              style={{
                                borderColor: "var(--wiki-border-light)",
                              }}
                            >
                              {food.thumbnail ? (
                                <Image
                                  src={food.thumbnail}
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                              ) : (
                                <span className="text-base">🍳</span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div
                                className="truncate text-sm font-semibold"
                                style={{ color: "var(--wiki-text-primary)" }}
                              >
                                {food.ko}
                              </div>
                              <div
                                className="text-xs"
                                style={{ color: "var(--wiki-text-muted)" }}
                              >
                                요리 Lv.{food.level}
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Quantity */}
            {selectedFood && (
              <div className="p-5 md:p-6">
                <div className="mb-2.5 flex items-center gap-1.5">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--wiki-border-light)] text-xs font-bold"
                    style={{
                      color: "var(--wiki-text-tertiary)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    2
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--wiki-text-tertiary)" }}
                  >
                    수량
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => changeQty(-1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-lg font-semibold transition-colors hover:bg-[var(--wiki-bg)]"
                    style={{
                      borderColor: "var(--wiki-border)",
                      color: "var(--wiki-text-secondary)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={qty}
                    min={1}
                    max={99}
                    onChange={(e) =>
                      setQty(
                        Math.max(
                          1,
                          Math.min(99, parseInt(e.target.value) || 1),
                        ),
                      )
                    }
                    className="rounded-lg border py-2 text-center text-xl font-bold transition-colors outline-none"
                    style={{
                      width: "72px",
                      borderColor: "var(--wiki-border)",
                      color: "var(--wiki-text-primary)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => changeQty(1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-lg font-semibold transition-colors hover:bg-[var(--wiki-bg)]"
                    style={{
                      borderColor: "var(--wiki-border)",
                      color: "var(--wiki-text-secondary)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    +
                  </button>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--wiki-text-tertiary)" }}
                  >
                    개
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div
            className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white"
            style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}
          >
            {!selectedFood ? (
              <div className="py-16 text-center">
                <div className="mb-3 text-4xl" aria-hidden>
                  🍳
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  음식을 선택하면 필요한 재료가 표시돼요
                </p>
              </div>
            ) : loading ? (
              <div className="py-16 text-center">
                <p
                  className="text-sm"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  불러오는 중...
                </p>
              </div>
            ) : (
              <>
                <div
                  className="flex items-center justify-between border-b px-6 py-4"
                  style={{ borderColor: "var(--wiki-border-light)" }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--wiki-text-primary)" }}
                  >
                    📦 필요한 재료
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--wiki-text-muted)" }}
                  >
                    {selectedFood.ko} ×{qty} 기준
                  </span>
                </div>
                {ingredients.length === 0 ? (
                  <div className="py-12 text-center">
                    <p
                      className="text-sm"
                      style={{ color: "var(--wiki-text-muted)" }}
                    >
                      재료 정보가 없어요
                    </p>
                  </div>
                ) : (
                  <div>
                    {ingredients.map((slot, i) => (
                      <IngredientRow key={i} slot={slot} qty={qty} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
