
import { getFloors } from "@/services/floor.server";
import { getRoom } from "@/services/room.server";
import { getTypeRoom } from "@/services/type.server";
import { Database } from "@/types/database";
import RoomsClient from "./RoomsClient";
import { Suspense } from "react";

type TypeRoom = Pick<Database['public']['Tables']['typeroom']['Row'], 'id'|'name' | 'price'>;
type Room = {
  floor: {
    number: number;
  };
  number: number;
  id: string;
  typeroom: {
    name: string;
  };
};

const RoomsLoading = () => (
  <div className="loading-screen">
    <p>Cargando...</p>

  </div>
);

const Rooms = async () => {
  const initialTypeRoom: TypeRoom[] = await getTypeRoom();
  const initialRoom: Room[] = await getRoom();

  return (
    <Suspense fallback={<RoomsLoading />}>
      <RoomsClient
        initialTypeRoom={initialTypeRoom}
        initialRoom={initialRoom}
      />
    </Suspense>
  );
};

export default Rooms;