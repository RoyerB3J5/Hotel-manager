import { createClient } from "@/utils/supabase/client";

export async function getHotelName (){
  const supabase = createClient()
  const {data: hotel, error} = await supabase.from('users').select('name')
  if(error){
    console.error('Error fetching hotel name:', error)
    return ''
  }
  return hotel[0].name
}