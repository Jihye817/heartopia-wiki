"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product, ProductCategory } from "../../_data/products";

/** 지도 에셋이 없을 때 우측 패널에 쓰는 버섯 플레이스홀더 */
const MAP_PLACEHOLDER_SRC = "/images/others/mushrooms/mushroom_oyster.png";

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  mushroom: "버섯",
  fruit: "과일",
  wood: "목재",
  stone: "석재",
};

const CATEGORY_EMOJI: Record<ProductCategory, string> = {
  mushroom: "🍄",
  fruit: "🍎",
  wood: "🪵",
  stone: "🪨",
};

const MUSHROOM_TINT = "160, 100, 220";
const FRUIT_TINT = "232, 120, 140";

const getCategoryTint = (category: ProductCategory) => {
  return category === "mushroom" ? MUSHROOM_TINT : FRUIT_TINT;
};

const getAccentBorder = (category: ProductCategory) => {
  return category === "mushroom" ? "#c4b5e8" : "#fbcfe8";
};

/** 예: 느타리버섯 → 이상한 느타리버섯 */
const buildStrangeMushroomName = (ko: string) => {
  const stem = ko.replace(/버섯$/, "");
  return stem ? `이상한 ${stem}버섯` : `이상한 ${ko}`;
};

interface StrangeStage {
  src: string;
  label: string;
}

const collectStrangeStages = (product: Product): StrangeStage[] | null => {
  const { strange } = product;
  if (!strange) {
    return null;
  }
  const stages = [
    strange.thumbnail1,
    strange.thumbnail2,
    strange.thumbnail3,
  ].filter((src): src is string => Boolean(src));
  if (stages.length !== 3) {
    return null;
  }
  const label = buildStrangeMushroomName(product.ko);
  return stages.map((src) => ({ src, label }));
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const tint = getCategoryTint(product.category);
  const accentBorder = getAccentBorder(product.category);
  const emoji = CATEGORY_EMOJI[product.category];
  const strangeStages = collectStrangeStages(product);
  const notesText = product.notes?.trim() ?? "";
  const hasNotesOnly = Boolean(notesText) && !strangeStages;
  const showCollectionCard = Boolean(strangeStages) || hasNotesOnly;

  const collectionCardTitle = strangeStages
    ? strangeStages[0].label
    : "특이사항";

  return (
    <section
      className="px-6 pt-8 pb-16"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <nav
          className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-bold tracking-wide md:mb-8 md:text-sm"
          style={{ color: "#b080c0" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <Link href="/others" className="transition-colors hover:opacity-80">
            기타 수집
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <Link
            href="/others/products"
            className="transition-colors hover:opacity-80"
          >
            생산품 도감
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>{product.ko}</span>
        </nav>

        <Link
          href="/others/products"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5 md:mb-4 md:text-sm"
          style={{ color: "#b080c0" }}
        >
          ← 생산품 목록으로
        </Link>

        <div
          className="relative mt-4 overflow-hidden rounded-[20px] border-[1.5px] p-6 md:p-7"
          style={{
            background: "rgba(255,252,254,0.95)",
            borderColor: "rgba(230,210,230,0.6)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            {/* 좌측: 기본 정보 */}
            <div>
              <div
                className="mb-4 inline-flex h-[144px] w-[144px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[1.5px] p-3 text-5xl"
                style={{
                  background: `rgba(${tint},0.18)`,
                  borderColor: `rgba(${tint},0.4)`,
                }}
              >
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.ko}
                    width={120}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span aria-hidden>{emoji}</span>
                )}
              </div>

              <h1
                className="m-0 mb-3 text-[clamp(20px,4vw,28px)] leading-tight font-bold tracking-tight md:text-[clamp(24px,4vw,34px)]"
                style={{ color: "#4a3060" }}
              >
                {product.ko}
              </h1>
              <div
                className="mb-4 h-px"
                style={{
                  background: `linear-gradient(to right, ${accentBorder}, transparent)`,
                }}
              />

              <div className="mb-4 flex flex-wrap gap-1.5">
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                  style={{
                    background: "rgba(189,222,255,0.3)",
                    color: "#0284c7",
                    borderColor: "rgba(189,222,255,0.6)",
                  }}
                >
                  {CATEGORY_LABEL[product.category]}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-bold md:text-sm"
                  style={{
                    background: `rgba(${tint},0.2)`,
                    color: "#6b4a7a",
                    borderColor: `rgba(${tint},0.45)`,
                  }}
                >
                  리스폰 {product.respawnTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  ["판매 가격", `💰 ${product.sellPrice}G`],
                  ["채집 장소", product.location],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="min-w-[140px] flex-1 rounded-2xl border-[1.5px] px-3.5 py-2.5"
                    style={{
                      background: "rgba(255,240,246,0.5)",
                      borderColor: "rgba(230,210,230,0.6)",
                    }}
                  >
                    <div
                      className="mb-0.5 text-xs font-bold tracking-wider uppercase md:text-sm"
                      style={{ color: "#8a6898" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm font-bold md:text-base"
                      style={{ color: "#6b4a7a" }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {showCollectionCard && (
                <>
                  <div
                    className="my-5 h-px w-full"
                    style={{ background: "rgba(230,210,230,0.6)" }}
                  />

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
                        style={{ background: "#c06898" }}
                      />
                      <span
                        className={
                          strangeStages
                            ? "text-xs font-bold md:text-sm"
                            : "text-xs font-bold tracking-widest uppercase md:text-sm"
                        }
                        style={{ color: "#8a6898" }}
                      >
                        {collectionCardTitle}
                      </span>
                    </div>
                    <div className="p-4">
                      {strangeStages ? (
                        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
                          {strangeStages.map((stage, index) => (
                            <li
                              key={`${stage.src}-${index}`}
                              className="flex flex-col items-center text-center"
                            >
                              <div
                                className="mb-2 flex h-[100px] w-full max-w-[120px] items-center justify-center overflow-hidden rounded-xl border-[1.5px] p-2 md:h-[110px] md:max-w-[130px]"
                                style={{
                                  background: `rgba(${tint},0.12)`,
                                  borderColor: `rgba(${tint},0.35)`,
                                }}
                              >
                                <Image
                                  src={stage.src}
                                  alt={stage.label}
                                  width={96}
                                  height={96}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          className="m-0 text-sm leading-relaxed font-semibold whitespace-pre-line md:text-base"
                          style={{ color: "#4a3060" }}
                        >
                          {notesText}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 우측: 지도 (플레이스홀더 — 버섯 이미지) */}
            <div
              className="flex flex-col rounded-2xl border-[1.5px] p-4 md:min-h-[320px]"
              style={{
                background: "rgba(255,252,254,0.9)",
                borderColor: "rgba(230,210,230,0.6)",
              }}
            >
              <div
                className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase md:text-sm"
                style={{ color: "#b080c0" }}
              >
                🗺️ 채집 지도
              </div>
              <div
                className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden rounded-xl border-[1.5px] md:min-h-[280px]"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(250,245,255,0.95) 0%, rgba(255,252,254,1) 55%, rgba(255,240,246,0.5) 100%)",
                  borderColor: "rgba(230,210,230,0.55)",
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: "rgba(138,104,152,0.6)" }}
                >
                  준비중입니다
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
