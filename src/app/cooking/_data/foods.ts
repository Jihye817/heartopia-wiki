import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export type FoodAvailability = "always" | "event" | "event_unlock";

export interface IngredientItem {
  id: string;
  name: string;
  ko: string;
  thumbnail?: string;
  href?: string;
}

export interface IngredientSlot {
  amount: number;
  specific?: IngredientItem;
  groupLabel?: string;
  groupEmoji?: string;
  options?: IngredientItem[];
}

export interface Food {
  id: string;
  emoji: string;
  thumbnail?: string;
  name: string;
  ko: string;
  desc?: string;
  level: number;
  sellMin: number;
  sellMax: number;
  availability: FoodAvailability;
  event?: string;
}

export interface FoodGrade {
  stars: number;
  sellPrice: number;
  eventPrice: number;
}

export interface FoodListItem extends Food {
  food_grades: FoodGrade[];
}

export interface FoodDetail extends Food {
  ingredients: IngredientSlot[];
  grades: FoodGrade[];
}

// ── Mappers ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFood(row: any): Food {
  return {
    id: row.id,
    name: row.name,
    ko: row.name,
    emoji: "",
    thumbnail: row.thumbnail ?? undefined,
    desc: row.description ?? undefined,
    level: row.level ?? 0,
    sellMin: row.sell_min ?? 0,
    sellMax: row.sell_max ?? 0,
    availability: (row.availability as FoodAvailability) ?? "always",
    event: row.event ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGrade(row: any): FoodGrade {
  return {
    stars: row.stars,
    sellPrice: row.sell_price ?? 0,
    eventPrice: row.event_price ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapIngredient(row: any): IngredientSlot {
  if (row.type === "specific") {
    return {
      amount: row.amount,
      specific: {
        id: row.item_id ?? "",
        name: row.item_name ?? "",
        ko: row.item_name ?? "",
        thumbnail: row.item_thumbnail ?? undefined,
        href: row.item_href ?? undefined,
      },
    };
  }
  return {
    amount: row.amount,
    groupLabel: row.group_label ?? undefined,
    groupEmoji: row.group_emoji ?? undefined,
    options: (row.options as IngredientItem[]) ?? [],
  };
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getFoods(): Promise<FoodListItem[]> {
  const { data, error } = await supabase
    .from("foods")
    .select("*, food_grades(*)")
    .order("level", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => {
    const food_grades = (row.food_grades ?? [])
      .map(mapGrade)
      .sort((a: FoodGrade, b: FoodGrade) => a.stars - b.stars);
    return { ...mapFood(row), food_grades };
  });
}

export async function getFoodDetail(id: string): Promise<FoodDetail | null> {
  const { data, error } = await supabase
    .from("foods")
    .select("*, food_grades(*), food_ingredients(*)")
    .eq("id", id)
    .single();
  if (error || !data) return null;

  const grades = (data.food_grades ?? [])
    .map(mapGrade)
    .sort((a: FoodGrade, b: FoodGrade) => a.stars - b.stars);

  const ingredients = (data.food_ingredients ?? [])
    .sort(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any, b: any) => (a.slot_index ?? 0) - (b.slot_index ?? 0),
    )
    .map(mapIngredient);

  return { ...mapFood(data), grades, ingredients };
}
