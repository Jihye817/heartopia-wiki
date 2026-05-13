import { supabase } from "@/lib/supabase";

export type NpcCategory = "상점" | "사건" | "퀘스트" | "가이드" | "주민";

export interface NpcDetails {
  shop?: string;
  guide?: string;
  incident?: string; //사건
}

export interface NpcItem {
  id: string;
  name: string;
  thumbnail?: string | null;
  price?: number | null;
}

export interface NpcShopItem {
  id: string;
  name: string;
  thumbnail?: string | null;
  price?: number | null;
  category: string;
  description?: string | null;
  ref_id?: string | null;
  ref_table?: string | null;
  availability: string;
  event?: string | null;
  sort_order?: number | null;
  currency: string;
  stock?: number | null;
}

export interface Npc {
  id: string;
  name: string;
  thumbnail?: string | null;
  location?: string | null;
  map_x?: number | null;
  map_y?: number | null;
  description?: string | null;
  category: NpcCategory[];
  unlock_level?: number | null;
  unlock_condition?: string | null;
  details?: NpcDetails | null;
  items?: NpcItem[];
  shopItems?: NpcShopItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNpc(row: any): Npc {
  return {
    id: row.id,
    name: row.name,
    thumbnail: row.thumbnail ?? null,
    location: row.location ?? null,
    map_x: row.map_x ?? null,
    map_y: row.map_y ?? null,
    description: row.description ?? null,
    category: (row.category ?? []) as NpcCategory[],
    unlock_level: row.unlock_level ?? null,
    unlock_condition: row.unlock_condition ?? null,
    details: row.details ?? null,
  };
}

export async function getNpcs(): Promise<Npc[]> {
  const { data, error } = await supabase
    .from("npcs")
    .select("*")
    .order("unlock_level", { ascending: true, nullsFirst: false })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapNpc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNpcShopItem(row: any): NpcShopItem {
  return {
    id: row.id,
    name: row.name,
    thumbnail: row.thumbnail ?? null,
    price: row.price ?? null,
    category: row.category ?? "",
    description: row.description ?? null,
    ref_id: row.ref_id ?? null,
    ref_table: row.ref_table ?? null,
    availability: row.availability ?? "always",
    event: row.event ?? null,
    sort_order: row.sort_order ?? null,
    currency: row.currency ?? "gold",
    stock: row.stock ?? null,
  };
}

export async function getNpcDetail(id: string): Promise<Npc | null> {
  const [npcRes, itemsRes] = await Promise.all([
    supabase.from("npcs").select("*").eq("id", id).single(),
    supabase
      .from("npc_items")
      .select("*")
      .eq("npc_id", id)
      .order("sort_order", { ascending: true }),
  ]);
  if (npcRes.error || !npcRes.data) return null;
  const npc = mapNpc(npcRes.data);
  npc.shopItems = (itemsRes.data ?? []).map(mapNpcShopItem);
  return npc;
}
