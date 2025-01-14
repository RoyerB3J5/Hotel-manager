"use client";
import FirstPageReservation from "@/components/FirstPageReservation";
import ClientCost from "@/components/Register/ClientCost";
import PersonalInformation from "@/components/Register/PersonalInformation";
import RangeDates from "@/components/Register/RangeDates";
import ReturnButton from "@/components/ReturnButton";
import { useNewReservation } from "@/hooks/useNewReservation";
import { useSingleClient } from "@/hooks/useSingleClient";
import { useClientStore } from "@/store/clientStore";
import { DateValue } from "@nextui-org/react";
import { Suspense, useEffect } from "react";
import Loading from "../loading";

function New() {
  const {
    showFirstPageReservation,
    changePageReservation,
    setShowFirstPageReservation,
    seeClientSingle,
  } = useNewReservation();
  const changePage = () => {
    setShowFirstPageReservation(true);
  };
  const {
    personalInfo,
    roomInfo,
    nights,
    handlePaidChange,
    value,
    setValue,
    datesReservation,
    handleInput,
    setPersonalInfo,
    setRoomInfo,
    createClientReservation
  } = useSingleClient();
  const {clientInfo} = useClientStore()
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
  const seeInfo = () => {
    console.log("Info personal", personalInfo);
    console.log("Info room", roomInfo);
    console.log("cliente de store", clientInfo);
  }
  useEffect(()=>{
      setPersonalInfo(clientInfo.client)
      setRoomInfo(clientInfo.typeRoom)
    },[seeClientSingle])
  return (
    <Suspense fallback={<Loading/>}>
      {showFirstPageReservation ? (
        <>
          <ReturnButton />
          <FirstPageReservation onNext={changePageReservation} />
        </>
      ) : (
        <section className=" relative flex flex-col justify-around items-center  rounded-xl w-full h-auto py-9  gap-10  ">
          <div className="w-full flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6  text-primary cursor-pointer"
              onClick={changePage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </div>
          <h2 className=" text-4xl font-semibold">RESERVA</h2>
          <form
            className=" w-full flex flex-col justify-center items-center gap-10 "
            onSubmit={createClientReservation}
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
              RESERVAR
            </button>
          </form>
          <button className="text-primary font-semibold" onClick={seeInfo}>
            Ver Informacion
          </button>
        </section>
      )}
    </Suspense>
  );
}

export default New;
