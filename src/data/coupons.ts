export interface Coupon {
  code: string;
  expiresAt: string;
  reward: string;
  createdAt: string;
}

export const COUPONS: Coupon[] = [
  {
    code: "love214",
    expiresAt: "2026-04-01",
    reward:
      "🌹 스노우 로즈 x 5, 🎆 무지개빛 요정의 지팡이-분홍색 x 2, 🌈 무지개빛 연기-분홍색 x 2",
    createdAt: "2026-02-14",
  },
  {
    code: "x8r2m9q5l7",
    expiresAt: "2026-04-01",
    reward: "⭐️ 소원별 x 5, 🐟 인어 집어기 x 3, 🌱 비료 x 10",
    createdAt: "2026-02-16",
  },
  {
    code: "SPRINGFEST2026",
    expiresAt: "2026-04-01",
    reward: "🌙 달빛 크리스탈 x 10, 💰 골드 8888개",
    createdAt: "2026-02-16",
  },
  {
    code: "p7a9k2m6r8",
    expiresAt: "2026-04-01",
    reward: "⭐️ 소원별 x 5, 🐟 인어 집어기 x 3, 🌱 비료 x 10",
    createdAt: "2026-02-23",
  },
  {
    code: "n5q7m9l2a4",
    expiresAt: "2026-03-31",
    reward: "⭐️ 소원별 x 5, 🐟 인어 집어기 x 3, 🌱 비료 x 10",
    createdAt: "2026-03-02",
  },
  {
    code: "k9r8m2q7a5",
    expiresAt: "2026-03-31",
    reward: "⭐️ 소원별 x 5, 🐟 인어 집어기 x 3, 🌱 비료 x 10",
    createdAt: "2026-03-09",
  },
  {
    code: "sweetgift314u",
    expiresAt: "2026-05-01",
    reward: "🌹 스노우 로즈 x 5, 🎆 무지개빛 요정의 지팡이-분홍색 x 2",
    createdAt: "2026-03-14",
  },
  {
    code: "l7m5q2r9a8",
    expiresAt: "2026-04-01",
    reward: "⭐️ 소원별 x 5, 🐟 인어 집어기 x 3, 🌱 비료 x 10",
    createdAt: "2026-03-18",
  },
  {
    code: "a4k9m7q2r6",
    expiresAt: "2026-04-01",
    reward: "⭐️ 소원별 x 5, 🐟 인어 집어기 x 3, 🌱 비료 x 10",
    createdAt: "2026-03-23",
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
