import { createClient } from "@/utils/supabase/client";

export async function getReservesDate(numberRoom: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("client")
    .select("dateIn, dateOut,status,room!inner(number)")
    .eq("room.number", numberRoom)
    .eq("status", "reservation");
  if (error) {
    console.error("Error fetching reserves:", error);
    return [error];
  }
  return data;
}
interface ClientData {
  id?: string;
  name: string;
  lastname: string;
  dni: number;
  phone: number;
  dateIn: string;
  dateOut: string;
  status: string;
  price: number;
  paid: boolean;
  room_number: number;
}

export async function insertNewClient( clientData: ClientData) {
  const supabase = await createClient();
  const {error} = await supabase.rpc('insert_client_with_room_number', { client_data : clientData})
  if (error) {
    console.error("Error inserting new client:", error);
    return [error];
  }
  console.log('Client inserted successfully')
}

export async function updateClient (id: string, paid: boolean) {
  const supabase = await createClient();
  const { error} = await supabase.from('client').update({status: 'inactive',paid: paid}).eq('id',id)
  if (error) {
    console.error("Error updating client:", error);
    return [error];
  }
  console.log('Client updated successfully')
}

export async function updateReservation ( paid: boolean,id?: string) {
  const supabase = await createClient();
  const { error} = await supabase.from('client').update({status: 'active',paid: paid}).eq('id',id)
  if (error) {
    console.error("Error updating client:", error);
    return [error];
  }
  console.log('Client updated successfully')
}

interface Client {
  id: string;
  name: string;
  lastname: string;
  dni: number;
  phone: number;
  dateIn: string;
  dateOut: string;
  status: string;
  paid: boolean;
  price: number;
  room_number: number;
} 
interface TypeRoom {
  name: string;
  price: number;
  floor: number;
}

interface ClientWithRoom {
  client: Client;
  typeRoom: TypeRoom;
}


export async function getClientFilterPagination(status :string,query : string, page:number, pageSize: number): Promise<{data:ClientWithRoom[],total:number}> {
  const supabase = await createClient();
  const start = (page -1)*pageSize;
  const end = start + pageSize - 1;
  let queryBuilder = supabase
  .from('client')
  .select(`
    id,
    name,
    room(number,floor(number),typeroom(name,price)),
    lastname,
    dni,
    phone,
    dateIn,
    dateOut,
    status,
    paid,
    price
  `,{ count: 'exact' })
  .eq('status', status)
  .range(start,end)

  if (query){
    queryBuilder = queryBuilder.or(
      `name.ilike.%${query}%,lastname.ilike.%${query}%`
    );
  }

  const { data, error, count } = await queryBuilder;
  if (error) {
    console.error("Error fetching client reservations:", error);
    return { data: [] , total: 0};
  }

  const transformedData = data.map((client: any) => ({
    client: {
      id: client.id,
      name: client.name,
      lastname: client.lastname,
      dni: client.dni,
      phone: client.phone,
      dateIn: new Date(client.dateIn).toISOString().replace(/\.\d{3}Z$/, "Z"),
      dateOut: new Date(client.dateOut).toISOString().replace(/\.\d{3}Z$/, "Z"),
      status: client.status,
      paid: client.paid,
      price: client.price,
      room_number: client.room.number, 
    },
    typeRoom: {
      name: client.room.typeroom.name,
      price: client.room.typeroom.price,
      floor: client.room.floor.number,
    }
  }));

  return {data: transformedData, total: count};
}

export async function deleteClient(id:string) {
  const supabase =await createClient();
  const {error} = await supabase.from('client').delete().eq('id',id)
  if (error) {
    console.error("Error deleting client:", error);
    return [error];
  }
  return 1;
}

interface ClientDataProps  {
  name?: string,
  lastname?: string,
  dni?: number,
  phone?: number,
  dateIn?: string,
  dateOut?: string,
  paid?: boolean,
  price?: number,
}

export async function updateClientData( clientData: ClientDataProps, id?:string) {
  const supabase = await createClient();
  const { error } = await supabase.from('client').update(clientData).eq('id',id)
  if (error) {
    console.error("Error updating client:", error);
    return [error];
  }
  console.log('Client updated successfully')
}