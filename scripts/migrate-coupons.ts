import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const COUPONS = [
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

async function migrate() {
  for (const coupon of COUPONS) {
    const { error } = await supabase.from("coupons").upsert({
      code: coupon.code,
      expires_at: coupon.expiresAt,
      reward: coupon.reward,
      created_at: coupon.createdAt,
    });
    if (error) console.error("coupons error:", error);
    else console.log(`✅ ${coupon.code} 완료`);
  }

  console.log("🎉 마이그레이션 완료!");
}

migrate();
