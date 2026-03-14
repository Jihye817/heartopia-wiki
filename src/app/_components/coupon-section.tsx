"use client";

import { useState } from "react";
import Link from "next/link";
import { getLatestCoupons } from "@/data/coupons";

function CopyIcon({ size = 14 }: { size?: number }) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon({ size = 14 }: { size?: number }) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

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

function formatExpiresAt(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `~ ${y}.${m}.${d}`;
}

export function CouponSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      className="px-6 pb-20 pt-16"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,252,248,1) 0%, rgba(255,240,250,0.5) 100%)",
      }}
    >
      <div className="mx-auto max-w-[640px]">
        <div className="mb-9 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div
              className="h-px w-8"
              style={{ background: "rgba(200,160,200,0.4)" }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "#b080c0", letterSpacing: "0.12em" }}
            >
              COUPON
            </span>
            <div
              className="h-px w-8"
              style={{ background: "rgba(200,160,200,0.4)" }}
            />
          </div>
          <h2
            className="m-0 text-[clamp(24px,4vw,34px)] font-bold tracking-tight"
            style={{ color: "#6b4a7a" }}
          >
            최신 쿠폰 코드
          </h2>
          <p className="m-0 text-[13px] text-[#a080b0]">
            현재 사용 가능한 쿠폰 코드를 확인하세요
          </p>
        </div>

        <div
          className="overflow-hidden rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(248,164,200,0.25)",
            boxShadow:
              "0 8px 32px rgba(200,120,160,0.08), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="h-1.5"
            style={{
              background:
                "linear-gradient(90deg, #f8a4c8, #c9a7eb, #9ac8f0, #a8e0b8)",
            }}
          />

          <div className="py-2">
            {getLatestCoupons().map((coupon, idx) => (
              <div key={coupon.code}>
                {idx > 0 && (
                  <div
                    className="mx-6 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(230,200,240,0.6), transparent)",
                    }}
                  />
                )}
                <div className="flex items-center justify-between gap-4 px-6 py-4 transition-colors duration-150 hover:bg-[rgba(248,240,255,0.5)]">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] border border-[rgba(248,164,200,0.3)]"
                      style={{
                        background: "rgba(248,164,200,0.15)",
                      }}
                    >
                      <TagIcon size={14} />
                    </div>
                    <div>
                      <div
                        className="text-[15px] font-bold tracking-wider"
                        style={{
                          color: "#6b4a7a",
                          letterSpacing: "0.08em",
                          fontFamily: "'Courier New', 'Courier', monospace",
                        }}
                      >
                        {coupon.code}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[#b090c0]">
                        {coupon.reward}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className="text-[12px] text-[#b090c0]"
                      title={`만료: ${coupon.expiresAt}`}
                    >
                      만료 {formatExpiresAt(coupon.expiresAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(coupon.code)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
                      style={{
                        border:
                          copied === coupon.code
                            ? "1.5px solid rgba(100,200,140,0.5)"
                            : "1.5px solid rgba(248,164,200,0.5)",
                        background:
                          copied === coupon.code
                            ? "rgba(100,200,140,0.12)"
                            : "rgba(248,164,200,0.12)",
                        color: copied === coupon.code ? "#50a870" : "#d060a0",
                      }}
                    >
                      {copied === coupon.code ? <CheckIcon /> : <CopyIcon />}
                      {copied === coupon.code ? "복사됨!" : "복사"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex justify-end border-t px-6 py-3.5"
            style={{ borderTopColor: "rgba(240,220,240,0.7)" }}
          >
            <Link
              href="/coupons"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#c060a0] no-underline transition-[gap] duration-200 hover:gap-2"
              style={{ letterSpacing: "0.02em" }}
            >
              전체 쿠폰 보기
              <ArrowRightIcon size={12} />
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#c0a0c8]">
          쿠폰 코드는 게임 내 환경설정 &gt; 교환 코드 에서 사용하실 수 있습니다.
          ✨
        </p>
      </div>
    </section>
  );
}
