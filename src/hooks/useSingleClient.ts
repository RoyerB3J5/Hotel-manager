import { useClientStore } from "@/store/clientStore";
import { useEffect, useState } from "react";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import {
  insertNewClient,
  updateClient,
  updateClientData,
  updateReservation,
} from "@/services/clients.client";
import {  useRouter } from "next/navigation";


type DateReservation = {
  dateIn: string;
  dateOut: string;
  status: string;
  room: {
    number: number;
  };
};
interface ClientDataProps {
  name?: string;
  lastname?: string;
  dni?: number;
  phone?: number;
  dateIn?: string;
  dateOut?: string;
  paid?: boolean;
  price?: number;
}

export const useSingleClient = (roomAvailable?: boolean) => {
  const { clientInfo } = useClientStore();
  const [personalInfo, setPersonalInfo] = useState(clientInfo.client);
  const [changes, setChanges] = useState<ClientDataProps>({});
  const [roomInfo, setRoomInfo] = useState(clientInfo.typeRoom);
  const [nights, setNights] = useState<number>(0);


  const [value, setValue] = useState<RangeValue<DateValue> | null>(() => {
    if (personalInfo.dateIn && personalInfo.dateOut) {
      return {
        start: parseAbsoluteToLocal(personalInfo.dateIn),
        end: parseAbsoluteToLocal(personalInfo.dateOut),
      };
    }
    return null;
  });

  const [datesReservation, setDateReservation] = useState<
    DateReservation[] | null
  >(null);

  useEffect(() => {
    if (personalInfo.dateIn && personalInfo.dateOut) {
      const calculatedNights = calculateNights(
        personalInfo.dateIn,
        personalInfo.dateOut
      );
      setNights(calculatedNights);

      setPersonalInfo((prev) => ({
        ...prev,
        price: roomInfo.price * calculatedNights,
      }));
      setChanges((prev) => ({
        ...prev,
        price: roomInfo.price * calculatedNights,
      }));
    }
  }, [personalInfo.dateIn, personalInfo.dateOut]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "dni" || name === "phone") {
      const valueNumber = value === "" ? 0 : parseInt(value);
      if (!isNaN(valueNumber)) {
        setPersonalInfo((prev) => ({
          ...prev,
          [name]: valueNumber,
        }));
        setChanges((prev) => ({
          ...prev,
          [name]: valueNumber,
        }));
      }
    } else {
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
      setChanges((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateClientData(changes, personalInfo.id);
      setChanges({});
      console.log("Se actualizo correctamente el usuario");
    } catch (e) {
      console.error("Error al actualizar el usuario", e);
    }
  };

  const createClientReservation = async () => {
    try {
      await insertNewClient(personalInfo);
      console.log("Se creo una nueva reserva");
      route.push("dashboard/reservation");
    } catch (e) {
      console.error("Error al crear la reserva", e);
    }
  };

  const calculateNights = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate <= startDate) return 0;

    let nights = 0;
    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
      if (currentDate <= endDate) {
        nights++;
      }
    }

    return nights;
  };

  const handlePaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      paid: value === "true",
    }));
  };

  const handleDateChange = (value: RangeValue<DateValue> | null) => {
    if (value) {
      const dateIn =
        value.start?.toDate(getLocalTimeZone()).toISOString().slice(0, 16) +
        ":00Z";

      const dateOut =
        value.end?.toDate(getLocalTimeZone()).toISOString().slice(0, 16) +
        ":00Z";

      setPersonalInfo((prev) => ({
        ...prev,
        dateIn: dateIn || "",
        dateOut: dateOut || "",
      }));
      setChanges((prev) => ({
        ...prev,
        dateIn: dateIn || "",
        dateOut: dateOut || "",
      }));
    }
  };
  const route = useRouter();
  const saveChangeReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateReservation(personalInfo.paid, personalInfo.id);
      console.log("Se actualizo correctamente la reserva");
      route.push("dashboard/reservation");
    } catch (e) {
      console.error("Error al actualizar la reserva", e);
    }
  };

  const submitCheckIn = async () => {
    try {
      if (roomAvailable) {
        await insertNewClient(personalInfo);
        console.log("Se realizo el check-in correctamente");
      } else {
        if (personalInfo.id) {
          await updateClient(personalInfo.id, personalInfo.paid);
          console.log("Cliente libero el cuarto");
        } else {
          console.error("Error: personalInfo.id es undefined");
        }
      }
    } catch (e) {
      console.error("Error al realizar el check-in", e);
    }
  };

  useEffect(() => {
    if (value) {
      handleDateChange(value);
    }
  }, [value]);


  /*useEffect(() => {
    const seeDate = async () => {
      const data = await getReservesDate(personalInfo.room_number);
      setDateReservation(data);
      console.log(data);
    };
    seeDate();
  }, []);*/

  return {
    personalInfo,
    roomInfo,
    nights,
    handlePaidChange,
    value,
    setValue,
    datesReservation,
    handleInput,
    handleSaveChanges,
    changes,
    saveChangeReservation,
    setPersonalInfo,
    setRoomInfo,
    createClientReservation,
    submitCheckIn,
  };
};
