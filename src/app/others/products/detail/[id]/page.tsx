import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductDetail } from "../../_data/products";
import ProductDetailClient from "./Client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = id ? await getProductDetail(id) : null;
  if (!product) return {};
  return {
    title: `${product.name} | 생산품 도감`,
    description: `${product.name}의 채집 장소, 리스폰 시간, 판매 가격 정보를 확인할 수 있어요.`,
    alternates: { canonical: `/others/products/detail/${id}` },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = id ? await getProductDetail(id) : null;
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
