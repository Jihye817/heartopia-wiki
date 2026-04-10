import type { MetadataRoute } from "next";
import { getCrops } from "./gardening/crops/_data/crops";
import { getFlowers } from "./gardening/flowers/_data/flowers";
import { getProducts } from "./others/products/_data/products";
import { getFishes } from "./fishing/_data/fishes";
import { getFoods } from "./cooking/_data/foods";
import { getBirds } from "./birds/_data/birds";
import { getBugs } from "./bugs/_data/bugs";

const BASE_URL = "https://heartopia-gamewiki.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [flowers, crops, foods, fishes, bugs, birds, products] = await Promise.all([getFlowers(), getCrops(), getFoods(), getFishes(), getBugs(), getBirds(), getProducts()]);
  // ── 정적 라우트 ──────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/search`, priority: 0.9 },
    { url: `${BASE_URL}/coupons`, priority: 0.8 },
    { url: `${BASE_URL}/gardening`, priority: 0.8 },
    { url: `${BASE_URL}/gardening/crops`, priority: 0.8 },
    { url: `${BASE_URL}/gardening/flowers`, priority: 0.8 },
    { url: `${BASE_URL}/fishing`, priority: 0.8 },
    { url: `${BASE_URL}/cooking`, priority: 0.8 },
    { url: `${BASE_URL}/cooking/recipes`, priority: 0.8 },
    { url: `${BASE_URL}/bugs`, priority: 0.8 },
    { url: `${BASE_URL}/birds`, priority: 0.8 },
    { url: `${BASE_URL}/others`, priority: 0.7 },
    { url: `${BASE_URL}/others/products`, priority: 0.8 },
  ];

  // ── 동적 라우트 ──────────────────────────────────────────────
  const cropRoutes: MetadataRoute.Sitemap = crops.map((c) => ({
    url: `${BASE_URL}/gardening/crops/detail/${c.id}`,
    priority: 0.6,
  }));

  const flowerRoutes: MetadataRoute.Sitemap = flowers.map((f) => ({
    url: `${BASE_URL}/gardening/flowers/detail/${f.id}`,
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/others/products/detail/${p.id}`,
    priority: 0.6,
  }));

  const fishRoutes: MetadataRoute.Sitemap = fishes.map((f) => ({
    url: `${BASE_URL}/fishing/detail/${f.id}`,
    priority: 0.6,
  }));

  const foodRoutes: MetadataRoute.Sitemap = foods.map((f) => ({
    url: `${BASE_URL}/cooking/recipes/detail/${f.id}`,
    priority: 0.6,
  }));

  const birdRoutes: MetadataRoute.Sitemap = birds.map((b) => ({
    url: `${BASE_URL}/birds/detail/${b.id}`,
    priority: 0.6,
  }));

  const bugRoutes: MetadataRoute.Sitemap = bugs.map((b) => ({
    url: `${BASE_URL}/bugs/detail/${b.id}`,
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
    ...bugRoutes,
  ];
}
