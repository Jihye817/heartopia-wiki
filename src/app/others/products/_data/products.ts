import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ProductCategory = "mushroom" | "fruit" | "wood" | "stone";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  thumbnail: string | null;
  location: string | null;
  respawn_time: string | null;
  sell_price: number | null;
  stamina: number | null;
  notes: string | null;
  strange_1: string | null;
  strange_2: string | null;
  strange_3: string | null;
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("category");
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
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
