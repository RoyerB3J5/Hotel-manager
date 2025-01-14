import { Radio, RadioGroup } from "@nextui-org/react";
import React from "react";

interface ClientCostProps {
  paid: boolean;
  nights: number;
  priceClient: number;
  priceRoom: number;
  handlePaidChange? : (e: React.ChangeEvent<HTMLInputElement>) => void;
  see?: boolean
}
const ClientCost: React.FC<ClientCostProps> = ({
  paid,
  nights,
  priceClient,
  priceRoom,
  handlePaidChange,
  see
}) => {
  return (
    <section className="w-full">
      <p className=" text-xl font-semibold">COSTOS </p>
      <hr className=" w-full border-t-2 border-primary mt-2 mb-7" />
      <section className="flex justify-around items-center gap-2 text-lg ">
        <div className="flex flex-col justify-center items-center gap-4 w-[400px] text-xl">
          <p>Costo por noche: S/. {priceRoom}</p>
          <ul className="list-disc">
            <li>Noches: {nights}</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 w-[400px] bg-primary rounded-lg py-6 text-white">
          <p className="text-xl  ">
            Total:{" "}
            <span className="font-semibold text-secondary">
              S/. {priceClient}
            </span>
          </p>
          <p className="text-lg font-semibold mt-2">PAGADO?</p>

          <RadioGroup
            value={paid.toString()}
            onChange={handlePaidChange}
            orientation="horizontal"
            color="secondary"
            size="lg"
            classNames={{
              wrapper: "flex justify-center items-center gap-6",
              base: "text-lg text-white",
            }}
            isDisabled={see}
          >
            <Radio value="true" classNames={{ label: "text-white" }}>
              Si
            </Radio>
            <Radio value="false" classNames={{ label: "text-white" }}>
              No
            </Radio>
          </RadioGroup>
        </div>
      </section>
    </section>
  );
};

export default ClientCost;
