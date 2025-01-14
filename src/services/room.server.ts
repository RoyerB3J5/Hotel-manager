'use server'
import { createClient } from "@/utils/supabase/server"

export async function getRoom () {
  const supabase = await createClient()
  const {data:room, error} = await supabase.from('room').select(`id,number,floor(number),typeroom(name)`)
  if (error) {
    console.error('Error fetching floors:', error);
    return 0;
  }
  return room || [];
}