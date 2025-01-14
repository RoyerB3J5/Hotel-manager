import React from "react";
import SelectFloor from "./SelectFloor";
import { useDataPrincipal } from "@/hooks/useDataPrincipal";
import { useTypeStore } from "@/store/typeStore";
import { useNewReservation } from "@/hooks/useNewReservation";
interface Client {
  id?: string;
  name: string;
  lastname: string;
  dni: number;
  phone: number;
  dateIn: string;
  dateOut: string;
  status: string;
  price: number;
  paid: boolean;
}
type Room = {
  id?: string;
  number: number;
  available: boolean;
  typeroom: {
    name: string;
    price: number;
  };
  floor: {
    number: number;
  };
  client: Client[];
};
interface TypeRoom {
  name: string;
  price: number;
  floor: number;
  number: number;
}

function FirstPageReservation({ onNext }: { onNext: (roomToFloor: TypeRoom) => void }  ) {
  const { getRoomFloor, roomToFloor} = useNewReservation();
  const { floor } = useTypeStore();
  return (
    <section className=" relative flex rounded-xl w-full h-auto py-9 px-16 flex-col gap-6 justify-center items-center border-[2px] border-border">
      <SelectFloor floor={floor} getRoomFloor={getRoomFloor} />
      {roomToFloor ? (
        <div className=" overflow-x-auto w-full ">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className=" py-3 w-1/4">Cuarto</th>
                <th className=" py-3 w-1/4">Tipo</th>
                <th className=" py-3 w-1/4">Accion</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {roomToFloor.map((data, index) => (
                <tr key={index} className="border-y-[1px] border-broder ">
                  <td className="py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.number}
                  </td>
                  <td className=" py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.name}
                  </td>
                  <td className=" py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    <button className="text-white bg-primary py-2 px-4 rounded-md" onClick={() => onNext(data)}>
                      Reservar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p> Ningun cuarto Disponible</p>
      )}
    </section>
  );
}

export default FirstPageReservation;
