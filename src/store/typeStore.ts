
import { create } from "zustand";
import { persist } from "zustand/middleware";
type countType = {
  name: string;
  count: number;
};
type floorType ={
  number: number;
}
interface TypeStore{
  floor: floorType[]
  countTypeData: countType[];
  countType: number;
  hasFetchedOne: boolean;
  setFloor: (floor: floorType[]) => void;
  setFechedOne: () => void;
  setCountTypeData: (countTypeData: countType[]) => void;
  setCountType: (countType: number) => void;
}

export const useTypeStore = create<TypeStore>()(
  persist((set) => ({
    floor: [],
    countTypeData: [],
    countType: 0,
    hasFetchedOne: false,
    setFloor: (floor) =>set({floor}),
    setCountTypeData:(countTypeData) => set({countTypeData}),
    setCountType:(countType) => set({countType  }),
    setFechedOne: () => set({hasFetchedOne:true})
  }),{
    name:"type-store"
  })
)