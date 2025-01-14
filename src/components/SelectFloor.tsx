import React from "react";
type floorType ={
  number: number;
}
interface SelectFloorProps {
  getRoomFloor: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  floor: floorType[],
}
const SelectFloor: React.FC<SelectFloorProps> = ({ getRoomFloor, floor }) => {
  return (
    <div className=" flex justify-center items-center gap-6 text-lg">
      <p className="text-xl font-medium">PISO</p>
      <select
        name="floor"
        defaultValue={"-"}
        className=" w-12 px-1 bg-transparent text-xl font-medium border-b-2 border-secondary focus:outline-none rounded-sm py-1"
        onChange={getRoomFloor}
      >
        <option value="-"> - </option>
        {floor &&
          floor.map((data, index) => (
            <option key={index} value={data.number}>
              {data.number}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectFloor;
