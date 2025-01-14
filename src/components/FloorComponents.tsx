'use client'
import { useFloor } from "@/hooks/useFloor";
interface FloorComponentProps {
  initialFloor: number;
}
const FloorComponent = ({ initialFloor }: FloorComponentProps) => {
  const {
    inputValue,
    prevNumberFloor,
    handleInputChange,
  } = useFloor({initialFloor});

  return (
    <section className="relative flex justify-around items-center bg-white rounded-xl w-full h-auto py-4 px-6 sm:px-16 gap-6 border-border border-[2px]">
      <h3 className="text-lg font-normal">N Pisos</h3>
      <input
        type="number"
        placeholder="Pisos"
        className="w-[100px] py-1 px-1 rounded-md focus:outline-1 focus:outline-secondary text-center text-lg no-arrows border-[2px] border-border"
        value={inputValue}
        onChange={handleInputChange}
      />

    </section>
  );
};

export default FloorComponent;