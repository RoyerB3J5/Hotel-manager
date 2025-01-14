import { Database } from "@/types/database";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type TypeRoom = Pick<
  Database["public"]["Tables"]["typeroom"]["Row"],
  "id" | "name" | "price"
>;
type Room = {
  floor: { number: number };
  number: number;
  id: string ;
  typeroom: { name: string };
};


interface RoomStore {
  type: TypeRoom | null;
  room: Room[] | null;
  setType: (type: TypeRoom) => void;
  setRoom: (room: Room[]) => void;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      type: null,
      room: null,
      setType: (type) => set({ type }),
      setRoom: (room) => set({ room }),      
    }),
    {
      name: "room-store",
    }
  )
);
