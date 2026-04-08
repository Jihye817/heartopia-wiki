import type { Metadata } from "next";
import { HeroSection } from "./_components/hero-section";
import { CategorySection } from "./_components/category-section";
import { CouponSection } from "./_components/coupon-section";
import { getValidCoupons } from "@/data/coupons";

export const metadata: Metadata = {
  alternates: { canonical: "https://heartopia-gamewiki.com" },
};

export default async function Home() {
  const coupons = await getValidCoupons();
  return (
    <>
      <HeroSection />
      <CategorySection />
      <CouponSection coupons={coupons} />
    </>
  );
}
