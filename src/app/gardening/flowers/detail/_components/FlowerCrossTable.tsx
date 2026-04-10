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
    <span className="text-sm leading-none tracking-wide text-amber-500">
      {"★".repeat(stars)}
    </span>
  );
}

function ColorChip({
  item,
  isResult,
}: {
  item: CrossItem;
  isResult?: boolean;
}) {
  const { name, hex, image, emoji, stars } = item;

  const nameBlock = (
    <span className="flex flex-col items-start gap-0.5">
      <span
        className="text-sm font-semibold whitespace-nowrap"
        style={{
          color: isResult
            ? "var(--wiki-cat-garden)"
            : "var(--wiki-text-primary)",
        }}
      >
        {name}
      </span>
      {stars != null && <StarDisplay stars={stars} />}
    </span>
  );

  const chipStyle = isResult
    ? "inline-flex min-w-[120px] items-center gap-2 rounded-full border-[1.5px] px-1.5 py-1 md:min-w-[150px] md:px-2.5 md:py-1.5 bg-[var(--wiki-cat-garden-bg)] border-[var(--wiki-cat-garden-border)]"
    : "inline-flex min-w-[120px] items-center gap-2 rounded-full border-[1.5px] px-1.5 py-1 md:min-w-[150px] md:px-2.5 md:py-1.5 bg-[var(--wiki-bg)] border-[var(--wiki-border)] transition-all hover:border-[var(--wiki-text-muted)] hover:shadow-sm";

  if (image) {
    return (
      <span className={chipStyle}>
        <span className="relative flex h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-[var(--wiki-cat-garden-bg)] md:h-11 md:w-11">
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
      className={chipStyle}
      style={
        !isResult && hex
          ? {
              background: hex,
              color: hex === "#ffffff" ? "#374151" : undefined,
            }
          : undefined
      }
    >
      {emoji && <span style={{ fontSize: "0.9em" }}>{emoji}</span>}
      {nameBlock}
    </span>
  );
}

function CombinationRow({ combination }: { combination: CrossCombination }) {
  const { result, a, b } = combination;

  return (
    <tr className="border-b border-[var(--wiki-border-light)] transition-colors last:border-0 hover:bg-[rgba(0,0,0,0.01)]">
      <td className="px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex flex-col gap-1.5">
            {a.map((item, index) => (
              <ColorChip key={index} item={item} />
            ))}
          </div>
          <span
            className="text-base font-extrabold"
            style={{ color: "var(--wiki-cat-garden)" }}
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
      <td className="px-5 py-3.5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <ColorChip item={result} isResult />
        </div>
      </td>
    </tr>
  );
}

function CombinationCard({ combination }: { combination: CrossCombination }) {
  const { result, a, b } = combination;

  return (
    <div className="rounded-xl border border-[var(--wiki-border-light)] bg-white p-4">
      <div className="mb-3">
        <span
          className="mb-1.5 block text-sm font-semibold"
          style={{ color: "var(--wiki-text-tertiary)" }}
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
            className="text-base font-extrabold"
            style={{ color: "var(--wiki-cat-garden)" }}
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
          className="mb-1.5 block text-sm font-semibold"
          style={{ color: "var(--wiki-text-tertiary)" }}
        >
          가능한 결과
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <ColorChip item={result} isResult />
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
    <div>
      {/* Section Header */}
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--wiki-border-light)] pb-3">
        <span
          className="text-2xl font-semibold"
          style={{
            color: "var(--wiki-text-primary)",
            fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
            letterSpacing: "-0.3px",
          }}
        >
          교배 조합표
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--wiki-border-light)] bg-white">
        {/* Wiki notice */}
        <div
          className="mx-5 mt-4 mb-4 flex items-start gap-2 rounded-lg border px-3.5 py-3"
          style={{
            background: "var(--wiki-cat-garden-bg)",
            borderColor: "var(--wiki-cat-garden-border)",
          }}
        >
          <span className="mt-px flex-shrink-0 text-sm opacity-70" aria-hidden>
            📖
          </span>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--wiki-text-secondary)" }}
          >
            이 정보는 플레이어 커뮤니티의 플레이 데이터를 기반으로 정리된 위키
            정보입니다. 공식 데이터와 다를 수 있어요.
          </p>
        </div>

        {hasCross ? (
          <>
            {/* Mobile: card list */}
            <div className="flex flex-col gap-3 px-5 pb-5 md:hidden">
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
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--wiki-border-light)] bg-[var(--wiki-bg)]">
                    <th
                      className="px-5 py-3.5 text-left text-sm font-semibold tracking-wide uppercase"
                      style={{ color: "var(--wiki-text-tertiary)" }}
                    >
                      부모 색상
                    </th>
                    <th
                      className="px-5 py-3.5 text-center text-sm font-semibold tracking-wide uppercase"
                      style={{ color: "var(--wiki-text-tertiary)" }}
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
            className="px-5 pb-5 text-sm"
            style={{ color: "var(--wiki-text-tertiary)" }}
          >
            아직 색상별 교배 정보가 없어요.
          </p>
        )}
      </div>
    </div>
  );
}
