"use client";

import { SearchIcon } from "@/components/SearchIcon";
import TableInfoClient from "@/components/TableInfoClient";
import { useClientInfo } from "@/hooks/useClientInfo";
import { Input, Pagination } from "@nextui-org/react";
import Loading from "../loading";
import { Suspense } from "react";

function Clients() {
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
  } = useClientInfo("inactive");

  const formatDate = (date: string) => {
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

  return (
    <Suspense fallback={<Loading/>}>
      <section className=" relative flex rounded-xl w-full h-auto py-9 px-16 flex-col gap-6 justify-center items-center border-[2px] border-border">
        <h2 className=" text-3xl font-semibold">CLIENTES</h2>
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

export default Clients;
