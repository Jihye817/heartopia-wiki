import type { Metadata } from "next";
import Link from "next/link";
import { getValidCoupons } from "@/data/coupons";
import { CouponCard } from "./_components/coupon-card";

export const metadata: Metadata = {
  title: "쿠폰",
  description: "두근두근타운에서 사용할 수 있는 쿠폰 코드를 확인할 수 있어요.",
  alternates: { canonical: "/coupons" },
};

export const dynamic = "force-dynamic";

export default async function CouponsPage() {
  const coupons = await getValidCoupons();

  return (
    <section className="px-4 pt-8 pb-16 md:px-6">
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
            쿠폰
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-8" style={{ animation: "fadeUp 0.4s ease-out" }}>
          <h1
            className="mb-1.5 text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
              color: "var(--wiki-text-primary)",
              letterSpacing: "-0.5px",
            }}
          >
            쿠폰
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            현재 사용 가능한 쿠폰을 모아두었습니다.
          </p>
          <p
            className="mt-0.5 text-xs"
            style={{ color: "var(--wiki-text-muted)" }}
          >
            최신 등록순 · 사용 가능한 쿠폰만 표시
          </p>
        </div>

        {/* Section Header */}
        <div
          className="mb-3.5 flex items-baseline justify-between border-b pb-2.5"
          style={{
            borderColor: "var(--wiki-border-light)",
            animation: "fadeUp 0.4s ease-out 0.05s both",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--wiki-text-primary)" }}
            >
              사용 가능한 쿠폰
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-bold tabular-nums"
              style={{
                background: "#E8E0F8",
                color: "#7C5CBF",
                fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
              }}
            >
              {coupons.length}
            </span>
          </div>
        </div>

        {/* Coupon Grid */}
        <div
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
          style={{ animation: "fadeUp 0.4s ease-out 0.1s both" }}
        >
          {coupons.map((coupon) => (
            <CouponCard key={coupon.code} coupon={coupon} />
          ))}
        </div>

        <p
          className="mt-6 text-center text-xs"
          style={{ color: "var(--wiki-text-muted)" }}
        >
          쿠폰 코드는 게임 내 설정 &gt; 교환 코드에서 사용하실 수 있습니다.
        </p>
      </div>
    </section>
  );
}
