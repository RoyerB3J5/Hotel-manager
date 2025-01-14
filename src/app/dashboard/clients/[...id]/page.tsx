"use client";
import ClientCost from "@/components/Register/ClientCost";
import PersonalInformation from "@/components/Register/PersonalInformation";
import RangeDates from "@/components/Register/RangeDates";
import ReturnButton from "@/components/ReturnButton";
import { useSingleClient } from "@/hooks/useSingleClient";

import { DateValue } from "@react-types/datepicker";
import Loading from "../../loading";
import { Suspense } from "react";


function SingleClientInfo() {
  const{personalInfo,roomInfo,nights}=useSingleClient()
  
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
  
  return (
    <Suspense fallback={<Loading/>}>
    <section className=" relative flex flex-col justify-around items-center  rounded-xl w-full h-auto py-9  gap-10  ">
      <ReturnButton />
      <h2 className=" text-4xl font-semibold">CLIENTE</h2>
      <section className=" w-full flex flex-col justify-center items-center gap-10 ">
        <PersonalInformation
          available={false}
          clientRoom={personalInfo}
          typeRoom={roomInfo}
        />
        <RangeDates
          dateIn={personalInfo.dateIn}
          dateOut={personalInfo.dateOut}
          available={false}
          formatDate={formatDate}
          see={true}
        />
        <ClientCost
          paid={personalInfo.paid}
          priceClient={personalInfo.price}
          priceRoom={roomInfo.price}
          nights={nights}
          see={true}
        />
      </section>
    </section>
    </Suspense>
  );
}

export default SingleClientInfo;
