import { create } from "zustand";
import { persist } from "zustand/middleware";
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
interface ClientReservationsType {
  id?: string;
  name: string;
  lastname: string;
  room_number: number;
  dni: number;
  phone: number;
  dateIn: string;
  dateOut: string;
  status: string;
  paid: boolean;
  price: number;
}
interface TypeRoom {
  name: string;
  price: number;
  floor: number;
}

interface ClientWithRoom {
  client: ClientReservationsType;
  typeRoom: TypeRoom;
}

type Room = {
  id?: string;
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
};

interface ClientStore {
  roomClient: Room;
  clientInfo: ClientWithRoom;
  roomAvailable: boolean;
  setRoomClient: (roomClient: Room) => void;
  setClientInfo: (clientInfo: ClientWithRoom) => void;
  resetClientInfo: () => void;
  setRoomAvailable: (roomAvailable: boolean) => void;
}

const initialClientInfo = {
  client: {
    id: "",
    name: "",
    lastname: "",
    dni: 0,
    phone: 0,
    dateIn: "",
    dateOut: "",
    status: "",
    price: 0,
    paid: false,
    room_number: 0,
  },
  typeRoom: {
    name: "",
    price: 0,
    floor: 0,
  },
};

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      roomClient: {
        number: 0,
        available: true,
        typeroom: {
          name: "",
          price: 0,
        },
        floor: {
          number: 0,
        },
        client: [],
      },
      setRoomClient: (roomClient) => set({ roomClient }),
      clientInfo: initialClientInfo,
      resetClientInfo: () => set({ clientInfo: initialClientInfo }),
      setClientInfo: (clientInfo) => set({ clientInfo }),
      roomAvailable: true,
      setRoomAvailable: (roomAvailable) => set({ roomAvailable }),
    }),
    { name: "client-store" }
  )
);
