import type { Metadata } from "next";
import { PRODUCTS } from "./_data/products";
import ProductsPageClient from "./Client";

export const metadata: Metadata = {
  title: "생산품 도감",
  description:
    "두근두근타운에서 채집할 수 있는 버섯·과일 등 생산품의 장소와 리스폰 시간을 확인할 수 있어요.",
  alternates: { canonical: "/others/products" },
};

export default function OthersProductsPage() {
  return <ProductsPageClient products={PRODUCTS} />;
}
