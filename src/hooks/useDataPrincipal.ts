import { getFloors } from "@/services/floor.client";
import { availableRoom, getRoom } from "@/services/room.client";
import { getCountType } from "@/services/type.client";
import { useClientStore } from "@/store/clientStore";

import { useTypeStore } from "@/store/typeStore";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";

type availableRoom = {
  room_count: number;
  first_floor_number: number;
};
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
export const useDataPrincipal = () => {
  const {
    countTypeData,
    countType,
    setCountTypeData,
    setCountType,
    hasFetchedOne,
    setFechedOne,
    setFloor,
  } = useTypeStore();
  const route = useRouter()
  const [availableRoomData, setAvailableRoomData] = useState<availableRoom>({
    room_count: 0,
    first_floor_number: 0,
  });
  const [roomToFloor, setRoomToFloor] = useState<Room[] | null>(null);
  const { setRoomClient, setClientInfo, setRoomAvailable } = useClientStore();

  const getRoomFloor = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const floor = e.target.value;
    if (floor == "-") {
      setRoomToFloor(null);
    } else {
      const numberFloor = parseInt(floor);
      const data = await getRoom(numberFloor);
      setRoomToFloor(data);
      console.log(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetchedOne) {
        const data = await getCountType();
        setCountTypeData(data);
        const count = data.reduce((acc, curr) => acc + curr.count, 0);
        setCountType(count);
        setFechedOne();
        console.log("llamo a la data");
      }
    };
    fetchData();
  }, [hasFetchedOne]);

  useEffect(() => {
    const fetchDataFloor = async () => {
      const data = await getFloors();
      setFloor(data);
    };
    fetchDataFloor();
  }, []);

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = e.target.value;
    if (selectedType == "-") {
      setAvailableRoomData({
        room_count: 0,
        first_floor_number: 0,
      });
    } else {
      const data = await availableRoom(selectedType);
      setAvailableRoomData(data[0]);
    }
  };

  const changeRoute = ( clientRoom: Room | null) => {
    const client = clientRoom && clientRoom.client && clientRoom.client[0] ? clientRoom.client[0] : {
      name: "",
      lastname: "",
      dni: 0,
      phone: 0,
      dateIn: "",
      dateOut: "",
      status: "active",
      price: 0,
      paid: false,
    };
    /*setRoomClient(clientRoom);*/
    setClientInfo({
      client: {
        ...(client.id && { id: client.id }),
      name: client.name || "",
      lastname: client.lastname || "",
      dni: client.dni || 0,
      phone: client.phone || 0,
      dateIn: client.dateIn || "",
      dateOut: client.dateOut || "",
      status: client.status || "active",
      price: client.price || 0,
      paid: client.paid || false,
      room_number: clientRoom ? clientRoom.number : 0,
      },
      typeRoom: {
        name: clientRoom ? clientRoom.typeroom.name : "",
        price: clientRoom ?clientRoom.typeroom.price: 0,
        floor: clientRoom ?clientRoom.floor.number: 0,
      }
    })
    if(clientRoom){
      setRoomAvailable(clientRoom.available);
    }
    route.push("/dashboard/check-in");
  }

  const [showFirstPageReservation, setShowFirstPageReservation] = useState(true);

  const changePageReservation = (clientRoom: Room) =>{
    const updateRoom = {
      ...clientRoom,
      client: [],
      available: clientRoom.available === false ? true : clientRoom.available,
    }
    setRoomClient(updateRoom);
    setShowFirstPageReservation(false);
  }
  
  return {
    countType,
    countTypeData,
    handleSelectChange,
    availableRoomData,
    roomToFloor,
    getRoomFloor,
    changeRoute,
    showFirstPageReservation,
    changePageReservation,
    setShowFirstPageReservation
  };
};
