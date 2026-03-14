import Link from "next/link";
import { Home, Sprout } from "lucide-react";

// ─────────────────────────────────────────────
// Decorative SVGs (site world-view)
// ─────────────────────────────────────────────

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3c-2 4-4 8-4 12 0 4 1.5 6 4 6s4-2 4-6c0-4-2-8-4-12z"
        fill="#98d898"
        fillOpacity="0.6"
      />
      <path
        d="M12 3c2 4 4 8 4 12 0 4-1.5 6-4 6s-4-2-4-6c0-4 2-8 4-12z"
        fill="#a8e8a8"
        fillOpacity="0.5"
      />
    </svg>
  );
}

function MagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" stroke="#c8a8e8" strokeOpacity="0.7" />
      <path d="m21 21-4.2-4.2" stroke="#b898d8" strokeOpacity="0.6" />
    </svg>
  );
}

function SmallFlowerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="3" fill="#f8a4c8" fillOpacity="0.5" />
      <circle cx="12" cy="8" r="2" fill="#f4a0b0" fillOpacity="0.6" />
      <circle cx="16" cy="12" r="2" fill="#f4a0b0" fillOpacity="0.6" />
      <circle cx="12" cy="16" r="2" fill="#f4a0b0" fillOpacity="0.6" />
      <circle cx="8" cy="12" r="2" fill="#f4a0b0" fillOpacity="0.6" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Not Found Page
// ─────────────────────────────────────────────

export default function NotFound() {
  return (
    <main
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 pb-16 pt-8"
      style={{ background: "rgba(255,252,248,1)" }}
      role="main"
      aria-label="페이지를 찾을 수 없음"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <article
          className="relative mx-auto max-w-md overflow-hidden rounded-[20px] px-8 pb-10 pt-12 text-center"
          style={{
            background: "rgba(255,252,254,0.95)",
            border: "1.5px solid rgba(230,210,230,0.6)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          {/* Decorative elements */}
          <div
            className="pointer-events-none absolute -top-2 right-6 opacity-40"
            aria-hidden
          >
            <LeafIcon className="h-10 w-10" />
          </div>
          <div
            className="pointer-events-none absolute bottom-8 left-6 opacity-30"
            aria-hidden
          >
            <SmallFlowerIcon className="h-8 w-8" />
          </div>
          <div
            className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 opacity-35"
            aria-hidden
          >
            <MagnifyingGlassIcon className="h-9 w-9" />
          </div>

          {/* 404 number */}
          <p
            className="mb-2 font-bold tabular-nums tracking-tight"
            style={{
              color: "rgba(248,164,200,0.7)",
              fontSize: "clamp(3rem, 12vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
            aria-hidden
          >
            404
          </p>

          {/* Main message */}
          <h1
            className="mb-2 text-[clamp(1.25rem,4vw,1.5rem)] font-bold leading-tight"
            style={{ color: "#4a3060", letterSpacing: "-0.02em" }}
          >
            페이지를 찾을 수 없어요
          </h1>

          {/* Sub message */}
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "#8a6898" }}
          >
            요청하신 페이지가 없거나 이동되었을 수 있어요.
          </p>

          {/* Actions */}
          <nav
            className="flex flex-wrap items-center justify-center gap-3"
            aria-label="이동 메뉴"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-bold no-underline transition-colors hover:opacity-90"
              style={{
                background: "rgba(248,164,200,0.25)",
                borderColor: "rgba(248,164,200,0.5)",
                color: "#6b4a7a",
              }}
            >
              <Home className="size-4 shrink-0" aria-hidden />
              홈으로 가기
            </Link>
            <Link
              href="/gardening"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-bold no-underline transition-colors hover:opacity-90"
              style={{
                background: "rgba(255,252,254,0.9)",
                borderColor: "rgba(230,210,230,0.8)",
                color: "#6b4a7a",
              }}
            >
              <Sprout className="size-4 shrink-0" aria-hidden />
              취미 둘러보기
            </Link>
          </nav>
        </article>
      </div>
    </main>
  );
}
