import Link from "next/link";

const NAV_ITEMS = [
  "원예",
  "요리",
  "낚시",
  "곤충 채집",
  "새 관찰",
  "반려동물",
  "쿠폰",
] as const;

export function Header() {
  return (
    <nav
      className="sticky top-0 z-[100] border-b border-[rgba(248,164,200,0.2)] px-6 py-0"
      style={{
        background: "rgba(255, 252, 248, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1100px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#6b4a7a] no-underline"
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base"
            style={{
              background: "linear-gradient(135deg, #f8a4c8, #c9a7eb)",
              boxShadow: "0 2px 8px rgba(248,164,200,0.4)",
            }}
          >
            🌸
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "#6b4a7a" }}
          >
            Heartopia Wiki
          </span>
        </Link>

        <div className="flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[13px] font-medium text-[#9a7aaa] no-underline transition-colors hover:text-[#e873a8]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
