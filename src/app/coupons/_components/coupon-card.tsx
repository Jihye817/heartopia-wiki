"use client";

import { useState } from "react";
import type { Coupon } from "@/data/coupons";

function daysLeft(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

function isNew(createdAt: string): boolean {
  return (Date.now() - new Date(createdAt).getTime()) / 86_400_000 <= 7;
}

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  const days = daysLeft(coupon.expires_at);
  const urgent = days <= 7;
  const dateStr = coupon.expires_at.replace(/-/g, ".");

  return (
    <div
      className="flex cursor-pointer flex-col rounded-xl border-2 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ borderColor: "#C8B8E844" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8B8E899"; e.currentTarget.style.boxShadow = "0 8px 24px #8B6DC020"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C8B8E844"; e.currentTarget.style.boxShadow = "none"; }}
      onClick={handleCopy}
    >
      {/* Top: code + copy button */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="truncate text-lg font-bold tracking-wider"
            style={{ color: "var(--wiki-text-primary)" }}
          >
            {coupon.code}
          </span>
          {isNew(coupon.created_at) && (
            <span className="shrink-0 rounded bg-[#F4EFFE] px-2 py-0.5 text-[10px] font-bold text-[#8B6DC0]">
              NEW
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
            copied
              ? "border-[#C8E0CF] bg-[#EEF6F0] text-[#5B9A6F]"
              : "border-[#D4C5ED] bg-[#F4EFFE] text-[#8B6DC0] hover:bg-[#EBE0FB]"
          }`}
        >
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              복사됨
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              복사
            </>
          )}
        </button>
      </div>

      {/* Reward */}
      <div
        className="mb-3 flex flex-1 items-center gap-2 rounded-lg border px-3 py-2.5"
        style={{ background: "var(--wiki-bg)", borderColor: "var(--wiki-border-light)" }}
      >
        <span className="shrink-0 text-sm">🎁</span>
        <span className="min-w-0 text-sm font-semibold leading-relaxed" style={{ color: "var(--wiki-text-secondary)" }}>
          {coupon.reward}
        </span>
      </div>

      {/* Bottom: expiry */}
      <div>
        <span
          className={`text-xs ${urgent ? "font-semibold" : ""}`}
          style={{ color: urgent ? "#D4845A" : "var(--wiki-text-muted)" }}
        >
          {urgent ? `⏰ D-${days} · ` : ""}{dateStr} 만료
        </span>
      </div>
    </div>
  );
}
