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

export async function getNpcDetail(id: string): Promise<Npc | null> {
  const { data, error } = await supabase
    .from("npcs")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return mapNpc(data);
}
