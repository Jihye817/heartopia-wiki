import Image from "next/image";
import type {
  CrossCombination,
  CrossItem,
  FlowerDetail,
} from "../../_data/flowers";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface FlowerCrossTableProps {
  flower: FlowerDetail;
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
const CHIP_IMAGE_SIZE = 44;

function StarDisplay({ stars }: { stars: number }) {
  return (
    <span className="text-xs leading-none text-amber-500 md:text-sm">
      {"★".repeat(stars)}
    </span>
  );
}

function ColorChip({ item }: { item: CrossItem }) {
  const { name, hex, image, emoji, stars } = item;

  const nameBlock = (
    <span className="flex flex-col items-start gap-0.5">
      <span className="text-xs font-bold whitespace-nowrap md:text-sm">
        {name}
      </span>
      {stars != null && <StarDisplay stars={stars} />}
    </span>
  );

  if (image) {
    return (
      <span className="inline-flex min-w-[105px] items-center justify-center gap-1.5 rounded-full border-2 border-white/90 bg-gray-100 px-2 py-1 shadow-sm md:min-w-[130px] md:gap-2 md:px-2.5 md:py-1.5">
        <span className="relative flex h-8 w-8 flex-shrink-0 overflow-hidden rounded-full md:h-11 md:w-11">
          <Image
            src={image}
            alt={name}
            width={CHIP_IMAGE_SIZE}
            height={CHIP_IMAGE_SIZE}
            className="h-full w-full object-contain"
          />
        </span>
        {nameBlock}
      </span>
    );
  }

  return (
    <span
      className="inline-flex min-w-[105px] items-center justify-center gap-1 rounded-full border-2 border-white/90 px-2 py-0.5 text-xs font-bold shadow-sm md:min-w-[130px] md:px-2.5 md:py-1 md:text-sm"
      style={{
        background: hex,
        color: hex === "#ffffff" ? "#374151" : undefined,
      }}
    >
      {emoji && <span style={{ fontSize: "0.9em" }}>{emoji}</span>}
      {nameBlock}
    </span>
  );
}

function CombinationRow({ combination }: { combination: CrossCombination }) {
  const { result, a, b } = combination;

  return (
    <tr
      className="border-b border-[rgba(230,210,230,0.4)] transition-colors last:border-0 hover:bg-[#fff0f6]/40"
      style={{ borderColor: "rgba(230,210,230,0.4)" }}
    >
      <td className="px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-col gap-1.5">
            {a.map((item, index) => (
              <ColorChip key={index} item={item} />
            ))}
          </div>
          <span
            className="text-base leading-none font-black"
            style={{ color: "#e8739b" }}
          >
            +
          </span>
          <div className="flex flex-col gap-1.5">
            {b.map((item, index) => (
              <ColorChip key={index} item={item} />
            ))}
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <ColorChip item={result} />
        </div>
      </td>
    </tr>
  );
}

function CombinationCard({ combination }: { combination: CrossCombination }) {
  const { result, a, b } = combination;

  return (
    <div
      className="rounded-xl border-[1.5px] p-4 transition-colors"
      style={{
        borderColor: "rgba(230,210,230,0.6)",
        background: "rgba(255,255,255,0.6)",
      }}
    >
      <div className="mb-3">
        <span
          className="mb-1.5 block text-sm font-bold tracking-wider uppercase"
          style={{ color: "#8a6898" }}
        >
          부모 색상
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-col gap-1.5">
            {a.map((item, index) => (
              <ColorChip key={index} item={item} />
            ))}
          </div>
          <span
            className="text-base leading-none font-black"
            style={{ color: "#e8739b" }}
          >
            +
          </span>
          <div className="flex flex-col gap-1.5">
            {b.map((item, index) => (
              <ColorChip key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <span
          className="mb-1.5 block text-sm font-bold tracking-wider uppercase"
          style={{ color: "#8a6898" }}
        >
          가능한 결과
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <ColorChip item={result} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export function FlowerCrossTable({ flower }: FlowerCrossTableProps) {
  const hasCross = flower.cross && flower.cross.length > 0;

  return (
    <div
      className="w-full overflow-hidden rounded-[20px] border-[1.5px]"
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

      <div className="px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
        {/* Header */}
        <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-3.5 md:mb-5">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border-[1.5px] text-xl sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl"
            style={{
              background: "rgba(248,164,200,0.15)",
              borderColor: "rgba(248,164,200,0.35)",
            }}
          >
            🌸
          </div>
          <div className="min-w-0 flex-1">
            <h2
              className="mb-0.5 text-base font-bold tracking-tight sm:mb-1 sm:text-lg"
              style={{ color: "#4a3060" }}
            >
              색상별 교배
            </h2>
            <p
              className="text-xs leading-relaxed font-medium md:text-sm"
              style={{ color: "#8a6898" }}
            >
              같은 성급의 꽃을 교배하면 같은 성급 또는 더 높은 성급의 꽃이
              랜덤으로 생성될 수 있습니다.
            </p>
          </div>
        </div>

        {/* Wiki notice */}
        <div
          className="mb-4 flex items-start gap-2 rounded-xl border px-3 py-2.5 sm:mb-5 sm:rounded-2xl sm:px-4 sm:py-3"
          style={{
            background: "rgba(248,164,200,0.08)",
            borderColor: "rgba(248,164,200,0.25)",
          }}
        >
          <span className="mt-px flex-shrink-0 text-sm opacity-70" aria-hidden>
            📖
          </span>
          <p
            className="text-xs leading-relaxed font-semibold md:text-sm"
            style={{ color: "#8a6898" }}
          >
            이 정보는 플레이어 커뮤니티의 플레이 데이터를 기반으로 정리된 위키
            정보입니다. 공식 데이터와 다를 수 있어요.
          </p>
        </div>

        {hasCross ? (
          <>
            {/* Section label */}
            <div className="mb-2 flex items-center gap-2 sm:mb-3">
              <span
                className="text-sm font-bold tracking-widest whitespace-nowrap uppercase"
                style={{ color: "#b080c0" }}
              >
                교배 조합
              </span>
              <div
                className="h-px flex-1"
                style={{ background: "rgba(230,210,230,0.6)" }}
              />
            </div>

            {/* Mobile: card list */}
            <div className="flex flex-col gap-3 md:hidden">
              {flower.cross.flatMap((step, stepIndex) =>
                step.combinations.map((combo, comboIndex) => (
                  <CombinationCard
                    key={`${stepIndex}-${comboIndex}`}
                    combination={combo}
                  />
                )),
              )}
            </div>

            {/* Desktop: table */}
            <div
              className="hidden overflow-hidden rounded-2xl border-[1.5px] md:block"
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
                      className="px-4 py-3 text-left text-sm font-bold tracking-wider uppercase"
                      style={{ color: "#8a6898" }}
                    >
                      부모 색상
                    </th>
                    <th
                      className="px-4 py-3 text-center text-sm font-bold tracking-wider uppercase"
                      style={{ color: "#8a6898" }}
                    >
                      가능한 결과
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {flower.cross.flatMap((step, stepIndex) =>
                    step.combinations.map((combo, comboIndex) => (
                      <CombinationRow
                        key={`${stepIndex}-${comboIndex}`}
                        combination={combo}
                      />
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p
            className="text-xs leading-relaxed font-semibold sm:text-sm"
            style={{ color: "#8a6898" }}
          >
            아직 색상별 교배 정보가 없어요.
          </p>
        )}
      </div>
    </div>
  );
}
