import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ProductCategory = "mushroom" | "fruit" | "wood" | "stone";

export type ProductAvailability = "always" | "event";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  availability: ProductAvailability;
  event?: string | null;
  thumbnail: string | null;
  location: string | null;
  respawn_time: string | null;
  sell_price: number | null;
  stamina: number | null;
  notes: string | null;
  parent_id: string | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function sortProducts(products: Product[]): Product[] {
  const parents = products.filter((p) => p.parent_id === null);
  const childrenMap = new Map<string, Product[]>();
  for (const p of products) {
    if (p.parent_id !== null) {
      const list = childrenMap.get(p.parent_id) ?? [];
      list.push(p);
      childrenMap.set(p.parent_id, list);
    }
  }
  const result: Product[] = [];
  for (const parent of parents) {
    result.push(parent);
    result.push(...(childrenMap.get(parent.id) ?? []));
  }
  return result;
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("category");
  if (error) throw new Error(error.message);
  return sortProducts((data ?? []) as Product[]);
}

export async function getProductDetail(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data as Product;
}
