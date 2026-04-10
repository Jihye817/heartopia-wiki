import Link from "next/link";

const CATEGORY_LINKS = [
  "원예",
  "요리",
  "낚시",
  "곤충 채집",
  "새 관찰",
  "반려동물",
  "기타 수집",
] as const;
const MORE_LINKS = ["쿠폰", "문의"] as const;

const CATEGORY_HREF: Record<string, string> = {
  원예: "/gardening",
  요리: "/cooking",
  낚시: "/fishing",
  "곤충 채집": "/bugs",
  "새 관찰": "/birds",
  "기타 수집": "/others",
};
const MORE_HREF: Record<string, string> = {
  쿠폰: "/coupons",
  문의: "mailto:heartopiawiki@gmail.com",
};

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--wiki-border)] px-4 py-8 md:px-6 md:py-12"
      style={{
        backgroundImage: "linear-gradient(180deg, var(--wiki-bg) 0%, var(--wiki-bg) 70%, rgba(244,241,248,0.3) 100%), url('/images/pics/ddt1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-6 flex flex-col gap-8 md:mb-9 md:flex-row md:flex-wrap md:justify-between">
          <div className="max-w-full md:max-w-[280px]">
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-[7px] text-sm"
                style={{
                  background: "linear-gradient(135deg, #FAD4DB, #CCDFF4)",
                }}
              >
                🌸
              </div>
              <span className="text-[15px] font-semibold text-[var(--wiki-text-primary)]">
                Heartopia Wiki
              </span>
            </div>
            <p className="m-0 text-sm leading-[1.7] text-[var(--wiki-text-tertiary)]">
              두근두근타운의 팬 제작 정보 위키입니다.
              <br />
              공식 사이트와 무관합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:flex sm:gap-8">
            <div>
              <div className="mb-3 text-sm font-semibold tracking-wider uppercase text-[var(--wiki-text-secondary)]">
                카테고리
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                {CATEGORY_LINKS.map((link) =>
                  CATEGORY_HREF[link] ? (
                    <Link
                      key={link}
                      href={CATEGORY_HREF[link]}
                      className="text-sm text-[var(--wiki-text-tertiary)] no-underline transition-colors hover:text-[var(--wiki-text-primary)]"
                    >
                      {link}
                    </Link>
                  ) : (
                    <span
                      key={link}
                      className="cursor-not-allowed text-sm text-[var(--wiki-text-muted)]"
                    >
                      {link}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold tracking-wider uppercase text-[var(--wiki-text-secondary)]">
                더 보기
              </div>
              <div className="flex flex-col gap-2">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link}
                    href={MORE_HREF[link] ?? "#"}
                    className="text-sm text-[var(--wiki-text-tertiary)] no-underline transition-colors hover:text-[var(--wiki-text-primary)]"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-white/40 pt-6 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-2">
          <p className="m-0 text-center text-sm text-white md:text-left">
            &copy; {new Date().getFullYear()} Heartopia Wiki - @Jihye817 All rights
            reserved. - 팬 제작 위키, 비공식
            <span className="mx-2 opacity-50">|</span>
            문의 <a href="mailto:heartopiawiki@gmail.com" className="underline opacity-80 hover:opacity-100 transition-opacity">heartopiawiki@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
