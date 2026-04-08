"use client";

import { useState } from "react";
import type { Coupon } from "@/data/coupons";

// ─────────────────────────────────────────────
// Expiry helpers
// ─────────────────────────────────────────────
function daysLeft(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

interface ExpiryBadgeProps {
  expiresAt: string;
}

function ExpiryBadge({ expiresAt }: ExpiryBadgeProps) {
  const days = daysLeft(expiresAt);
  const dateStr = expiresAt.replace(/-/g, ".");
  const urgent = days <= 7;
  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold ${urgent ? "font-bold" : ""}`}
      style={{ color: urgent ? "#d97706" : "#b090c0" }}
    >
      {urgent ? "⏰" : "📅"} {urgent ? `D-${days} · ` : ""}
      {dateStr} 만료
    </span>
  );
}

// ─────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────
function CopyIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="overflow-hidden rounded-[20px] border-[1.5px] transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "rgba(255,255,255,0.9)",
        borderColor: "rgba(248,164,200,0.25)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(248,164,200,0.5)";
        e.currentTarget.style.boxShadow =
          "0 8px 28px rgba(200,120,160,0.12), 0 0 0 1px rgba(248,164,200,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(248,164,200,0.25)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      <div
        className="h-[3px] w-full"
        style={{
          background: "linear-gradient(90deg, #f8a4c8, #c9a7eb)",
        }}
      />

      <div className="px-4 py-3 md:px-6 md:py-4">
        {/* 모바일: 세로 스택 / 데스크톱: 가로 정렬 */}
        <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-3">
          <span
            className="min-w-0 truncate text-lg font-extrabold tracking-widest"
            style={{
              color: "#6b4a7a",
              fontFamily: "var(--font-mono), 'Courier New', monospace",
            }}
          >
            {coupon.code}
          </span>
          <div className="flex shrink-0 flex-wrap items-center gap-2 self-end md:gap-3 md:self-auto">
            <ExpiryBadge expiresAt={coupon.expires_at} />
            <button
              type="button"
              onClick={handleCopy}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-1.5 text-xs font-bold transition-all duration-200"
              style={{
                borderColor: copied
                  ? "rgba(100,200,140,0.5)"
                  : "rgba(248,164,200,0.5)",
                background: copied
                  ? "rgba(100,200,140,0.12)"
                  : "rgba(248,164,200,0.12)",
                color: copied ? "#50a870" : "#d060a0",
              }}
            >
              {copied ? (
                <>
                  <CheckIcon size={12} />
                  복사됨
                </>
              ) : (
                <>
                  <CopyIcon size={12} />
                  복사
                </>
              )}
            </button>
          </div>
        </div>

        <div
          className="flex items-center gap-2 rounded-xl border px-3 py-2"
          style={{
            background: "rgba(248,240,255,0.5)",
            borderColor: "rgba(248,164,200,0.2)",
          }}
        >
          <span className="flex-shrink-0 text-sm">🎁</span>
          <span
            className="min-w-0 text-sm leading-relaxed font-semibold"
            style={{ color: "#6b4a7a" }}
          >
            {coupon.reward}
          </span>
        </div>
      </div>
    </div>
  );
}
