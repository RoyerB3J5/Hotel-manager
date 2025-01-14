import { availableRoom } from "@/services/room.client";
import React from "react";
type countType = {
  name: string;
  count: number;
};
type availableRoom = {
  room_count: number;
  first_floor_number: number;
};
function TypeRoomSearch({
  handleSelectChange,
  countTypeData,
  availableRoomData,
}: {
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  countTypeData: countType[];
  availableRoomData: availableRoom;
}) {
  return (
    <section className=" relative flex flex-col justify-around items-center bg-primary rounded-xl w-full py-9 px-12 gap-6 h-full text-white text-lg ">
      <div className=" flex flex-col gap-1 justify-center items-center">
        <p className=" text-xl  font-semibold mb-4 border-b-2 pb-2 border-secondary">Tipo de cuarto</p>
        <select name="search-type"  defaultValue={"-"} onChange={handleSelectChange} className="focus:outline-none bg-inherit  ">
          <option value="-" className="text-black">-</option>
          {countTypeData &&
            countTypeData.map((data, index) => (
              <option key={index} value={data.name} className=" text-black">
                {data.name}
              </option>
            ))}
        </select>
      </div>
      <div className=" flex w-full justify-around items-center">
        <div className=" flex flex-col gap-1 justify-center items-center">
          <p >Disponibles</p>
          <p className="text-secondary">{availableRoomData.room_count}</p>
        </div>
        <div className=" flex flex-col gap-1 justify-center items-center">
          <p>Piso</p>
          <p className="text-secondary">{availableRoomData.first_floor_number || 0}</p>
        </div>
      </div>
    </section>
  );
}

export default TypeRoomSearch;
