
import { createClient } from "@/utils/supabase/client";


export async function addFloor(start: number, end: number) {
  const supabase = await createClient();
  for (let i = start; i <= end; i++) {
    await supabase.from('floor').insert([{ number: i }]);
  }
}

export async function deleteFloor(start: number, end: number) {
  const supabase = await createClient();
  for (let i = start; i > end; i--) {
    await supabase.from('floor').delete().eq('number', i);
  }
}

export const getFloors = async () => {
  const supabase = await createClient()
  const { data: floor, error } = await supabase.from('floor').select('number');
  if (error) {
    console.error('Error fetching floors:', error);
    return 0;
  }
  return floor;
};