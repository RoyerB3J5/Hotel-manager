import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HotelStore{
  name: string,
  setName: (name: string) => void
}

export const useHotelStore = create<HotelStore>()(
  persist(
    (set) => ({
      name: "",
      setName: (name) => set({ name }),
    }),
    { name: "hotel-store" }
  )
);