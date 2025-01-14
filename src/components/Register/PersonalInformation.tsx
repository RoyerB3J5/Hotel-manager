type ClientRoom = {
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
  room_number: number;
};
type TypeRoom = {
  name: string;
  price: number;
  floor: number;
};

interface PersonalInformationProps {
  available   : boolean;
  clientRoom: ClientRoom;
  handleChangeClientRoom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeRoom: TypeRoom;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  available,
  clientRoom,
  handleChangeClientRoom,
  typeRoom,
}) => {
  return (
    <section className=" w-full">
      <p className=" text-xl font-semibold">INFORMACION PERSONAL </p>
      <hr className=" w-full border-t-2 border-primary mt-2 mb-7" />
      <div className=" w-full grid grid-cols-3 gap-10 ">
        <div className=" flex flex-col justify-center items-start gap-2">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            className={`${
              available
                ? "border-[2px] border-border focus:outline-secondary"
                : "bg-white focus:outline-none border-b-[1px] border-primary"
            } w-full py-1 px-3  text font-medium rounded`}
            value={clientRoom.name}
            onChange={handleChangeClientRoom}
            readOnly={!available}
          />
        </div>
        <div className=" flex flex-col justify-center items-start gap-2">
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className={`${
              available
                ? "border-[2px] border-border focus:outline-secondary"
                : "bg-white focus:outline-none border-b-[1px] border-primary"
            } w-full py-1 px-3 text font-medium rounded`}
            value={clientRoom.lastname}
            onChange={handleChangeClientRoom}
            readOnly={!available}
          />
        </div>
        <div className=" flex flex-col justify-center items-start gap-2">
          <label htmlFor="phone">Telefono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`${
              available
                ? "border-[2px] border-border focus:outline-secondary"
                : "bg-white focus:outline-none border-b-[1px] border-primary"
            } w-full py-1 px-3  text font-medium rounded`}
            value={clientRoom.phone === 0 ? "" : clientRoom.phone}
            onChange={handleChangeClientRoom}
            readOnly={!available}
          />
        </div>
        <div className=" flex flex-col justify-center items-start gap-2">
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            className={`${
              available
                ? "border-[2px] border-border focus:outline-secondary"
                : "bg-white focus:outline-none border-b-[1px] border-primary"
            } w-full py-1 px-3  text font-medium rounded`}
            value={clientRoom.dni === 0 ? "" : clientRoom.dni}
            onChange={handleChangeClientRoom}
            readOnly={!available}
          />
        </div>
        <div className=" flex flex-col justify-center items-start gap-2">
          <label htmlFor="room">Cuarto:</label>
          <input
            type="number"
            id="room"
            name="room_number"
            className={`bg-white focus:outline-none border-b-[1px] border-primary w-full py-1 px-3  text font-medium rounded`}
            readOnly={true}
            value={clientRoom.room_number}
          />
        </div>
        <div className=" flex flex-col justify-center items-start gap-2">
          <label htmlFor="typeroom">Tipo de Cuarto:</label>
          <input
            type="text"
            id="typeroom"
            name="typeroom"
            className={`bg-white focus:outline-none border-b-[1px] border-primary w-full py-1 px-3  text font-medium rounded`}
            value={typeRoom.name}
            readOnly={true}
          />
        </div>
        <div className=" flex flex-col justify-center items-start gap-2">
          <label htmlFor="floor">Piso:</label>
          <input
            type="number"
            id="floor"
            name="floor"
            className={` bg-white focus:outline-none border-b-[1px] border-primary w-full py-1 px-3  text font-medium rounded`}
            value={typeRoom.floor}
            readOnly={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
