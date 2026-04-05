import { notFound } from "next/navigation";
import { PRODUCTS } from "../../_data/products";
import ProductDetailClient from "./Client";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return {
      title: "생산품 상세",
      description: "생산품 상세 정보를 확인할 수 있습니다.",
      alternates: { canonical: `/others/products/detail/${id}` },
    };
  }

  return {
    title: `${product.ko}`,
    description: `${product.ko}의 채집 장소·리스폰·판매가 정보입니다.`,
    alternates: { canonical: `/others/products/detail/${id}` },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
