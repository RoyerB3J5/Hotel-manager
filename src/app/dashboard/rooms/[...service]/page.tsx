"use client";
import EditRoomComponent from "@/components/EditRoomComponent";
import ReturnButton from "@/components/ReturnButton";
import RoomButton from "@/components/RoomButton";
import { useEditRoom } from "@/hooks/useEditRoom";

const RoomEditPage = () => {
  const {
    currentType,
    handleType,
    currentRoom,
    handleRoom,
    addRoomCurrent,
    saveChangeCurrent,
    type,
    room
  } = useEditRoom();
  
  if (type === null || room === null) {
    return <div>Cargando ...</div>;
  }

  return (
    <>
      <ReturnButton />
      <EditRoomComponent currentType={currentType} currentRoom={currentRoom} handleType={handleType} handleRoom={handleRoom}/>
      <RoomButton textButton="+ Nuevo cuarto" onClick={addRoomCurrent} />
      <RoomButton textButton="Guardar" onClick={saveChangeCurrent} />
    </>
  );
};

export default RoomEditPage;
