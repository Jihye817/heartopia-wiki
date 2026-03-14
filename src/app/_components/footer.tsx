import Link from "next/link";

const CATEGORY_LINKS = [
  "원예",
  "요리",
  "낚시",
  "곤충 채집",
  "새 관찰",
  "반려동물",
] as const;
const MORE_LINKS = ["쿠폰 코드", "업데이트 노트", "문의"] as const;

export function Footer() {
  return (
    <footer
      className="border-t border-[rgba(248,164,200,0.15)] px-6 pb-8 pt-11"
      style={{ background: "rgba(60,40,75,0.96)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-9 flex flex-wrap justify-between gap-8">
          <div className="max-w-[280px]">
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

          <div>
            <div
              className="mb-3 text-[11px] font-bold uppercase tracking-wider"
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
                  href="#"
                  className="text-[13px] text-[rgba(200,170,215,0.7)] no-underline transition-colors hover:text-[rgba(248,200,224,0.95)]"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div
              className="mb-3 text-[11px] font-bold uppercase tracking-wider"
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
                  href="#"
                  className="text-[13px] text-[rgba(200,170,215,0.7)] no-underline transition-colors hover:text-[rgba(248,200,224,0.95)]"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-5"
          style={{ borderTopColor: "rgba(255,255,255,0.07)" }}
        >
          <p
            className="m-0 text-[11px]"
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
