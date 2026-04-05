import type { MetadataRoute } from "next";
import { CROPS } from "./gardening/crops/_data/crops";
import { FLOWERS } from "./gardening/flowers/_data/flowers";
import { PRODUCTS } from "./others/products/_data/products";
import { FISHES } from "./fishing/_data/fishes";
import { FOODS } from "./cooking/_data/foods";
import { BIRDS } from "./birds/_data/birds";

const BASE_URL = "https://heartopia-gamewiki.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 정적 라우트 ──────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/coupons`, priority: 0.8 },
    { url: `${BASE_URL}/gardening`, priority: 0.8 },
    { url: `${BASE_URL}/gardening/crops`, priority: 0.8 },
    { url: `${BASE_URL}/gardening/flowers`, priority: 0.8 },
    { url: `${BASE_URL}/fishing`, priority: 0.8 },
    { url: `${BASE_URL}/cooking`, priority: 0.8 },
    { url: `${BASE_URL}/cooking/recipes`, priority: 0.8 },
    { url: `${BASE_URL}/birds`, priority: 0.8 },
    { url: `${BASE_URL}/others`, priority: 0.7 },
    { url: `${BASE_URL}/others/products`, priority: 0.8 },
  ];

  // ── 동적 라우트 ──────────────────────────────────────────────
  const cropRoutes: MetadataRoute.Sitemap = CROPS.map((c) => ({
    url: `${BASE_URL}/gardening/crops/detail/${c.id}`,
    priority: 0.6,
  }));

  const flowerRoutes: MetadataRoute.Sitemap = FLOWERS.map((f) => ({
    url: `${BASE_URL}/gardening/flowers/detail/${f.id}`,
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE_URL}/others/products/detail/${p.id}`,
    priority: 0.6,
  }));

  const fishRoutes: MetadataRoute.Sitemap = FISHES.map((f) => ({
    url: `${BASE_URL}/fishing/detail/${f.id}`,
    priority: 0.6,
  }));

  const foodRoutes: MetadataRoute.Sitemap = FOODS.map((f) => ({
    url: `${BASE_URL}/cooking/recipes/detail/${f.id}`,
    priority: 0.6,
  }));

  const birdRoutes: MetadataRoute.Sitemap = BIRDS.map((b) => ({
    url: `${BASE_URL}/birds/detail/${b.id}`,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...cropRoutes,
    ...flowerRoutes,
    ...productRoutes,
    ...fishRoutes,
    ...foodRoutes,
    ...birdRoutes,
  ];
}
