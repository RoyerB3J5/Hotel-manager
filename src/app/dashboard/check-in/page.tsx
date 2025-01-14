'use client'
import ClientCost from "@/components/Register/ClientCost";
import PersonalInformation from "@/components/Register/PersonalInformation";
import RangeDates from "@/components/Register/RangeDates";
import ReturnButton from "@/components/ReturnButton";
import { useSingleClient } from "@/hooks/useSingleClient";
import { useClientStore } from "@/store/clientStore";
import { DateValue } from "@nextui-org/react";
import Loading from "../loading";
import { Suspense } from "react";

function CheckIn() {
  const {
    personalInfo,
    roomInfo,
    nights,
    handlePaidChange,
    value,
    setValue,
    datesReservation,
    handleInput,
    submitCheckIn,
    handleSaveChanges, changes
  } = useSingleClient();
  const {roomAvailable} = useClientStore()
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
  const seeInfo = () => {
    console.log("Info personal", personalInfo);
    console.log("Info room", roomInfo);
  };
  return (
    <Suspense fallback={<Loading/>}>
      <section className=" relative flex flex-col justify-around items-center  rounded-xl w-full h-auto py-9  gap-10  ">
      <ReturnButton />
      <h2 className=" text-4xl font-semibold">CHECK-IN</h2>
      <form
        className=" w-full flex flex-col justify-center items-center gap-10 "
        onSubmit={submitCheckIn}
      >
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
        <button
          className=" bg-primary text-white font-semibold rounded-lg py-4 px-10 mt-4 w-[250px]"
          type="submit"
        >
          {roomAvailable?"REGISTRAR CLIENTE":"LIBERAR CUARTO"}
        </button>
      </form>
      {!roomAvailable && hasRelevantChanges()? (
        <button className=" bg-secondary text-white font-semibold rounded-lg py-4 px-10 mt-4 w-[250px]" onClick={handleSaveChanges}>
          GUARDAR CAMBIOS
        </button>
      ) : null}
      <button className="text-primary font-semibold" onClick={seeInfo}>
        Ver Informacion
      </button>
    </section>
    </Suspense>
    
  );
}

export default CheckIn;
