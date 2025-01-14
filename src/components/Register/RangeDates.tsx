import { getLocalTimeZone, parseDateTime, today } from "@internationalized/date";
import { DateRangePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
type DateReservation = {
  dateIn: string;
  dateOut: string;
  status: string;
  room: {
    number: number;
  };
};
interface RangeDatesProps {
  dateIn: string;
  dateOut: string;
  available: boolean;
  value?: RangeValue<DateValue> | null;
  setValue?: (value: RangeValue<DateValue> | null) => void;
  datesReservation?: DateReservation[] | null;
  formatDate: (date: DateValue | undefined | string) => string;
  see: boolean;
}
const RangeDates: React.FC<RangeDatesProps> = ({
  dateIn,
  dateOut,
  available,
  value,
  setValue,
  datesReservation,
  formatDate,
  see,
}) => {

  return (
    <section className=" w-full">
      <p className=" text-xl font-semibold">FECHAS </p>
      <hr className=" w-full border-t-2 border-primary mt-2 mb-7" />
      <section className=" flex justify-around items-center gap-2">
        <div className=" flex flex-col justify-center items-start gap-4 w-1/2">
          <div className=" flex justify-around items-center gap-4 w-full">
            <div className=" flex flex-col justify-center items-center gap-4 p-3">
              <p>Fecha de entrada</p>
              <p>{formatDate(dateIn) || "-"}</p>
            </div>
            <div className=" flex flex-col justify-center items-center gap-4 p-3">
              <p>Fecha de salida</p>
              <p>{formatDate(dateOut) || "-"}</p>
            </div>
          </div>
          {available ? (
            <div className="flex justify-center items-center w-full px-8">
              <I18nProvider locale="es">
                <DateRangePicker
                  hideTimeZone // Permite seleccionar la zona horaria y horas
                  minValue={today(getLocalTimeZone())}
                  visibleMonths={2}
                  granularity="minute"
                  variant="bordered"
                  selectorButtonPlacement="start"
                  value={value}
                  onChange={(val) => setValue && setValue(val)}
                  hourCycle={12}
                  label="Fechas de inicio y salida"
                />
              </I18nProvider>
            </div>
          ) : null}
        </div>
        {!see ? (
          <div className=" w-1/2 flex flex-col justify-start items-center gap-3">
            <div className=" flex flex-col justify-center items-center ">
              <p className="text-lg font-medium">Fechas Reservadas</p>
              <p className=" text-sm text-gray-600">(Desde - Hasta)</p>
            </div>

            <ul className=" flex flex-col justify-start items-center gap-2 text-red-800 font-semibold">
              {datesReservation ? (
                datesReservation.map((date, index) => (
                  <li key={index}>
                    {formatDate(date.dateIn)} - {formatDate(date.dateOut)}
                  </li>
                ))
              ) : (
                <li>No hay reservas</li>
              )}
            </ul>
          </div>
        ) : null}
      </section>
    </section>
  );
};

export default RangeDates;
function parseISO(dateIn: string) {
  throw new Error("Function not implemented.");
}

