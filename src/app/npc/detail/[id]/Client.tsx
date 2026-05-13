"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Npc, NpcCategory, NpcShopItem } from "../../_data/npcs";

const NPC_BG = "var(--wiki-cat-npc-bg)";
const NPC_BORDER = "#b0b8f0";

const CATEGORY_COLOR: Record<
  NpcCategory,
  { bg: string; color: string; border: string }
> = {
  상점: { bg: "#EEF6F0", color: "#5B9A6F", border: "#C8E0CF" },
  사건: { bg: "#FFF4ED", color: "#C06A2A", border: "#F0D0B8" },
  퀘스트: { bg: "#F0EBFF", color: "#7B5EAE", border: "#D8C8F0" },
  가이드: { bg: "#EFF6FF", color: "#3B7AC4", border: "#C0D8F0" },
  주민: { bg: "#FFF0F6", color: "#C4507A", border: "#F0C0D8" },
};

interface NpcDetailClientProps {
  npc: Npc;
}

function NpcShopItemSection({
  category,
  categoryItems,
}: {
  category: string;
  categoryItems: NpcShopItem[];
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-4 transition-colors hover:bg-[var(--wiki-bg)]"
        style={{ borderBottom: open ? "1px solid var(--wiki-border-light)" : "none" }}
      >
        <span
          className="text-base font-bold"
          style={{ color: "var(--wiki-text-primary)" }}
        >
          {category}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--wiki-text-muted)" }}>
            {categoryItems.length}개
          </span>
          <span
            className="text-xs transition-transform duration-200"
            style={{
              color: "var(--wiki-text-muted)",
              display: "inline-block",
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            ▾
          </span>
        </div>
      </button>
      {open && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--wiki-border-light)] bg-[var(--wiki-bg)]">
              <th
                className="px-5 py-3 text-left text-sm font-semibold"
                style={{ color: "var(--wiki-text-tertiary)" }}
              >
                아이템
              </th>
              <th
                className="px-5 py-3 text-right text-sm font-semibold"
                style={{ color: "var(--wiki-text-tertiary)" }}
              >
                가격
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--wiki-border-light)] last:border-0 hover:bg-[rgba(0,0,0,0.01)]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border"
                      style={{ background: NPC_BG, borderColor: NPC_BORDER }}
                    >
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt=""
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm" aria-hidden>
                          📦
                        </span>
                      )}
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {item.name}
                    </span>
                    {item.availability === "event" && (
                      <span className="rounded-md border border-[#F0D0B8] bg-[#FFF4ED] px-2 py-0.5 text-xs font-semibold text-[#C06A2A]">
                        {item.event || "이벤트"}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  {item.price != null ? (
                    <span className="inline-flex items-center justify-end gap-1">
                      {item.currency === "star" ? (
                        <span className="text-base" style={{ color: "#9B6DFF" }}>★</span>
                      ) : (
                        <span
                          className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                          style={{ background: "#F59E0B", color: "white" }}
                        >
                          G
                        </span>
                      )}
                      <span
                        className="text-sm font-semibold tabular-nums"
                        style={{
                          color: item.currency === "star" ? "#9B6DFF" : "#b45309",
                        }}
                      >
                        {item.price.toLocaleString()}
                      </span>
                    </span>
                  ) : (
                    <span
                      className="text-sm"
                      style={{ color: "var(--wiki-text-muted)" }}
                    >
                      -
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function NpcShopItemSections({ items }: { items: NpcShopItem[] }) {
  const grouped = new Map<string, NpcShopItem[]>();
  for (const item of items) {
    const key = item.category || "기타";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(item);
  }

  return (
    <>
      {[...grouped.entries()].map(([category, categoryItems]) => (
        <NpcShopItemSection
          key={category}
          category={category}
          categoryItems={categoryItems}
        />
      ))}
    </>
  );
}

export default function NpcDetailClient({ npc }: NpcDetailClientProps) {
  return (
    <section className="px-4 pt-8 pb-16 md:px-6">
      <div className="mx-auto max-w-[980px]">
        {/* Breadcrumb */}
        <nav
          className="mb-4 flex items-center gap-1.5 text-sm"
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
            href="/npc"
            className="no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            NPC
          </Link>
          <span style={{ color: "var(--wiki-text-muted)" }}>›</span>
          <span
            className="font-semibold"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            {npc.name}
          </span>
        </nav>

        {/* Back */}
        <Link
          href="/npc"
          className="mb-6 inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-[var(--wiki-text-secondary)]"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          ← NPC 목록으로 돌아가기
        </Link>

        {/* Two Column Detail */}
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]"
          style={{ animation: "fadeUp 0.4s ease-out" }}
        >
          {/* Left Column — sticky */}
          <div className="flex flex-col gap-4 md:sticky md:top-20 md:self-start">
            {/* Thumbnail Card */}
            <div className="flex flex-col items-center rounded-2xl border border-[var(--wiki-border)] bg-white p-8">
              <div
                className="mb-5 flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-xl border p-4"
                style={{ background: NPC_BG, borderColor: NPC_BORDER }}
              >
                {npc.thumbnail ? (
                  <Image
                    src={npc.thumbnail}
                    alt={npc.name}
                    width={120}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl" aria-hidden>
                    🧑
                  </span>
                )}
              </div>
              <div
                className="mb-2 text-2xl font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                {npc.name}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {npc.category.map((cat) => {
                  const c = CATEGORY_COLOR[cat];
                  return (
                    <span
                      key={cat}
                      className="rounded-md border px-3 py-1 text-sm font-semibold"
                      style={{
                        background: c.bg,
                        color: c.color,
                        borderColor: c.border,
                      }}
                    >
                      {cat}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Info Table */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                기본 정보
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-[var(--wiki-border-light)]">
                    <th
                      className="w-[90px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                      style={{ color: "var(--wiki-text-secondary)" }}
                    >
                      위치
                    </th>
                    <td
                      className="px-5 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--wiki-text-primary)" }}
                    >
                      {npc.location || "-"}
                    </td>
                  </tr>
                  {npc.unlock_level != null && (
                    <tr className="border-b border-[var(--wiki-border-light)]">
                      <th
                        className="w-[90px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        해금 레벨
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm font-semibold"
                        style={{ color: "var(--wiki-cat-npc)" }}
                      >
                        Lv.{npc.unlock_level}
                      </td>
                    </tr>
                  )}
                  {npc.unlock_condition && (
                    <tr>
                      <th
                        className="w-[90px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                        style={{ color: "var(--wiki-text-secondary)" }}
                      >
                        해금 조건
                      </th>
                      <td
                        className="px-5 py-3.5 text-sm leading-relaxed font-semibold whitespace-pre-line"
                        style={{ color: "var(--wiki-text-primary)" }}
                      >
                        {npc.unlock_condition}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Map Placeholder */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                📍 위치
              </div>
              <div
                className="flex min-h-[160px] flex-col items-center justify-center gap-2"
                style={{ background: NPC_BG }}
              >
                <span className="text-4xl" aria-hidden>
                  🗺️
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--wiki-text-muted)" }}
                >
                  준비중입니다
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* 정보 */}
            <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border)] bg-white">
              <div
                className="border-b border-[var(--wiki-border-light)] px-5 py-4 text-base font-bold"
                style={{ color: "var(--wiki-text-primary)" }}
              >
                정보
              </div>
              {npc.description && (
                <p
                  className="border-b border-[var(--wiki-border-light)] px-5 py-5 text-sm leading-relaxed"
                  style={{ color: "var(--wiki-text-secondary)" }}
                >
                  {npc.description}
                </p>
              )}
              {npc.details &&
              (npc.details.shop ||
                npc.details.guide ||
                npc.details.incident) ? (
                <table className="w-full border-collapse">
                  <tbody>
                    {npc.details.shop && (
                      <tr className="border-b border-[var(--wiki-border-light)] last:border-0">
                        <th
                          className="w-[90px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                          style={{ color: "var(--wiki-text-secondary)" }}
                        >
                          상점
                        </th>
                        <td
                          className="px-5 py-3.5 text-sm font-semibold"
                          style={{ color: "var(--wiki-text-primary)" }}
                        >
                          {npc.details.shop}
                        </td>
                      </tr>
                    )}
                    {npc.details.guide && (
                      <tr className="border-b border-[var(--wiki-border-light)] last:border-0">
                        <th
                          className="w-[90px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                          style={{ color: "var(--wiki-text-secondary)" }}
                        >
                          가이드
                        </th>
                        <td
                          className="px-5 py-3.5 text-sm font-semibold"
                          style={{ color: "var(--wiki-text-primary)" }}
                        >
                          {npc.details.guide}
                        </td>
                      </tr>
                    )}
                    {npc.details.incident && (
                      <tr className="border-b border-[var(--wiki-border-light)] last:border-0">
                        <th
                          className="w-[90px] bg-[var(--wiki-bg)] px-5 py-3.5 text-left text-sm font-semibold"
                          style={{ color: "var(--wiki-text-secondary)" }}
                        >
                          사건
                        </th>
                        <td
                          className="px-5 py-3.5 text-sm font-semibold whitespace-pre-line"
                          style={{ color: "var(--wiki-text-primary)" }}
                        >
                          {npc.details.incident}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                !npc.description && (
                  <div className="flex min-h-[80px] items-center justify-center">
                    <span
                      className="text-sm"
                      style={{ color: "var(--wiki-text-muted)" }}
                    >
                      정보가 없습니다
                    </span>
                  </div>
                )
              )}
            </div>

            {/* 아이템 목록 — category별 그룹핑 */}
            {npc.shopItems && npc.shopItems.length > 0 && (
              <NpcShopItemSections items={npc.shopItems} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
