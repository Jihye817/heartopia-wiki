"use client";

import Link from "next/link";

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

function NpcIcon({
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.6" />
      <path
        d="M4 20c0-4.4 3.58-8 8-8s8 3.6 8 8"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.6"
      />
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
    desc: "꽃 교배와 작물 재배",
    color: "var(--wiki-cat-garden)",
    accent: "#e8739b",
    bg: "var(--wiki-cat-garden-bg)",
    href: "/gardening",
  },
  {
    id: "cooking",
    icon: ChefHatIcon,
    title: "요리",
    desc: "레시피와 재료 정보",
    color: "var(--wiki-cat-cooking)",
    accent: "#d47840",
    bg: "var(--wiki-cat-cooking-bg)",
    href: "/cooking",
  },
  {
    id: "fishing",
    icon: FishIcon,
    title: "낚시",
    desc: "물고기 도감과 낚시터",
    color: "var(--wiki-cat-fishing)",
    accent: "#4a9bbf",
    bg: "var(--wiki-cat-fishing-bg)",
    href: "/fishing",
  },
  {
    id: "bugs",
    icon: BugIcon,
    title: "곤충 채집",
    desc: "곤충 도감과 채집 정보",
    color: "var(--wiki-cat-bugs)",
    accent: "#689f38",
    bg: "var(--wiki-cat-bugs-bg)",
    href: "/bugs",
  },
  {
    id: "birds",
    icon: BirdIcon,
    title: "새 관찰",
    desc: "새 도감과 관찰 정보",
    color: "var(--wiki-cat-birds)",
    accent: "#8a6bbf",
    bg: "var(--wiki-cat-birds-bg)",
    href: "/birds",
  },
  {
    id: "pets",
    icon: PawPrintIcon,
    title: "반려동물",
    desc: "강아지와 고양이 가이드",
    color: "var(--wiki-cat-pets)",
    accent: "#c96a42",
    bg: "var(--wiki-cat-pets-bg)",
    href: undefined,
  },
  {
    id: "npc",
    icon: NpcIcon,
    title: "NPC",
    desc: "마을 주민과 캐릭터 정보",
    color: "var(--wiki-cat-npc)",
    accent: "#5a6ee0",
    bg: "var(--wiki-cat-npc-bg)",
    href: "/npc",
  },
  {
    id: "others",
    icon: PouchIcon,
    title: "기타 수집",
    desc: "생산품과 기타 아이템",
    color: "var(--wiki-cat-others)",
    accent: "#5a6f82",
    bg: "var(--wiki-cat-others-bg)",
    href: "/others",
  },
] as const;

export function CategorySection() {
  return (
    <section
      className="px-4 md:px-6"
      style={{ animation: "fadeUp 0.5s ease-out 0.1s both" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-5 flex items-baseline justify-between border-b border-[var(--wiki-border)] pb-3">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-3xl font-bold text-[var(--wiki-text-primary)]"
              style={{
                fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              카테고리
            </span>
            <span className="text-sm text-[var(--wiki-text-tertiary)]">
              전체 도감을 둘러보세요
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const CardContent = (
              <>
                <div
                  className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: cat.bg, color: cat.color, borderColor: `${cat.accent}44` }}
                >
                  <Icon size={20} color={cat.color} />
                </div>
                <div className="text-xl font-bold text-[var(--wiki-text-primary)]">
                  {cat.title}
                </div>
                <div className="text-sm leading-relaxed font-light text-[var(--wiki-text-tertiary)]">
                  {cat.desc}
                </div>
              </>
            );

            const baseCardClass =
              "group relative rounded-xl border-2 bg-white px-[18px] py-[22px] transition-all duration-200 hover:-translate-y-0.5";

            if (cat.href) {
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`${baseCardClass} block no-underline`}
                  style={{ borderColor: `${cat.accent}44` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cat.accent}99`;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${cat.accent}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${cat.accent}44`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <div
                key={cat.id}
                className={`${baseCardClass} cursor-default`}
                style={{ borderColor: `${cat.accent}33` }}
              >
                {CardContent}
                <span className="absolute top-3.5 right-3.5 rounded-full bg-[#F0F0F0] px-2.5 py-0.5 text-sm font-semibold text-[var(--wiki-text-tertiary)]">
                  준비중
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
