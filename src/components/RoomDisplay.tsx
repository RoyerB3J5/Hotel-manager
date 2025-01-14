import SelectFloor from "./SelectFloor";

type floorType ={
  number: number;
}
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
interface RoomDisplayProps {
  getRoomFloor: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  floor: floorType[],
  roomToFloor:Room[] | null;
  changeRoute: (clientRoom: Room) => void
}

const RoomDisplay: React.FC<RoomDisplayProps> = ({
  getRoomFloor,
  floor,
  roomToFloor,
  changeRoute
}) => {
  return (
    <section className=" relative flex flex-col justify-around items-center rounded-xl w-full h-auto py-9 px-14 gap-8  border-border border-[2px]">
      <h3 className="text-2xl font-semibold">GESTIÓN DE HABITACIONES</h3>
        <SelectFloor floor={floor} getRoomFloor={getRoomFloor} />
        <div
          className={`grid ${
            roomToFloor && roomToFloor.length > 0 ? "grid-cols-5" : "justify-center items-center"
          } gap-8 w-full`}
        >
          {roomToFloor && roomToFloor.length > 0 ? (
            roomToFloor.map((room) =>
              (
                <div
                  key={room.id}
                  onClick={() => changeRoute(room)}
                  className={`flex flex-col justify-center items-center py-5 ${room.available ? "bg-primary" : "bg-red-800"} 
                 text-white rounded font-medium w-full hover:cursor-pointer`}
                >
                  <p className={`${room.available ? "text-secondary" : "text-red-300"} font-normal`}>{room.number}</p>
                  <p>{room.typeroom.name}</p>
                </div>
              ) 
            )
          ) : (
            <div className="w-full">
              <p className="text-center">No hay cuartos</p>
            </div>
            
          )}
        </div>
      </section>
  )
}

export default RoomDisplay