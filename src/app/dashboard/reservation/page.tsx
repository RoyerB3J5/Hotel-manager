"use client";
import TableInfoClient from "@/components/TableInfoClient";
import { useClientInfo } from "@/hooks/useClientInfo";

import { DateValue, Input, Pagination } from "@nextui-org/react";
import { SearchIcon } from "@/components/SearchIcon";
import { Suspense } from "react";
import { useClientStore } from "@/store/clientStore";
import { useRouter } from "next/navigation";
import Loading from "./loading";

function Reservation() {
  const {
    clientInfoStatus,
    seeClientInfo,
    inputClient,
    setPage,
    setInputClient,
    isLoading,
    totalPages,
    page,
    deleteClientInfo
  } = useClientInfo("reservation");
  const {setClientInfo} = useClientStore();
  const router = useRouter();
  const formatDate = (date: DateValue | undefined | string) => {
      if (!date) return "-";
      const jsDate = new Date(date.toString());
      return jsDate.toLocaleString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const newReservation = () => {
      setClientInfo({client: {
        id: "",
        name: "",
        lastname: "",
        dni: 0,
        phone: 0,
        dateIn: "",
        dateOut: "",
        status: "",
        price: 0,
        paid: false,
        room_number: 0,
      },
      typeRoom: {
        name: "",
        price: 0,
        floor: 0,
      },})
      router.push("reservation/new")
    }
    

  return (
    <Suspense fallback={<Loading />}>
      <section className=" relative flex rounded-xl w-full h-auto py-9 px-16 flex-col gap-6 justify-center items-center border-[2px] border-border">
        <h2 className=" text-3xl font-semibold">RESERVAS</h2>
        <div className="flex w-full justify-between items-center gap-3 ">
          <div className="w-[500px] px-3">
            <Input
              isClearable
              placeholder="Buscar cliente"
              radius="lg"
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
              size="md"
              description="Buscar por nombre o apellido"
              type="text"
              value={inputClient}
              onChange={(e) => {
                setPage(1);
                setInputClient(e.target.value);
              }}
            />
          </div>
          <div
            className=" bg-primary text-white py-2 px-5 rounded cursor-pointer"
            onClick={newReservation}
          >
            + Nueva Reserva
          </div>
        </div>
        <TableInfoClient
          clientInfoStatus={clientInfoStatus}
          seeClientInfo={seeClientInfo}
          formatDate={formatDate}
          isLoading={isLoading}
          deleteClient={deleteClientInfo}
        />
        <div className="flex flex-wrap gap-4 items-center">
          <Pagination
            initialPage={1}
            total={totalPages}
            page={page}
            variant="bordered"
            color="secondary"
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </section>
    </Suspense>
  );
}

export default Reservation;
