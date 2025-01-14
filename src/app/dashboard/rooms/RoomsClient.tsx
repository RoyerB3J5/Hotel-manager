"use client";

import FloorComponent from "@/components/FloorComponents";
import TypeRoomComponent from "@/components/TypeRoomComponent";
import { deleteTypeRoom } from "@/services/type.client";
import { useState } from "react";
import { Database } from "@/types/database";
import { deleteRoom } from "@/services/room.client";
import NewServiceButton from "@/components/NewServiceButton";
import { useTypeStore } from "@/store/typeStore";

type TypeRoom = Pick<
  Database["public"]["Tables"]["typeroom"]["Row"],
  "id" | "name" | "price"
>;
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

interface RoomsClientProps {
  initialTypeRoom: TypeRoom[];
  initialRoom: Room[];
}

const RoomsClient: React.FC<RoomsClientProps> = ({
  initialTypeRoom,
  initialRoom,
}) => {
  const { floor } = useTypeStore();
  const [typeRoom, setTypeRoom] = useState<TypeRoom[]>(initialTypeRoom);
  const [room, setRoom] = useState<Room[]>(initialRoom);

  const handleDelete = async (name: string) => {
    const success = await deleteTypeRoom(name);
    if (success) {
      setTypeRoom(typeRoom.filter((t) => t.name !== name));
    }
  };
  const handleDeleteRoom = async (id: string) => {
    const success = await deleteRoom(id);
    if (success) {
      setRoom(room.filter((t) => t.id !== id));
    }
  };

  return (
    <>
      <FloorComponent initialFloor={floor.length || 0} />
      {typeRoom &&
        typeRoom.map((type, index) => {
          const roomFilter =
            room?.filter((r) => r.typeroom.name === type.name) || [];
          return (
            <TypeRoomComponent
              key={index}
              type={type}
              room={roomFilter}
              onDelete={handleDelete}
              onDeleteRoom={handleDeleteRoom}
            />
          );
        })}
      <NewServiceButton />
    </>
  );
};

export default RoomsClient;
