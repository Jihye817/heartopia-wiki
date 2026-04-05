"use client";

import { useState } from "react";
import Link from "next/link";

// v1 아이콘 (인라인 SVG)
function FlowerIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 2a3 3 0 0 1 3 3c0 1.66-1.34 3-3 3s-3-1.34-3-3a3 3 0 0 1 3-3z"
        fill={color}
        fillOpacity="0.25"
      />
      <path
        d="M12 16a3 3 0 0 1 3 3c0 1.66-1.34 3-3 3s-3-1.34-3-3a3 3 0 0 1 3-3z"
        fill={color}
        fillOpacity="0.25"
      />
      <path
        d="M2 12a3 3 0 0 1 3-3c1.66 0 3 1.34 3 3s-1.34 3-3 3a3 3 0 0 1-3-3z"
        fill={color}
        fillOpacity="0.25"
      />
      <path
        d="M16 12a3 3 0 0 1 3-3c1.66 0 3 1.34 3 3s-1.34 3-3 3a3 3 0 0 1-3-3z"
        fill={color}
        fillOpacity="0.25"
      />
      <path
        d="M4.93 4.93a3 3 0 0 1 4.24 0c1.17 1.17 1.17 3.07 0 4.24-1.17 1.17-3.07 1.17-4.24 0a3 3 0 0 1 0-4.24z"
        fill={color}
        fillOpacity="0.15"
      />
      <path
        d="M14.83 14.83a3 3 0 0 1 4.24 0c1.17 1.17 1.17 3.07 0 4.24-1.17 1.17-3.07 1.17-4.24 0a3 3 0 0 1 0-4.24z"
        fill={color}
        fillOpacity="0.15"
      />
      <path
        d="M4.93 19.07a3 3 0 0 1 0-4.24c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24a3 3 0 0 1-4.24 0z"
        fill={color}
        fillOpacity="0.15"
      />
      <path
        d="M14.83 9.17a3 3 0 0 1 0-4.24c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24a3 3 0 0 1-4.24 0z"
        fill={color}
        fillOpacity="0.15"
      />
    </svg>
  );
}

function FishIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M6.5 12c0-4 3.5-7 7.5-7s8 3 8 7-4 7-8 7-7.5-3-7.5-7z"
        fill={color}
        fillOpacity="0.2"
      />
      <path d="M2 12s2-4 4.5-4" />
      <path d="M2 12s2 4 4.5 4" />
      <circle cx="17" cy="10" r="1" fill={color} />
    </svg>
  );
}

function PawPrintIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" fill={color} fillOpacity="0.3" />
      <circle cx="18" cy="8" r="2" fill={color} fillOpacity="0.3" />
      <circle cx="4" cy="8" r="2" fill={color} fillOpacity="0.3" />
      <circle cx="7" cy="15" r="2" fill={color} fillOpacity="0.3" />
      <path
        d="M8 15.5c1 2 2.5 3.5 5 4s4-1 5-3-1-4-2.5-4.5S9 13.5 8 15.5z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
      />
    </svg>
  );
}

function ChefHatIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6V13.87z"
        fill={color}
        fillOpacity="0.15"
      />
      <line x1="6" x2="18" y1="17" y2="17" />
    </svg>
  );
}

function BugIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 7 Q8.5 4.5 7 3" />
      <circle cx="7" cy="3" r="0.7" fill={color} stroke="none" />
      <path d="M14 7 Q15.5 4.5 17 3" />
      <circle cx="17" cy="3" r="0.7" fill={color} stroke="none" />
      <circle cx="12" cy="13" r="6.5" fill={color} fillOpacity="0.16" />
      <line
        x1="12"
        y1="6.5"
        x2="12"
        y2="19.5"
        stroke={color}
        strokeOpacity="0.3"
        strokeWidth="1.2"
      />
      <path d="M5.8 10 L3 8.5" />
      <path d="M5.5 13 L2.5 13" />
      <path d="M5.8 16 L3 17.5" />
      <path d="M18.2 10 L21 8.5" />
      <path d="M18.5 13 L21.5 13" />
      <path d="M18.2 16 L21 17.5" />
    </svg>
  );
}

function BirdIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse
        cx="11"
        cy="14"
        rx="6"
        ry="4.5"
        fill={color}
        fillOpacity="0.16"
      />
      <circle cx="17" cy="9.5" r="3" fill={color} fillOpacity="0.2" />
      <path
        d="M19.5 9 L22 8.5 L19.8 10.2"
        fill={color}
        fillOpacity="0.5"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="17.8" cy="8.8" r="0.6" fill={color} stroke="none" />
      <path d="M5.5 13 Q3 13 2 15" />
      <path d="M5.5 15 Q3 16 2.5 18" />
    </svg>
  );
}

function PouchIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6 C9 3.5 10 2 12 2 C14 2 15 3.5 15 6" />
      <path
        d="M6.5 8 Q5.5 8 5 9 L4 19 Q3.8 21 6 21 L18 21 Q20.2 21 20 19 L19 9 Q18.5 8 17.5 8 Z"
        fill={color}
        fillOpacity="0.14"
        stroke={color}
      />
      <path d="M10 8 Q12 9.5 14 8" />
      <circle cx="12" cy="7.5" r="0.7" fill={color} stroke="none" />
      <path
        d="M8 12 Q8 10.5 9.5 10.5"
        stroke={color}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
    </svg>
  );
}

const CATEGORIES = [
  {
    id: "garden",
    icon: FlowerIcon,
    title: "원예",
    subtitle: "Gardening",
    color: "#f8a4c8",
    bg: "#fff0f6",
    border: "#ffd6e8",
    accent: "#e8739b",
    categoryHref: "/gardening",
    items: [
      {
        label: "꽃 교배",
        href: "/gardening/flowers",
      },
      {
        label: "작물 재배",
        href: "/gardening/crops",
      },
    ],
  },
  {
    id: "cooking",
    icon: ChefHatIcon,
    title: "요리",
    subtitle: "Cooking",
    color: "#f5a878",
    bg: "#fff8f0",
    border: "#fde0c8",
    accent: "#d47840",
    categoryHref: "/cooking",
    items: [
      {
        label: "레시피",
        href: "/cooking/recipes",
      },
      // {
      //   label: "재료 계산기 (준비중)",
      //   href: "/cooking/ingredient-calculator",
      // },
      // {
      //   label: "수익 계산기 (준비중)",
      //   href: "/cooking/profit-calculator",
      // },
    ],
  },
  {
    id: "fishing",
    icon: FishIcon,
    title: "낚시",
    subtitle: "Fishing",
    color: "#7ec8e3",
    bg: "#f0faff",
    border: "#c8e8f8",
    accent: "#4a9bbf",
    categoryHref: "/fishing",
    items: [
      {
        label: "물고기 도감",
        href: "/fishing",
      },
    ],
  },
  {
    id: "bugs",
    icon: BugIcon,
    title: "곤충 채집",
    subtitle: "Bug Catching",
    color: "#8bc34a",
    bg: "#f1f8e9",
    border: "#c5e1a5",
    accent: "#689f38",
    items: [
      {
        label: "곤충 도감",
        href: "/bugs/bug-encyclopedia",
      },
    ],
  },
  {
    id: "birds",
    icon: BirdIcon,
    title: "새 관찰",
    subtitle: "Bird Watching",
    color: "#b89fdc",
    bg: "#f8f0ff",
    border: "#e0d0f8",
    accent: "#8a6bbf",
    categoryHref: "/birds",
    items: [
      {
        label: "새 도감",
        href: "/birds",
      },
    ],
  },
  {
    id: "pets",
    icon: PawPrintIcon,
    title: "반려동물",
    subtitle: "Pets",
    color: "#e0916e",
    bg: "#fff3ef",
    border: "#f5d0c4",
    accent: "#c96a42",
    items: [
      {
        label: "강아지",
        href: "/pets/dogs",
      },
      {
        label: "고양이",
        href: "/pets/cats",
      },
    ],
  },
  {
    id: "other-collection",
    icon: PouchIcon,
    title: "기타 수집",
    subtitle: "Other Collection",
    color: "#7b8fa3",
    bg: "#f4f7fa",
    border: "#d8e0e8",
    accent: "#5a6f82",
    categoryHref: "/others",
    items: [
      {
        label: "생산품",
        href: "/others/products",
      },
    ],
  },
] as const;

export function CategorySection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-[rgba(255,252,248,1)] px-6 py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-11 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div
              className="h-px w-8"
              style={{ background: "rgba(200,160,200,0.4)" }}
            />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#b080c0", letterSpacing: "0.12em" }}
            >
              CATEGORY
            </span>
            <div
              className="h-px w-8"
              style={{ background: "rgba(200,160,200,0.4)" }}
            />
          </div>
          <h2
            className="m-0 text-[clamp(24px,4vw,34px)] font-bold tracking-tight"
            style={{ color: "#6b4a7a", letterSpacing: "-0.02em" }}
          >
            정보 카테고리
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isHovered = hovered === cat.id;
            const showComingSoon =
              isHovered && !("categoryHref" in cat && cat.categoryHref);
            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] px-6 pt-7 pb-6 transition-all duration-300 ease-out"
                style={{
                  background: isHovered ? cat.bg : "rgba(255,252,254,0.9)",
                  border: `1.5px solid ${
                    isHovered ? cat.border : "rgba(230,210,230,0.6)"
                  }`,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? `0 12px 32px rgba(0,0,0,0.06), 0 0 0 2px ${cat.border}`
                    : "0 2px 12px rgba(0,0,0,0.04)",
                  ["--accent" as string]: cat.accent,
                }}
              >
                {showComingSoon && (
                  <div
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-[20px] bg-white/90 backdrop-blur-sm transition-opacity duration-300"
                    style={{ opacity: showComingSoon ? 1 : 0 }}
                    aria-hidden
                  >
                    <span
                      className="text-base font-semibold"
                      style={{ color: cat.accent }}
                    >
                      준비중입니다
                    </span>
                  </div>
                )}

                <div
                  className="absolute -right-2.5 -bottom-2.5 transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 0.08 : 0.04,
                    transform: "scale(2.5) rotate(-10deg)",
                    transformOrigin: "bottom right",
                  }}
                >
                  <Icon size={48} color={cat.color} />
                </div>

                {"categoryHref" in cat && cat.categoryHref ? (
                  <Link href={cat.categoryHref} className="block no-underline">
                    <div
                      className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-[1.5px] transition-transform duration-300"
                      style={{
                        background: `${cat.color}22`,
                        borderColor: `${cat.color}44`,
                        transform: isHovered
                          ? "scale(1.08) rotate(-4deg)"
                          : "scale(1)",
                      }}
                    >
                      <Icon size={26} color={cat.accent} />
                    </div>
                    <div className="mb-3.5">
                      <div
                        className="mb-0.5 text-xl leading-tight font-bold"
                        style={{ color: "#4a3060" }}
                      >
                        {cat.title}
                      </div>
                      <div
                        className="text-xs font-semibold uppercase"
                        style={{
                          color: cat.accent,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {cat.subtitle}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <>
                    <div
                      className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-[1.5px] transition-transform duration-300"
                      style={{
                        background: `${cat.color}22`,
                        borderColor: `${cat.color}44`,
                        transform: isHovered
                          ? "scale(1.08) rotate(-4deg)"
                          : "scale(1)",
                      }}
                    >
                      <Icon size={26} color={cat.accent} />
                    </div>
                    <div className="mb-3.5">
                      <div
                        className="mb-0.5 text-xl leading-tight font-bold"
                        style={{ color: "#4a3060" }}
                      >
                        {cat.title}
                      </div>
                      <div
                        className="text-xs font-semibold uppercase"
                        style={{
                          color: cat.accent,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {cat.subtitle}
                      </div>
                    </div>
                  </>
                )}

                <div
                  className="mb-3.5 h-px"
                  style={{
                    background: `linear-gradient(to right, ${cat.border}, transparent)`,
                  }}
                />

                <div className="flex flex-col gap-1.5">
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-1.5 py-0.5 text-[13px] text-[#8a6898] no-underline transition-colors duration-150 group-hover:text-[var(--accent)]"
                    >
                      <span
                        className="h-1 w-1 shrink-0 rounded-full opacity-80"
                        style={{ background: cat.color }}
                      />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
