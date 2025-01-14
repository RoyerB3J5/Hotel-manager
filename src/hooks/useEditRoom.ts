import { upsertRoom, upsertTypeRoom } from "@/services/type.client";
import { useRoomStore } from "@/store/roomStore";
import { Database } from "@/types/database";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
export const useEditRoom = () => {
  const params = useParams();
  const service = Array.isArray(params.service)
      ? params.service[0]
      : params.service;

  const type = useRoomStore((state) => state.type);
  const room = useRoomStore((state) => state.room);
  const setType = useRoomStore((state) => state.setType);
  const setRoom = useRoomStore((state) => state.setRoom);
  const [currentType, setCurrentType] = useState<TypeRoom | null>(type);
  const [currentRoom, setCurrentRoom] = useState<Room[] | null>(room);

  const router = useRouter();
  useEffect(() => {
    if (type) {
      setCurrentType(type);
    }
    if (room) {
      setCurrentRoom(room);
    }
  }, [type, room]);

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentType((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]:
          name === "price" && value === ""
            ? null
            : name === "price"
            ? parseInt(value) || 0
            : value,
      };
    });
  };

  const handleRoom = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCurrentRoom((prev) => {
      if (!prev) return null;
      const updatedRoom = [...prev];
      if (name === "floor") {
        const floorNumber = value === "" ? "" : parseInt(value);
        updatedRoom[index] = {
          ...updatedRoom[index],
          floor: { number: floorNumber === "" ? 0 : floorNumber },
        };
      } else {
        const roomNumber = value === "" ? "" : parseInt(value);
        updatedRoom[index] = {
          ...updatedRoom[index],
          [name]: roomNumber === "" ? 0 : roomNumber,
        };
      }
      return updatedRoom;
    });
  };
  useEffect(() => {
    if (service === "nuevo") {
      setCurrentType({ id: "", name: "", price: 0 });
      setCurrentRoom([]);
      setType({ id: "", name: "", price: 0 });
      setRoom([]);
    }
  }, [service]);


  const addRoomCurrent = () => {
    if (!type) return;
    const newRoom = {
      floor: { number: 0 },
      number: 0,
      id: "",
      typeroom: { name: type.name || "" },
    };
    setCurrentRoom((prev) => {
      if (!prev) return null;
      return [...prev, newRoom];
    });
  };

  const saveChangeCurrent = async () => {
    if (!currentType) return;

    const differentType =
      currentType &&
      type &&
      (currentType.name !== type.name || currentType.price !== type.price)
        ? currentType
        : null;

    const differentRooms =
      currentRoom &&
      room &&
      currentRoom.reduce((acc, current, index) => {
        const original = room[index];
        if (
          !original ||
          current.number !== original.number ||
          current.floor.number !== original.floor.number
        ) {
          acc.push(current);
        }
        return acc;
      }, [] as Room[]);

    let typeId = currentType.id;

    if (differentType) {
      if (differentType.name && differentType.price) {
        try {
          const typeData = await upsertTypeRoom(
            currentType.id,
            differentType.name,
            differentType.price
          );
          console.log("Actualizacion de tipo de cuarto", typeData);
          if (typeData && typeData.length > 0) {
            typeId = typeData[0].id;
          }
        } catch (error) {
          console.error("Error al actualizar el tipo de cuarto", error);
        }
      }
    }

    if (differentRooms) {
      const formattedRooms = differentRooms.map((room) => ({
        id: room.id || "",
        number: room.number,
        floor: room.floor.number,
        typeId: typeId,
      }));

      try {
        const roomData = await upsertRoom(formattedRooms);
        if (roomData) {
          console.log("Actualizacion de cuartos correctamente", formattedRooms);
        }
      } catch (error) {
        console.error("Error al actualizar los cuartos", error);
      }
    }

    console.log("typeId", typeId);
    console.log("differentType", differentType);
    console.log("differentRooms", differentRooms);
    console.log("Tipos corriente", currentType);
    router.push("/dashboard/rooms");
  };

  return {
    currentType,
    handleType,
    currentRoom,
    handleRoom,
    addRoomCurrent,
    saveChangeCurrent,
    type,
    room

  };
};
