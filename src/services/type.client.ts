import { createClient } from "@/utils/supabase/client";
import { count } from "console";

export async function deleteTypeRoom (name:string){
  const supabase = await createClient()
  const {error} = await supabase.from('typeroom').delete().eq('name',name)
  if (error) {
    console.error('Error fetching type rooms:', error);
    return 0;
  }
  return true
}

export async function upsertTypeRoom(id?: string, name?: string, price?: number) {
  const supabase = await createClient();

  const upsertData: { id?: string; name?: string; price?: number } = { name, price };
  if (id && id !== '') {
    upsertData.id = id;
  }

  const { data, error } = await supabase
    .from('typeroom')
    .upsert(upsertData)
    .select('id');

  if (error) {
    console.error('Error upsert type room:', error);
    return 0;
  }
  return data;
}

export async function upsertRoom ( p_rooms: { id: string; number: number; floor: number; typeId: string }[]) {
  const supabase = await createClient()

  const {data, error} = await supabase.rpc('upsert_rooms',{p_rooms:p_rooms})
  if (error) {
    console.error('Error upsert room:', error);
    return 0;
  }
  return true;
}
type TypeRoom = {
  name: string;
  room: { count: number }[];
};

export async function getCountType () {
  const supabase = await createClient()
  const {data, error} = await supabase.from('typeroom').select(`name, room(count)`).eq('room.available',true)
  if (error) {
    console.error('Error fetching type rooms:', error);
    return [error]
  }else{
    const result = (data as TypeRoom[]).map((type)=>({
      name:type.name,
      count: type.room[0]?.count || 0
    }))
    return result
  }
}