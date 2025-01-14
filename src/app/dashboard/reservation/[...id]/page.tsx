"use client";
import ClientCost from "@/components/Register/ClientCost";
import PersonalInformation from "@/components/Register/PersonalInformation";
import RangeDates from "@/components/Register/RangeDates";
import ReturnButton from "@/components/ReturnButton";
import { useSingleClient } from "@/hooks/useSingleClient";
import type { DateValue } from "@react-types/datepicker";
import { Suspense } from "react";
import Loading from "../loading";
function Reservation() {
  const { personalInfo, roomInfo, nights, handlePaidChange, value,setValue,datesReservation, handleInput, handleSaveChanges, changes, saveChangeReservation } =
    useSingleClient();


  const formatDate = (date: DateValue | undefined | string) => {
    if (!date) return "-";
    const jsDate = new Date(date.toString());
    return jsDate.toLocaleString("es-PE", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const hasRelevantChanges = () => {
    const { dateIn, price, dateOut, ...relevantChanges } = changes;
    return Object.keys(relevantChanges).length > 0;
  };
  
  return (
    <Suspense fallback={<Loading/>}>
      <section className=" relative flex flex-col justify-around items-center  rounded-xl w-full h-auto py-9  gap-10  ">
      <ReturnButton />
      <h2 className=" text-4xl font-semibold">RESERVA</h2>
      <form className=" w-full flex flex-col justify-center items-center gap-10 " onSubmit={saveChangeReservation}>
        <PersonalInformation
          available={true}
          clientRoom={personalInfo}
          typeRoom={roomInfo}
          handleChangeClientRoom={handleInput}
        />        
        <RangeDates
          dateIn={personalInfo.dateIn}
          dateOut={personalInfo.dateOut}
          available={true}
          formatDate={formatDate}
          see={false}
          value={value}
          datesReservation={datesReservation}
          setValue={setValue}
        />
        <ClientCost
          paid={personalInfo.paid}
          priceClient={personalInfo.price}
          priceRoom={roomInfo.price}
          nights={nights}
          handlePaidChange={handlePaidChange}
          see={false}
        />
        <button className=" bg-primary text-white font-semibold rounded-lg py-4 px-10 mt-4 w-[250px]" type="submit">
          ACTIVAR RESERVA
        </button>
      </form>
      {hasRelevantChanges()? (
        <button className=" bg-secondary text-white font-semibold rounded-lg py-4 px-10 mt-4 w-[250px]" onClick={handleSaveChanges}>
          GUARDAR CAMBIOS
        </button>
      ) : null}
    </section>
    </Suspense>
    
  );
}

export default Reservation;
