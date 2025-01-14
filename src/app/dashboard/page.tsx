"use client";
import RoomDisplay from "@/components/RoomDisplay";
import TypeRoomAvailable from "@/components/TypeRoomAvailable";
import TypeRoomSearch from "@/components/TypeRoomSearch";
import { useDataPrincipal } from "@/hooks/useDataPrincipal";
import { useTypeStore } from "@/store/typeStore";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import { getHotelName } from "@/services/hotel.client";
import { useHotelStore } from "@/store/hotelStore";

function Dashboard() {
  const {
    countType,
    countTypeData,
    handleSelectChange,
    availableRoomData,
    roomToFloor,
    getRoomFloor,
    changeRoute,
  } = useDataPrincipal();
  const { name } = useHotelStore();
  const { floor } = useTypeStore();
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full flex justify-center items-center gap-4">
        <h1 className="text-3xl my-5">
          Hotel <span className="font-semibold text-primary">{name}</span>
        </h1>
      </div>

      <div className=" flex justify-center items-center gap-8">
        <TypeRoomAvailable
          countType={countType}
          countTypeData={countTypeData}
        />
        <TypeRoomSearch
          handleSelectChange={handleSelectChange}
          countTypeData={countTypeData}
          availableRoomData={availableRoomData}
        />
      </div>

      <RoomDisplay
        getRoomFloor={getRoomFloor}
        floor={floor}
        roomToFloor={roomToFloor}
        changeRoute={changeRoute}
      />
    </Suspense>
  );
}

export default Dashboard;
