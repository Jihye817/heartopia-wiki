"use client";

// v2 배경용 SVG 데코레이션
function Mushroom({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 50"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
    >
      <ellipse cx="20" cy="22" rx="18" ry="14" fill="#f4a0b0" />
      <ellipse cx="12" cy="18" rx="3" ry="2.5" fill="white" fillOpacity={0.6} />
      <ellipse cx="22" cy="13" rx="2" ry="1.8" fill="white" fillOpacity={0.5} />
      <ellipse cx="28" cy="20" rx="2.5" ry="2" fill="white" fillOpacity={0.5} />
      <rect x="16" y="33" width="8" height="14" rx="4" fill="#f5dfc8" />
    </svg>
  );
}

function Clover({
  style,
  color = "#a8d8a8",
}: {
  style?: React.CSSProperties;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 44"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
    >
      <circle cx="20" cy="13" r="9" fill={color} />
      <circle cx="11" cy="22" r="9" fill={color} />
      <circle cx="29" cy="22" r="9" fill={color} />
      <rect
        x="18"
        y="28"
        width="4"
        height="14"
        rx="2"
        fill={color}
        fillOpacity={0.7}
      />
    </svg>
  );
}

function Star({
  style,
  color = "#fde68a",
}: {
  style?: React.CSSProperties;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" style={style} fill={color} className="absolute">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function Butterfly({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 50 36"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
    >
      <ellipse
        cx="14"
        cy="14"
        rx="13"
        ry="10"
        fill="#c8a8e8"
        fillOpacity={0.7}
      />
      <ellipse
        cx="36"
        cy="14"
        rx="13"
        ry="10"
        fill="#e8a8c8"
        fillOpacity={0.7}
      />
      <ellipse cx="14" cy="26" rx="9" ry="7" fill="#b898d8" fillOpacity={0.6} />
      <ellipse cx="36" cy="26" rx="9" ry="7" fill="#d898b8" fillOpacity={0.6} />
      <ellipse
        cx="25"
        cy="18"
        rx="2"
        ry="10"
        fill="#6a4880"
        fillOpacity={0.5}
      />
      <line
        x1="25"
        y1="8"
        x2="20"
        y2="2"
        stroke="#6a4880"
        strokeWidth={1.2}
        strokeOpacity={0.5}
      />
      <line
        x1="25"
        y1="8"
        x2="30"
        y2="2"
        stroke="#6a4880"
        strokeWidth={1.2}
        strokeOpacity={0.5}
      />
    </svg>
  );
}

function WavyLine({
  style,
  color = "#e8c8e8",
}: {
  style?: React.CSSProperties;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 20"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute"
    >
      <path
        d="M0 10 Q15 2 30 10 Q45 18 60 10 Q75 2 90 10 Q105 18 120 10"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </svg>
  );
}

const HERO_STATS = [
  { num: "1,200+", label: "아이템" },
  { num: "48+", label: "레시피" },
  { num: "30+", label: "동물 종" },
] as const;

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[480px] overflow-hidden items-center justify-center px-6 pb-[60px] pt-20"
      style={{
        background:
          "linear-gradient(175deg, #fdf4ff 0%, #f5f0ff 30%, #eef8ff 60%, #f8fff4 100%)",
      }}
    >
      {/* v2 배경 데코레이션 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute h-[400px] w-[400px] rounded-full"
          style={{
            top: -80,
            left: -80,
            background:
              "radial-gradient(circle at 40% 40%, rgba(220,160,240,0.18), transparent 65%)",
            animation: "hero-blobA 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-0 h-[360px] w-[360px] rounded-full"
          style={{
            top: 0,
            right: -60,
            background:
              "radial-gradient(circle at 60% 40%, rgba(160,200,255,0.16), transparent 65%)",
            animation: "hero-blobB 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[35%] h-[320px] w-[320px] rounded-full"
          style={{
            bottom: -60,
            background:
              "radial-gradient(circle, rgba(170,230,190,0.16), transparent 65%)",
            animation: "hero-blobA 9s ease-in-out infinite reverse",
          }}
        />

        <Mushroom
          style={{
            bottom: -4,
            left: "6%",
            width: 44,
            opacity: 0.75,
            animation: "hero-sway 6s ease-in-out infinite",
          }}
        />
        <Mushroom
          style={{
            bottom: -4,
            left: "9.5%",
            width: 30,
            opacity: 0.55,
            animation: "hero-sway 8s ease-in-out infinite reverse",
          }}
        />
        <Mushroom
          style={{
            bottom: -4,
            right: "7%",
            width: 38,
            opacity: 0.65,
            animation: "hero-sway 7s ease-in-out infinite",
          }}
        />

        <Clover
          style={{
            bottom: 2,
            left: "18%",
            width: 28,
            opacity: 0.5,
            animation: "hero-sway 5s ease-in-out infinite",
          }}
          color="#98d898"
        />
        <Clover
          style={{ bottom: 2, right: "20%", width: 22, opacity: 0.4 }}
          color="#a8e8a8"
        />
        <Clover
          style={{
            top: "20%",
            left: "4%",
            width: 18,
            opacity: 0.3,
            animation: "hero-sway 9s ease-in-out infinite reverse",
          }}
          color="#b0d8f0"
        />

        <Butterfly
          style={{
            top: "18%",
            left: "14%",
            width: 36,
            opacity: 0.55,
            animation: "hero-flutter 4s ease-in-out infinite",
          }}
        />
        <Butterfly
          style={{
            top: "30%",
            right: "12%",
            width: 28,
            opacity: 0.45,
            animation: "hero-flutter 5s ease-in-out infinite reverse",
          }}
        />

        {[
          { top: "12%", left: "28%", size: 10, color: "#fde68a", delay: "0s" },
          {
            top: "22%",
            right: "28%",
            size: 8,
            color: "#fdc8d8",
            delay: "0.8s",
          },
          { top: "45%", left: "8%", size: 7, color: "#c8d8fd", delay: "1.4s" },
          {
            bottom: "22%",
            right: "6%",
            size: 9,
            color: "#fde68a",
            delay: "0.4s",
          },
          { top: "8%", right: "42%", size: 6, color: "#d8c8fd", delay: "1.8s" },
          {
            bottom: "35%",
            left: "30%",
            size: 7,
            color: "#c8fdd8",
            delay: "0.6s",
          },
        ].map((star, i) => {
          const { size, color, delay, ...position } = star;
          return (
            <Star
              key={i}
              color={color}
              style={{
                ...position,
                width: size,
                height: size,
                opacity: 0.7,
                animation: `hero-twinkle 2.5s ease-in-out ${delay} infinite`,
              }}
            />
          );
        })}

        <WavyLine
          style={{
            top: "38%",
            left: "65%",
            width: 120,
            opacity: 0.3,
          }}
        />
        <WavyLine
          style={{
            bottom: "30%",
            left: "5%",
            width: 80,
            opacity: 0.3,
          }}
          color="#a8d8f8"
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{
            background:
              "linear-gradient(to top, rgba(168,220,168,0.18), transparent)",
          }}
        />
      </div>

      {/* v1 콘텐츠 */}
      <div
        className="relative z-10 max-w-[600px] text-center"
        style={{
          animation: "hero-riseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        <div
          className="mb-7 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 pl-2.5"
          style={{
            background: "rgba(248,164,200,0.18)",
            border: "1px solid rgba(248,164,200,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="text-sm">🌸</span>
          <span
            className="text-[12px] font-semibold uppercase tracking-widest"
            style={{ color: "#c06898", letterSpacing: "0.08em" }}
          >
            Fan-made Wiki
          </span>
        </div>

        <h1
          className="m-0 mb-2.5 text-[clamp(44px,8vw,72px)] font-bold leading-[1.1] tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, #c0609a 0%, #9055c8 50%, #5088dc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 12px rgba(192,96,154,0.15))",
          }}
        >
          Heartopia
          <br />
          Wiki
        </h1>

        <p
          className="m-0 mt-3.5 text-base font-normal"
          style={{ color: "#a080b0", letterSpacing: "0.06em" }}
        >
          두근두근타운 정보 위키
        </p>

        <div className="mx-auto mt-7 flex max-w-[280px] items-center justify-center gap-3">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(192,96,154,0.3))",
            }}
          />
          <span className="text-base opacity-70">✿</span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(192,96,154,0.3))",
            }}
          />
        </div>

        <p
          className="mx-auto mt-5 max-w-[420px] text-sm font-normal leading-[1.8]"
          style={{ color: "#9a7aaa" }}
        >
          두근두근타운의 모든 정보를 한 곳에서.
          <br />
          원예, 채집, 동물, 요리 공략을 확인하세요.
        </p>

        {/* <div className="mt-9 flex flex-wrap justify-center gap-8">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-[22px] font-bold leading-none"
                style={{ color: "#b060a0" }}
              >
                {stat.num}
              </div>
              <div
                className="mt-1 text-[12px]"
                style={{ color: "#b8a0c0", letterSpacing: "0.05em" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
