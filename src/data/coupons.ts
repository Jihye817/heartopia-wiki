export interface Coupon {
  code: string;
  expiresAt: string;
  reward: string;
  createdAt: string;
}

export const COUPONS: Coupon[] = [
  {
    code: "sweetgift314u",
    expiresAt: "2026-05-01",
    reward: "🌹 스노우 로즈 x 5, 🎆 무지개빛 요정의 지팡이-분홍색 x 2",
    createdAt: "2026-03-14",
  },
  {
    code: "m5r9q2a7k8",
    expiresAt: "2026-06-01",
    reward: "⭐️ 소원별 x 3, 🧰 수리 키트 x 5, 🪴 작물 성장제 x 10",
    createdAt: "2026-03-30",
  },
  {
    code: "withu2026heartopia",
    expiresAt: "2026-05-01",
    reward: "🐟 인어 집어기 x 2, 💰 코인 5000개, 🧰 수리키트 x 3",
    createdAt: "2026-04-05",
  },
  {
    code: "heartopiaplaytime",
    expiresAt: "2026-05-01",
    reward: "💎 완벽한 형광석 x 2, 🪵 고급 목재 x 6, 🪨 돌 x 10",
    createdAt: "2026-04-04",
  },
  {
    code: "keepsmiling2026",
    expiresAt: "2026-05-01",
    reward: "⭐️ 소원별 x 5, 🌱 비료 x 3, 🐟 인어 집어기 x 10",
    createdAt: "2026-04-01",
  },
  {
    code: "p6n4m9q3a2",
    expiresAt: "2026-06-01",
    reward: "⭐️ 소원별 x 3, 🧰 수리 키트 x 5, 🪴 작물 성장제 x 10",
    createdAt: "2026-04-06",
  },
];

const LATEST_COUPONS_COUNT = 5;

export function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

export function getValidCoupons(): Coupon[] {
  return [...COUPONS]
    .filter((c) => !isExpired(c.expiresAt))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getLatestCoupons(
  count: number = LATEST_COUPONS_COUNT,
): Coupon[] {
  return [...COUPONS]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, count);
}
