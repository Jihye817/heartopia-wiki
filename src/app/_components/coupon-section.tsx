"use client";

import { useState } from "react";
import Link from "next/link";
import type { Coupon } from "@/data/coupons";

function TagIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function isNew(createdAt: string): boolean {
  return (Date.now() - new Date(createdAt).getTime()) / 86_400_000 <= 7;
}

interface CouponSectionProps {
  coupons: Coupon[];
}

export function CouponSection({ coupons }: CouponSectionProps) {
  const [copied, setCopied] = useState<Set<string>>(new Set());

  const handleCopy = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopied((prev) => new Set([...prev, code]));
    setTimeout(() => {
      setCopied((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    }, 3500);
  };

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--wiki-border-light)] pb-3">
        <span
          className="text-2xl font-semibold text-[var(--wiki-text-primary)]"
          style={{
            fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
            letterSpacing: "-0.3px",
          }}
        >
          쿠폰 코드
        </span>
        <Link
          href="/coupons"
          className="text-sm text-[var(--wiki-text-tertiary)] no-underline transition-colors hover:text-[#6B6B6B]"
        >
          전체보기 &rarr;
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {coupons.slice(0, 4).map((coupon) => (
          <div
            key={coupon.code}
            onClick={() => handleCopy(coupon.code)}
            className="flex cursor-pointer flex-col gap-3 rounded-xl border border-[var(--wiki-border)] bg-white px-4 py-4 transition-all duration-200 hover:border-[var(--wiki-text-muted)] hover:shadow-sm md:flex-row md:items-center md:justify-between md:gap-0"
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                style={{
                  background: "linear-gradient(135deg, #f4adc5, #b49fd8)",
                }}
              >
                <TagIcon size={16} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-base font-semibold tracking-wider text-[var(--wiki-text-primary)]">
                    {coupon.code}
                  </span>
                  {isNew(coupon.created_at) && (
                    <span className="shrink-0 rounded-[10px] bg-[#F4EFFE] px-2 py-0.5 text-sm font-semibold text-[#8B6DC0]">
                      NEW
                    </span>
                  )}
                </div>
                <span className="text-sm font-light text-[var(--wiki-text-tertiary)]">
                  {coupon.reward}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(coupon.code);
              }}
              className={`shrink-0 self-end rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 md:self-auto ${
                copied.has(coupon.code)
                  ? "border-[#C8E0CF] bg-[#EEF6F0] text-[#5B9A6F]"
                  : "border-[#D4C5ED] bg-[#F4EFFE] text-[#8B6DC0] hover:border-[#B49FD8] hover:bg-[#EBE0FB]"
              }`}
            >
              {copied.has(coupon.code) ? (
                <span className="flex items-center gap-1">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  복사됨
                </span>
              ) : (
                "복사"
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
