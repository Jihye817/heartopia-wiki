import { supabase } from "@/lib/supabase";

export interface Coupon {
  code: string;
  expires_at: string;
  reward: string;
  created_at: string;
}

export async function getValidCoupons(): Promise<Coupon[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("coupons")
    .select("code, expires_at, reward, created_at")
    .gte("expires_at", today)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Coupon[];
}
