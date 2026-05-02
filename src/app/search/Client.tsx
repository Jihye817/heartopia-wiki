"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SearchResultItem {
  id: string;
  name: string;
  href: string;
  thumbnail?: string | null;
  emoji: string;
}

export interface SearchResultGroup {
  key: string;
  label: string;
  emoji: string;
  bg: string;
  items: SearchResultItem[];
}

interface Props {
  query: string;
  groups: SearchResultGroup[];
  total: number;
}

// ── Highlight ──────────────────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="rounded-sm px-0.5"
            style={{ background: "#FFE066", color: "#1a1a1a" }}
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function SearchClient({ query, groups, total }: Props) {
  const router = useRouter();
  const [input, setInput] = useState(query);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleGroup = (key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim())
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
  };

  return (
    <section className="px-4 pt-8 pb-20 md:px-6">
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
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            검색
          </span>
        </nav>

        {/* Search Bar */}
        <div className="mb-8" style={{ animation: "fadeUp 0.4s ease-out" }}>
          <form onSubmit={handleSubmit} className="relative mb-4">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
              size={18}
              style={{ color: "var(--wiki-text-muted)" }}
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="아이템, 물고기, 레시피 검색..."
              aria-label="검색"
              className="h-[52px] w-full rounded-xl border border-[var(--wiki-border)] bg-white pr-[52px] pl-[46px] text-[15px] transition-all outline-none placeholder:text-[var(--wiki-text-muted)] focus:border-[#C5B8D9] focus:shadow-[0_0_0_3px_rgba(139,126,200,0.08)]"
              style={{
                color: "var(--wiki-text-primary)",
                fontFamily: "var(--font-pretendard), sans-serif",
              }}
            />
            <button
              type="submit"
              aria-label="검색 실행"
              className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg transition-colors hover:opacity-80"
              style={{ background: "var(--wiki-text-primary)", color: "white" }}
            >
              <Search size={15} strokeWidth={2.5} aria-hidden />
            </button>
          </form>

          {query ? (
            <p
              className="text-base"
              style={{ color: "var(--wiki-text-primary)" }}
            >
              <strong
                style={{ fontWeight: 700, color: "var(--wiki-text-primary)" }}
              >
                &ldquo;<span style={{ color: "#7C5CBF" }}>{query}</span>&rdquo;
              </strong>
              <span style={{ color: "var(--wiki-text-secondary)" }}>
                에 대한 검색 결과{" "}
              </span>
              <span
                className="font-bold"
                style={{
                  color: "#7C5CBF",
                  fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
                }}
              >
                {total}
              </span>
              <span
                className="font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                건
              </span>
            </p>
          ) : (
            <p
              className="text-[15px]"
              style={{ color: "var(--wiki-text-tertiary)" }}
            >
              검색어를 입력해주세요
            </p>
          )}
        </div>

        {/* Results */}
        {!query ? null : total === 0 ? (
          <div
            className="py-20 text-center"
            style={{ animation: "fadeUp 0.4s ease-out 0.05s both" }}
          >
            <div className="mb-4 text-5xl" aria-hidden>
              🔍
            </div>
            <p
              className="mb-1.5 text-base font-semibold"
              style={{ color: "var(--wiki-text-primary)" }}
            >
              검색 결과가 없어요
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--wiki-text-tertiary)" }}
            >
              다른 키워드로 검색해보세요
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {groups.map((group, i) => (
              <section
                key={group.key}
                style={{
                  animation: `fadeUp 0.4s ease-out ${0.05 + i * 0.05}s both`,
                }}
              >
                {/* Group Header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.key)}
                  className="mb-3 flex w-full cursor-pointer items-center gap-2 border-b border-[var(--wiki-border-light)] pb-2.5 text-left"
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg border text-sm"
                    style={{
                      background: group.bg,
                      borderColor: "var(--wiki-border)",
                    }}
                  >
                    {group.emoji}
                  </div>
                  <span
                    className="text-base font-bold"
                    style={{ color: "var(--wiki-text-primary)" }}
                  >
                    {group.label}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold tabular-nums"
                    style={{
                      background: "#E8E0F8",
                      color: "#7C5CBF",
                      fontFamily:
                        "'Outfit', var(--font-pretendard), sans-serif",
                    }}
                  >
                    {group.items.length}
                  </span>
                  <svg
                    className="ml-auto shrink-0 transition-transform duration-200"
                    style={{
                      transform: collapsed.has(group.key)
                        ? "rotate(-90deg)"
                        : "rotate(0deg)",
                      color: "var(--wiki-text-muted)",
                    }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Result Cards */}
                {!collapsed.has(group.key) && (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                    {group.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl border border-[var(--wiki-border)] bg-white px-4 py-3.5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8d8d8] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                      >
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl text-2xl"
                          style={{ background: group.bg }}
                        >
                          {item.thumbnail ? (
                            <Image
                              src={item.thumbnail}
                              alt=""
                              width={56}
                              height={56}
                              className="h-full w-full object-contain p-1"
                            />
                          ) : (
                            <span aria-hidden>{item.emoji}</span>
                          )}
                        </div>
                        <span
                          className="flex-1 text-sm font-semibold"
                          style={{ color: "var(--wiki-text-primary)" }}
                        >
                          <Highlight text={item.name} query={query} />
                        </span>
                        <span
                          className="text-base"
                          style={{ color: "var(--wiki-text-muted)" }}
                          aria-hidden
                        >
                          ›
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
