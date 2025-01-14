"use client";

import { useRoomStore } from "@/store/roomStore";
import { Database } from "@/types/database";
import { useRouter } from "next/navigation";
import SeeRoomComponent from "./SeeRoomComponent";

type TypeRoom = Pick<
  Database["public"]["Tables"]["typeroom"]["Row"],
  'id'|"name" | "price"
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
interface TypeRoomComponentProps {
  type: TypeRoom;
  room: Room[];
  onDelete?: (name: string) => void;
  onDeleteRoom?: (id: string) => void;
}

const TypeRoomComponent: React.FC<TypeRoomComponentProps> = ({
  type,
  room,
  onDelete,
  onDeleteRoom,
}) => {
  const router = useRouter();
  const setType = useRoomStore((state) => state.setType);
  const setRoom = useRoomStore((state) => state.setRoom);

  const handleNavigate = () => {
    setType(type);
    setRoom(room);
    router.push(`/dashboard/rooms/${type.name}`);
    
  };

  return (
    <SeeRoomComponent
      type={type}
      room={room}
      onDelete={onDelete}
      onDeleteRoom={onDeleteRoom}
      handleNavigate={handleNavigate}
    />
  );
};

export default TypeRoomComponent;
