// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface BreedingRule {
  parent: [number, number];
  results: number[];
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const BREEDING_RULES: BreedingRule[] = [
  { parent: [1, 1], results: [1, 2] },
  { parent: [2, 2], results: [2, 3] },
  { parent: [3, 3], results: [3, 4] },
  { parent: [4, 4], results: [4] },
];

const FOOTNOTES = [
  "정확한 확률은 공개되지 않았습니다.",
  "플레이 데이터를 기반으로 정리된 정보입니다.",
];

// ─────────────────────────────────────────────
// Star chip colour map (페이지 톤에 맞춤)
// ─────────────────────────────────────────────
const STAR_STYLE: Record<number, string> = {
  1: "bg-orange-50 text-orange-700 border-orange-200",
  2: "bg-amber-50 text-amber-700 border-amber-200",
  3: "bg-emerald-50 text-emerald-700 border-emerald-200",
  4: "bg-sky-50 text-sky-700 border-sky-200",
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function StarChip({ grade }: { grade: number }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold whitespace-nowrap ${STAR_STYLE[grade] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
    >
      {"★".repeat(grade)}
    </span>
  );
}

interface BreedingRowProps {
  rule: BreedingRule;
}

function BreedingRow({ rule }: BreedingRowProps) {
  const [a, b] = rule.parent;
  return (
    <tr
      className="border-b border-[rgba(230,210,230,0.4)] last:border-0 transition-colors hover:bg-[#fff0f6]/40"
      style={{ borderColor: "rgba(230,210,230,0.4)" }}
    >
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <StarChip grade={a} />
          <span
            className="text-base font-black leading-none"
            style={{ color: "#e8739b" }}
          >
            +
          </span>
          <StarChip grade={b} />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {rule.results.map((r, i) => (
            <span key={r} className="flex items-center gap-1.5">
              {i > 0 && (
                <span
                  className="text-[10px] font-bold"
                  style={{ color: "#8a6898" }}
                >
                  또는
                </span>
              )}
              <StarChip grade={r} />
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export function FlowerBreedingCard() {
  return (
    <div
      className="overflow-hidden rounded-[20px] border-[1.5px] max-w-lg w-full"
      style={{
        background: "rgba(255,252,254,0.95)",
        borderColor: "rgba(230,210,230,0.6)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent stripe */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, #ffd6e8, #f8a4c8, rgba(200,180,230,0.8))",
        }}
      />

      <div className="px-6 py-6">
        {/* Header */}
        <div className="mb-5 flex items-start gap-3.5">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border-[1.5px] text-2xl"
            style={{
              background: "rgba(248,164,200,0.15)",
              borderColor: "rgba(248,164,200,0.35)",
            }}
          >
            🌸
          </div>
          <div>
            <h2
              className="mb-1 text-base font-bold tracking-tight"
              style={{ color: "#4a3060" }}
            >
              꽃 교배
            </h2>
            <p
              className="text-xs font-medium leading-relaxed"
              style={{ color: "#8a6898" }}
            >
              같은 성급의 꽃을 교배하면 같은 성급 또는 더 높은 성급의 꽃이
              랜덤으로 생성될 수 있습니다.
            </p>
          </div>
        </div>

        {/* Wiki notice */}
        <div
          className="mb-5 flex items-start gap-2 rounded-2xl border px-4 py-3"
          style={{
            background: "rgba(248,164,200,0.08)",
            borderColor: "rgba(248,164,200,0.25)",
          }}
        >
          <span
            className="mt-px flex-shrink-0 text-sm opacity-70"
            aria-hidden
          >
            📖
          </span>
          <p
            className="text-[11px] font-semibold leading-relaxed"
            style={{ color: "#8a6898" }}
          >
            이 정보는 플레이어 커뮤니티의 플레이 데이터를 기반으로 정리된
            위키 정보입니다. 공식 데이터와 다를 수 있어요.
          </p>
        </div>

        {/* Section label */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#b080c0" }}
          >
            교배 규칙
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "rgba(230,210,230,0.6)" }}
          />
        </div>

        {/* Table */}
        <div
          className="overflow-hidden rounded-2xl border-[1.5px]"
          style={{ borderColor: "rgba(230,210,230,0.6)" }}
        >
          <table className="w-full">
            <thead>
              <tr
                className="border-b-[1.5px]"
                style={{
                  background: "rgba(248,164,200,0.08)",
                  borderColor: "rgba(230,210,230,0.6)",
                }}
              >
                <th
                  className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "#8a6898" }}
                >
                  부모 꽃 조합
                </th>
                <th
                  className="px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "#8a6898" }}
                >
                  가능한 결과
                </th>
              </tr>
            </thead>
            <tbody>
              {BREEDING_RULES.map((rule) => (
                <BreedingRow
                  key={`${rule.parent[0]}-${rule.parent[1]}`}
                  rule={rule}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnotes */}
        <ul className="mt-4 flex flex-col gap-1.5">
          {FOOTNOTES.map((note) => (
            <li
              key={note}
              className="flex items-start gap-1.5 text-[11px] font-semibold leading-relaxed opacity-80"
              style={{ color: "#8a6898" }}
            >
              <span className="flex-shrink-0 opacity-60">※</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
