"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface LatestUpdate {
  updated_at: string;
  content: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}.${dd}`;
}

interface HeroSectionProps {
  latestUpdate?: LatestUpdate | null;
}

export function HeroSection({ latestUpdate }: HeroSectionProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <section
      className="relative px-4 pt-28 pb-24 text-center md:px-6"
      style={{
        animation: "fadeUp 0.5s ease-out",
        backgroundImage:
          "linear-gradient(180deg, rgba(244,241,248,0.5) 0%, var(--wiki-bg) 100%), url('/images/pics/ddt1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {latestUpdate && (
        <div className="mb-8 flex justify-center">
          <div
            className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
            style={{
              background: "white",
              borderColor: "#E2E8F0",
              color: "var(--wiki-text-secondary)",
            }}
          >
            <span
              className="rounded px-1.5 py-0.5 text-xs font-bold"
              style={{ background: "#8B7EC8", color: "white" }}
            >
              NEW
            </span>
            <span style={{ color: "var(--wiki-text-muted)" }}>
              {formatDate(latestUpdate.updated_at)}
            </span>
            <span
              className="hidden sm:inline"
              style={{ color: "var(--wiki-text-muted)" }}
            >
              ·
            </span>
            <span className="hidden sm:inline">{latestUpdate.content}</span>
          </div>
        </div>
      )}

      <h1
        className="m-0 mb-3 text-[34px] font-bold tracking-tight md:text-[50px]"
        style={{
          fontFamily: "'Outfit', var(--font-jua), sans-serif",
          color: "#ffffff",
          fontWeight: 800,
          letterSpacing: 2,
          textShadow:
            "0 0 16px rgba(59,130,246,1), 0 0 32px rgba(59,130,246,0.8), 0 2px 10px rgba(29,78,216,0.7)",
        }}
      >
        두근두근타운 위키
      </h1>
      <p className="m-0 mb-10 text-[15px] font-normal text-[var(--wiki-text-secondary)]">
        두근두근타운의 모든 정보를 한 곳에서. 원예, 채집, 요리 도감을
        확인하세요.
      </p>

      <form
        className="relative mx-auto max-w-[520px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim()) router.push(`/search?q=${encodeURIComponent(search.trim())}`);
        }}
      >
        <svg
          className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none text-[var(--wiki-text-muted)]"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="아이템, 물고기, 레시피 검색..."
          aria-label="위키 검색"
          className="w-full rounded-xl border border-[var(--wiki-border)] bg-white py-3.5 pr-14 pl-[46px] text-[15px] text-[var(--wiki-text-primary)] shadow-sm outline-none placeholder:text-[var(--wiki-text-muted)] focus:border-[#C5B8D9] focus:shadow-[0_0_0_3px_rgba(139,126,200,0.08),0_2px_8px_rgba(0,0,0,0.06)]"
          style={{
            fontFamily: "var(--font-pretendard), sans-serif",
            transition: "0.2s ease",
          }}
        />
        <button
          type="submit"
          aria-label="검색"
          className="absolute top-1/2 right-2 -translate-y-1/2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:opacity-80"
          style={{ background: "var(--wiki-text-primary)", color: "white" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </form>
    </section>
  );
}
