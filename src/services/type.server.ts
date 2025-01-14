'use server'

import { createClient } from "@/utils/supabase/server"

export async function getTypeRoom () {
  const supabase = await createClient()
  const { data: typeroom, error} = await supabase.from('typeroom').select('id,name,price')
  if (error) {
    console.error('Error fetching floors:', error);
    return 0;
  }
  return typeroom || [];
}

