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
  낚시: "/fishing",
  "기타 수집": "/others",
};
const MORE_HREF: Record<string, string> = {
  쿠폰: "/coupons",
  문의: "mailto:heartopiawiki@gmail.com",
};

export function Footer() {
  return (
    <footer
      className="border-t border-[rgba(248,164,200,0.15)] px-4 py-8 md:px-6 md:py-12"
      style={{ background: "rgba(60,40,75,0.96)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-6 flex flex-col gap-8 md:mb-9 md:flex-row md:flex-wrap md:justify-between">
          <div className="max-w-full md:max-w-[280px]">
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm"
                style={{
                  background: "linear-gradient(135deg, #f8a4c8, #c9a7eb)",
                }}
              >
                🌸
              </div>
              <span
                className="text-[15px] font-bold"
                style={{ color: "rgba(255,220,240,0.95)" }}
              >
                Heartopia Wiki
              </span>
            </div>
            <p
              className="m-0 text-xs leading-[1.7]"
              style={{ color: "rgba(200,160,200,0.7)" }}
            >
              두근두근타운의 팬 제작 정보 위키입니다.
              <br />
              공식 사이트와 무관합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:flex sm:gap-8">
            <div>
              <div
                className="mb-3 text-xs font-bold tracking-wider uppercase"
                style={{
                  color: "rgba(248,164,200,0.8)",
                  letterSpacing: "0.1em",
                }}
              >
                카테고리
              </div>
              <div className="flex flex-col gap-2">
                {CATEGORY_LINKS.map((link) => (
                  <Link
                    key={link}
                    href={CATEGORY_HREF[link] ?? "#"}
                    className="text-xs text-[rgba(200,170,215,0.7)] no-underline transition-colors hover:text-[rgba(248,200,224,0.95)]"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div
                className="mb-3 text-xs font-bold tracking-wider uppercase"
                style={{
                  color: "rgba(248,164,200,0.8)",
                  letterSpacing: "0.1em",
                }}
              >
                더 보기
              </div>
              <div className="flex flex-col gap-2">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link}
                    href={MORE_HREF[link] ?? "#"}
                    className="text-xs text-[rgba(200,170,215,0.7)] no-underline transition-colors hover:text-[rgba(248,200,224,0.95)]"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center gap-4 border-t border-white/[0.07] pt-6 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-2"
          style={{ borderTopColor: "rgba(255,255,255,0.07)" }}
        >
          <p
            className="m-0 text-center text-xs md:text-left"
            style={{ color: "rgba(180,140,190,0.5)" }}
          >
            © {new Date().getFullYear()} Heartopia Wiki - @Jihye817 All rights
            reserved. - 팬 제작 위키, 비공식
          </p>
          <div className="flex gap-1.5">
            {["🌸", "🍀", "🌿", "✨"].map((emoji, index) => (
              <span key={index} className="text-[13px] opacity-50">
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
