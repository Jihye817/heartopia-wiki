import type { Metadata } from "next";
import { HeroSection } from "./_components/hero-section";
import { CategorySection } from "./_components/category-section";
import { CouponSection } from "./_components/coupon-section";
import { UpdateSection } from "./_components/update-section";
import { getValidCoupons } from "@/data/coupons";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "두근두근타운 위키 | Heartopia Wiki",
  description:
    "두근두근타운의 모든 정보를 한 곳에서. 원예, 낚시, 요리, 곤충 채집, 새 관찰, 생산품 도감을 확인하세요.",
  alternates: { canonical: "https://heartopia-gamewiki.com" },
};

export default async function Home() {
  const [coupons, { data: updates }] = await Promise.all([
    getValidCoupons(),
    supabase
      .from("updates")
      .select("id, updated_at, content")
      .order("updated_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <>
      <HeroSection latestUpdate={updates?.[0] ?? null} />
      <CategorySection />
      <div
        className="px-4 md:px-6"
        style={{ animation: "fadeUp 0.5s ease-out 0.2s both" }}
      >
        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-6 pb-20 md:grid-cols-2">
          <CouponSection coupons={coupons} />
          <UpdateSection updates={updates ?? []} />
        </div>
      </div>
    </>
  );
}
