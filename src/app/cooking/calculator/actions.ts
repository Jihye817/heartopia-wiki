"use server";

import { getFoodDetail } from "../_data/foods";
import type { IngredientSlot } from "../_data/foods";

export async function getIngredients(foodId: string): Promise<IngredientSlot[]> {
  const food = await getFoodDetail(foodId);
  return food?.ingredients ?? [];
}
