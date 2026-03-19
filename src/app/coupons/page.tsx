import Link from "next/link";
import { getValidCoupons } from "@/data/coupons";
import { CouponCard } from "./_components/coupon-card";

// ─────────────────────────────────────────────
// Decoration
// ─────────────────────────────────────────────
const DOTS = [
  { size: 8, top: "10%", left: "4%", delay: "0s", color: "#f8a4c8" },
  { size: 10, top: "18%", left: "86%", delay: "0.3s", color: "#9ac8f0" },
  { size: 6, top: "60%", left: "2%", delay: "0.7s", color: "#c9a7eb" },
  { size: 9, top: "78%", left: "93%", delay: "1s", color: "#6ee7b7" },
];

// ─────────────────────────────────────────────
// Page — React Server Component
// ─────────────────────────────────────────────
export default function CouponsPage() {
  const coupons = getValidCoupons();

  return (
    <section
      className="min-h-screen px-6 pt-8 pb-24"
      style={{ background: "rgba(255,252,248,1)" }}
    >
      <div className="mx-auto max-w-[640px]">
        {/* Breadcrumb */}
        <nav
          className="mb-8 flex items-center gap-1.5 text-sm font-bold tracking-wide"
          style={{ color: "#b080c0" }}
          aria-label="breadcrumb"
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            🏠 홈
          </Link>
          <span style={{ color: "rgba(200,160,200,0.5)" }}>›</span>
          <span style={{ color: "#6b4a7a" }}>쿠폰</span>
        </nav>

        {/* Hero band */}
        <div
          className="relative mb-8 overflow-hidden rounded-[20px] border-[1.5px] px-7 py-8"
          style={{
            background:
              "linear-gradient(135deg, #fff5f8 0%, #fdf4ff 40%, #f0fdf4 70%, #eff6ff 100%)",
            borderColor: "rgba(248,164,200,0.25)",
          }}
        >
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 260,
              height: 260,
              background: "#f8a4c8",
              top: -80,
              left: -60,
              filter: "blur(40px)",
              opacity: 0.22,
            }}
          />
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 200,
              height: 200,
              background: "#c9a7eb",
              top: -40,
              right: -40,
              filter: "blur(40px)",
              opacity: 0.22,
            }}
          />
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 150,
              height: 150,
              background: "#6ee7b7",
              bottom: -40,
              left: "40%",
              filter: "blur(40px)",
              opacity: 0.22,
            }}
          />

          <style>{`@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
          {DOTS.map((d, i) => (
            <span
              key={i}
              className="pointer-events-none absolute rounded-full"
              style={{
                width: d.size,
                height: d.size,
                top: d.top,
                left: d.left,
                background: d.color,
                opacity: 0.48,
                animation: `floatY 4s ease-in-out ${d.delay} infinite`,
              }}
            />
          ))}

          <div className="relative z-10">
            <div className="mb-2 flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1.5px solid #fce7f3",
                  backdropFilter: "blur(4px)",
                }}
              >
                🎁
              </div>
              <h1
                className="leading-none font-bold tracking-tight"
                style={{
                  fontSize: "clamp(1.6rem,4vw,2.1rem)",
                  color: "#6b4a7a",
                }}
              >
                쿠폰
              </h1>
            </div>

            <p
              className="mb-1.5 text-sm leading-relaxed font-semibold"
              style={{ color: "#8a6898" }}
            >
              현재 사용 가능한 쿠폰을 모아두었습니다.
            </p>
            <p
              className="mb-2 text-xs font-bold"
              style={{ color: "#b080c0" }}
            >
              ✦ 최신 등록순 &nbsp;·&nbsp; 현재 사용 가능한 쿠폰만 표시
            </p>
          </div>
        </div>

        {/* Section header */}
        <div className="mb-4 flex items-center justify-between">
          <h2
            className="text-[0.9rem] font-bold tracking-tight"
            style={{ color: "#6b4a7a" }}
          >
            사용 가능한 쿠폰
          </h2>
          <span
            className="rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold"
            style={{
              background: "rgba(248,164,200,0.15)",
              color: "#c06898",
              borderColor: "rgba(248,164,200,0.4)",
            }}
          >
            {coupons.length}개
          </span>
        </div>

        {/* Coupon list */}
        <div className="flex flex-col gap-3">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.code} coupon={coupon} />
          ))}
        </div>

        <p
          className="mt-6 text-center text-xs"
          style={{ color: "#c0a0c8" }}
        >
          쿠폰 코드는 게임 내 설정 &gt; 교환 코드에서 사용하실 수 있습니다. ✨
        </p>
      </div>
    </section>
  );
}
