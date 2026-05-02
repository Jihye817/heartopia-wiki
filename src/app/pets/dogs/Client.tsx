"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, Search } from "lucide-react";
import type { Pet } from "../_data/pets";

const DOG_ACCENT = "#c96a42";
const DOG_BG = "var(--wiki-cat-pets-bg)";
const DOG_BORDER = "#f5d0c4";

// ── Subcomponents ─────────────────────────────────────────────────────────────

function DogCard({ dog }: { dog: Pet }) {
  return (
    <Link
      href={`/pets/dogs/detail/${dog.id}`}
      className="group flex flex-col items-center rounded-2xl border border-[var(--wiki-border)] bg-white px-5 pt-6 pb-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${DOG_ACCENT}66`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--wiki-border)";
      }}
    >
      <div
        className="mb-4 flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-xl border p-2 transition-transform duration-200 group-hover:scale-105"
        style={{ background: DOG_BG, borderColor: DOG_BORDER }}
      >
        {dog.thumbnail ? (
          <div className="relative h-full w-full">
            <Image src={dog.thumbnail} alt="" fill className="object-contain" />
          </div>
        ) : (
          <span className="text-5xl" aria-hidden>
            🐶
          </span>
        )}
      </div>
      <div
        className="text-xl font-bold"
        style={{ color: "var(--wiki-text-primary)" }}
      >
        {dog.name}
      </div>
    </Link>
  );
}

function DogListView({ dogs }: { dogs: Pet[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--wiki-border-light)] bg-white">
      <table className="w-full min-w-[300px] border-collapse">
        <thead>
          <tr className="border-b border-[var(--wiki-border-light)] bg-[var(--wiki-bg)]">
            <th
              className="px-4 py-3 text-left text-sm font-semibold tracking-wide"
              style={{ color: "var(--wiki-text-tertiary)" }}
            >
              품종
            </th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr
              key={dog.id}
              className="border-b border-[var(--wiki-border-light)] transition-colors last:border-0 hover:bg-[rgba(0,0,0,0.015)]"
            >
              <td className="p-0">
                <Link
                  href={`/pets/dogs/detail/${dog.id}`}
                  className="flex items-center gap-2.5 px-4 py-3 no-underline"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md p-1 text-sm"
                    style={{ background: DOG_BG }}
                  >
                    {dog.thumbnail ? (
                      <Image
                        src={dog.thumbnail}
                        alt=""
                        width={40}
                        height={40}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      "🐶"
                    )}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--wiki-text-primary)" }}
                  >
                    {dog.name}
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

interface DogsClientProps {
  dogs: Pet[];
}

export default function DogsClient({ dogs }: DogsClientProps) {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return dogs;
    const q = search.trim().toLowerCase();
    return dogs.filter((d) => d.name.toLowerCase().includes(q));
  }, [dogs, search]);

  return (
    <section className="px-4 pt-8 pb-20 md:px-6">
      <div className="mx-auto max-w-[1100px]">
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
            href="/pets"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            반려동물
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            강아지
          </span>
        </nav>

        <div
          className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          style={{ animation: "fadeUp 0.4s ease-out" }}
        >
          <div>
            <h1
              className="m-0 mb-1 text-3xl font-bold tracking-tight"
              style={{
                color: "var(--wiki-text-primary)",
                fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              강아지
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--wiki-text-secondary)" }}
            >
              두근두근타운 강아지 종류
            </p>
          </div>
          <div
            className="flex w-fit gap-0.5 rounded-lg bg-[var(--wiki-border-light)] p-0.5"
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
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-all"
                style={{
                  background: viewMode === mode ? "white" : "transparent",
                  color:
                    viewMode === mode
                      ? "var(--wiki-text-primary)"
                      : "var(--wiki-text-tertiary)",
                  boxShadow:
                    viewMode === mode ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
                }}
              >
                <Icon size={14} strokeWidth={2.2} aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mb-5 flex justify-end"
          style={{ animation: "fadeUp 0.4s ease-out 0.05s both" }}
        >
          <div className="relative w-44 md:w-52">
            <Search
              size={14}
              className="absolute top-1/2 left-3 -translate-y-1/2"
              style={{ color: "var(--wiki-text-muted)" }}
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              type="search"
              placeholder="품종 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="강아지 품종 검색"
              className="h-[34px] w-full rounded-lg border border-[var(--wiki-border)] bg-white pr-4 pl-8 text-sm transition-all outline-none placeholder:text-[var(--wiki-text-muted)] focus:border-[var(--wiki-text-muted)]"
              style={{ color: "var(--wiki-text-primary)" }}
            />
          </div>
        </div>

        <div style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}>
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-3 text-4xl" aria-hidden>
                🔍
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--wiki-text-tertiary)" }}
              >
                검색 결과가 없어요
              </p>
            </div>
          ) : viewMode === "card" ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {filtered.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            <DogListView dogs={filtered} />
          )}
        </div>
      </div>
    </section>
  );
}
