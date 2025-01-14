import { useEffect, useRef, useState } from "react";
import { addFloor, deleteFloor } from "@/services/floor.client";

interface FloorComponentProps {
  initialFloor: number;
}

export const useFloor = ({ initialFloor }: FloorComponentProps) => {
  const [numberFloor, setNumberFloor] = useState<number>(initialFloor);
  const [inputValue, setInputValue] = useState<string>(initialFloor.toString());
  const prevNumberFloor = useRef<number>(initialFloor);

  useEffect(() => {
    const updateFloors = async () => {
      const newNumberRoom = Number(inputValue);
      if (
        !isNaN(newNumberRoom) &&
        newNumberRoom !== 0 &&
        newNumberRoom !== prevNumberFloor.current
      ) {
        prevNumberFloor.current = numberFloor;
        setNumberFloor(newNumberRoom);
        try {
          if (newNumberRoom > prevNumberFloor.current) {
            await addFloor(prevNumberFloor.current + 1, newNumberRoom);
          } else if (newNumberRoom < prevNumberFloor.current) {
            await deleteFloor(prevNumberFloor.current, newNumberRoom);
          }
          prevNumberFloor.current = newNumberRoom;
          setNumberFloor(newNumberRoom);
        } catch (error) {
          console.error("Error updating floors:", error);
        }
      }
    };

    updateFloors();
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    numberFloor,
    inputValue,
    prevNumberFloor: prevNumberFloor.current,
    handleInputChange,
  };
};
