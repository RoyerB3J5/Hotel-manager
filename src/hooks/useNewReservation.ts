import { useClientStore } from "@/store/clientStore";

import { useState } from "react";
import {  getRoomToReservation } from "@/services/room.client";


interface TypeRoom {
  name: string;
  price: number;
  floor: number;
  number: number;
}

export const useNewReservation = () => {
  const [roomToFloor, setRoomToFloor] = useState<TypeRoom[] | null>(null);
  const [showFirstPageReservation, setShowFirstPageReservation] = useState(true);
  const [seeClientSingle, setSeeClientSingle] = useState(false);
  const { setClientInfo } = useClientStore();
  const getRoomFloor = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const floor = e.target.value;
    if (floor == "-") {
      setRoomToFloor(null);
    } else {
      const numberFloor = parseInt(floor);
      const data = await getRoomToReservation(numberFloor);
      setRoomToFloor(data);
      console.log(data);
    }
  };
  const changePageReservation = (roomToFloor: TypeRoom) =>{
    setClientInfo({
      client: {
        name: "",
        lastname: "",
        dni: 0,
        phone: 0,
        dateIn: "",
        dateOut: "",
        status: "reservation",
        price: 0,
        paid: false,
        room_number: roomToFloor.number,
      },
      typeRoom: {
        name: roomToFloor.name,
        price: roomToFloor.price,
        floor: roomToFloor.floor,
      }
    })
    setShowFirstPageReservation(false);
    setSeeClientSingle(!seeClientSingle);
  }
  return{
    getRoomFloor,
    roomToFloor,
    showFirstPageReservation,
    setShowFirstPageReservation,
    changePageReservation,
    seeClientSingle,
  }
};
