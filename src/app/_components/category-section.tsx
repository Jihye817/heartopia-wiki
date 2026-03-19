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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 4c-2 0-3.5 1.5-4 3-1 0-2 .5-2.5 1.5S5 10 5 11.5c0 2 1.5 3.5 3.5 4"
        fill={color}
        fillOpacity="0.2"
      />
      <path
        d="M12 4c2 0 3.5 1.5 4 3 1 0 2 .5 2.5 1.5S19 10 19 11.5c0 2-1.5 3.5-3.5 4"
        fill={color}
        fillOpacity="0.2"
      />
      <ellipse cx="12" cy="14" rx="4" ry="3" fill={color} fillOpacity="0.25" />
      <path d="M8 14h8" />
      <path d="M9 17l1.5-2" />
      <path d="M15 17l-1.5-2" />
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M16 7c.5-.5 1.5-1 3-1s2.5.5 3 1"
        fill={color}
        fillOpacity="0.2"
      />
      <path
        d="M16 7c-2 2-4 4-6 5-2 1-4 2-6 1.5"
        fill={color}
        fillOpacity="0.15"
      />
      <path d="M8 14c-2 0-4-1-5-2.5" />
      <ellipse cx="12" cy="14" rx="5" ry="4" fill={color} fillOpacity="0.2" />
      <path d="M14 12l2-2 2 1" />
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
    items: [
      {
        label: "재료 계산기",
        href: "/cooking/ingredient-calculator",
      },
      {
        label: "수익 계산기",
        href: "/cooking/profit-calculator",
      },
      {
        label: "레시피",
        href: "/cooking/recipes",
      },
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
    items: [
      {
        label: "물고기 도감",
        href: "/fishing/fish-encyclopedia",
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
    items: [
      {
        label: "새 도감",
        href: "/birds/bird-encyclopedia",
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
              className="text-xs font-bold uppercase tracking-widest"
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
            const isGardening = cat.id === "garden";
            const showComingSoon = isHovered && !isGardening;
            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] px-6 pb-6 pt-7 transition-all duration-300 ease-out"
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
                  className="absolute -bottom-2.5 -right-2.5 transition-opacity duration-300"
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
                        className="mb-0.5 text-xl font-bold leading-tight"
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
                        className="mb-0.5 text-xl font-bold leading-tight"
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
