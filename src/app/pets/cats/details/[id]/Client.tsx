"use client";

import Image from "next/image";
import Link from "next/link";
import type { PetDetail } from "../../../_data/pets";

const CAT_BG = "var(--wiki-cat-pets-bg)";
const CAT_BORDER = "#f5d0c4";

const PERSONALITY_EMOJI: Record<string, string> = {
  quiet: "😌",
  active: "😊",
  independent: "😎",
  lazy: "😴",
  sleepy: "🥱",
  social: "🤗",
  talkative: "💬",
  playful: "🎮",
  clingy: "🫂",
  sensitive: "😢",
  aloof: "🙄",
  slow: "🐢",
  solitary: "🌙",
};

interface CatDetailClientProps {
  cat: PetDetail;
}

export default function CatDetailClient({ cat }: CatDetailClientProps) {
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
          <Link
            href="/pets"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            반려동물
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <Link
            href="/pets/cats"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            고양이
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {cat.name}
          </span>
        </nav>

        <Link
          href="/pets/cats"
          className="mb-5 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← 고양이 목록으로 돌아가기
        </Link>

        {/* Two Column */}
        <div
          className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]"
          style={{ animation: "fadeUp 0.4s ease-out" }}
        >
          {/* Left */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center rounded-2xl border border-[var(--wiki-border)] bg-white p-8">
              <div
                className="mb-5 flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-xl border p-4"
                style={{ background: CAT_BG, borderColor: CAT_BORDER }}
              >
                {cat.thumbnail ? (
                  <Image
                    src={cat.thumbnail}
                    alt={cat.name}
                    width={130}
                    height={130}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-7xl" aria-hidden>
                    🐱
                  </span>
                )}
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {cat.name}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="border-b border-[var(--wiki-border-light)] px-5 py-3.5 text-sm font-semibold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                기본 정보
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <th
                      className="w-[100px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      입양 NPC
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      펫샵
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {/* Eye Shapes */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div className="flex items-center justify-between border-b border-[var(--wiki-border-light)] px-5 py-3.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--wiki-text-primary)" }}
                >
                  👁️ 눈 모양
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  {cat.eyeShapes.length}종
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5 p-4">
                {cat.eyeShapes.map((eye) => (
                  <div
                    key={eye.id}
                    className="flex flex-col items-center gap-2 rounded-xl border border-[var(--wiki-border-light)] px-4 py-4 transition-colors hover:bg-[var(--wiki-bg)]"
                  >
                    <div
                      className="flex h-10 w-full items-center justify-center overflow-hidden rounded-md border"
                      style={{ borderColor: CAT_BORDER, background: CAT_BG }}
                    >
                      {eye.image ? (
                        <Image
                          src={eye.image}
                          alt=""
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-lg">👁️</span>
                      )}
                    </div>
                    <span
                      className="text-center text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      {eye.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eye Colors */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div className="flex items-center justify-between border-b border-[var(--wiki-border-light)] px-5 py-3.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--wiki-text-primary)" }}
                >
                  🎨 눈 색
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  {cat.eyeColors.length}종
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5 p-4">
                {cat.eyeColors.map((color) => (
                  <div
                    key={color.id}
                    className="flex flex-col items-center gap-2 rounded-xl border border-[var(--wiki-border-light)] px-4 py-4 transition-colors hover:bg-[var(--wiki-bg)]"
                  >
                    <div
                      className="flex h-10 w-full items-center justify-center overflow-hidden rounded-md border"
                      style={{ borderColor: CAT_BORDER, background: CAT_BG }}
                    >
                      {color.image ? (
                        <Image
                          src={color.image}
                          alt=""
                          width={80}
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-lg">👁️</span>
                      )}
                    </div>
                    <span
                      className="text-center text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalities */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div className="flex items-center justify-between border-b border-[var(--wiki-border-light)] px-5 py-3.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--wiki-text-primary)" }}
                >
                  💫 성격 종류
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  {cat.personalities.length}종
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 p-4">
                {cat.personalities.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 rounded-lg border border-[var(--wiki-border-light)] px-3 py-2.5 transition-colors hover:bg-[var(--wiki-bg)]"
                  >
                    <span className="text-base" aria-hidden>
                      {PERSONALITY_EMOJI[p.id] ?? "✨"}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Patterns (full width) */}
        <div
          className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white"
          style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}
        >
          <div className="flex items-center justify-between border-b border-[var(--wiki-border-light)] px-5 py-3.5">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--wiki-text-primary)" }}
            >
              🐾 무늬 종류
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--wiki-text-muted)" }}
            >
              {cat.patterns.length}종
            </span>
          </div>
          {cat.patterns.length === 0 ? (
            <p
              className="px-5 py-6 text-sm"
              style={{ color: "var(--wiki-text-muted)" }}
            >
              데이터 준비중입니다.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 p-5">
              {cat.patterns.map((pattern) => (
                <div
                  key={pattern.color}
                  className="overflow-hidden rounded-xl border border-[var(--wiki-border-light)] transition-all hover:-translate-y-0.5 hover:border-[var(--wiki-border)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex aspect-square items-center justify-center">
                    {pattern.images[0] ? (
                      <Image
                        src={pattern.images[0]}
                        alt={pattern.color}
                        width={150}
                        height={150}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-5xl" aria-hidden>
                        🐱
                      </span>
                    )}
                  </div>
                  <div
                    className="border-t border-[var(--wiki-border-light)] px-3 py-2 text-center text-sm font-semibold"
                    style={{ color: "var(--wiki-text-primary)" }}
                  >
                    {pattern.color}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
