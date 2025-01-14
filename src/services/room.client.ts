import { createClient } from "@/utils/supabase/client";
interface Client {
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
}
interface Room {
  id: number;
  number: number;
  available: boolean;
  typeroom: {
    name: string;
    price: number;
  };
  floor: {
    number: number;
  };
  client: Client[];
}
export async function deleteRoom(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("room").delete().eq("id", id);
  if (error) {
    console.error("Error deleting room:", error);
    return 0;
  }
  return 1;
}

export async function availableRoom(type: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_available_rooms_count", {
    typeroom_name: type,
  });
  if (error) {
    console.error("Error fetching available room:", error);
    return [error];
  }
  return data;
}

export async function getRoom(floor: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("room")
    .select('id,number,available,typeroom(name,price),floor!inner(number),client(id,name,lastname,dni,phone,dateIn,dateOut,price,status,paid)')
    .eq('floor.number', floor)
  if (error) {
    console.error("Error fetching room:", error);
    return [error];
  }

  
  const filteredData = data.map((room: Room) => {
    if (!room.client || room.client.length === 0) {
      return room;
    } else {
      const activeClients = room.client.filter((client: Client) => client.status === "active");
      return { ...room, client: activeClients };
    }
  }).filter((room: Room) => room.client && room.client.length > 0 || !room.client || room.client.length === 0);
  return filteredData
}


interface roomReservation {
  number: number;
  typeroom: {
    name: string;
    price: number;
  };
  floor:{
    number: number;
  }
}
export async function getRoomToReservation(floor: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("room")
    .select('number,typeroom(name,price),floor!inner(number)')
    .eq('floor.number', floor)
  if (error) {
    console.error("Error fetching room:", error);
    return [error];
  }
  const returnData = data.map((room : roomReservation)=>{
    return {
      name: room.typeroom.name,
      price: room.typeroom.price,
      floor: room.floor.number,
      number: room.number
    }
  })

  return returnData
}