import type { Metadata } from "next";
import { HeroSection } from "./_components/hero-section";
import { CategorySection } from "./_components/category-section";
import { CouponSection } from "./_components/coupon-section";

export const metadata: Metadata = {
  alternates: { canonical: "https://heartopia-gamewiki.com" },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <CouponSection />
    </>
  );
}
