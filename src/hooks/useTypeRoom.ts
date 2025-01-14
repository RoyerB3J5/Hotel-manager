
import { deleteTypeRoom } from "@/services/type.client";
import { Database } from "@/types/database";
import { useState } from "react";

type TypeRoom = Pick<
  Database["public"]["Tables"]["typeroom"]["Row"],
  "name" | "price"
>;
interface TypeRoomComponentProps {
  initialTypeRoom: TypeRoom[];
}
export const useTypeRoom = ({ initialTypeRoom }: TypeRoomComponentProps) => {
  const [typeRoom, setTypeRoom] = useState<TypeRoom[]>(initialTypeRoom);
  const handleDelete = async (name:string) => {
    const success = await deleteTypeRoom(name);
    if (success) {
      setTypeRoom(typeRoom.filter((t) => t.name !== name));
    }
  };
  return { typeRoom, handleDelete };
};
