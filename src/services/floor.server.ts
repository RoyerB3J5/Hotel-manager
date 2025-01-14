'use server'
import { createClient } from "@/utils/supabase/server";

export const getFloors = async () => {
  const supabase = await createClient()
  const { data: floor, error } = await supabase.from('floor').select('number');
  if (error) {
    console.error('Error fetching floors:', error);
    return 0;
  }
  return floor;
};