
import { Database } from "@/types/database";


type TypeRoom = Pick<
  Database["public"]["Tables"]["typeroom"]["Row"],
  "name" | "price"
>;
type Room = {
  floor: {
    number: number;
  };
  number: number;
  id: string;
  typeroom: {
    name: string;
  };
};
interface SeeRoomComponentProps {
  type: TypeRoom;
  room: Room[] ;
  onDelete?: (name: string) => void;
  onDeleteRoom?: (id: string) => void;
  handleNavigate?: () => void;
}

const SeeRoomComponent: React.FC<SeeRoomComponentProps> = ({
  type,
  room,
  onDelete,
  onDeleteRoom,
  handleNavigate
}) => {

  const handleDelete = async () => {
    if (onDelete) await onDelete(type.name || "");
  };
  const handleDeleteRoom = async (id: string) => {
    if (onDeleteRoom) await onDeleteRoom(id);
  };

  return (
    <section className="relative flex bg-white rounded-lg w-full h-auto py-10 px-6 sm:px-20 flex-col gap-6 my-3 border-border border-[2px]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <input
          type="text"
          name="name"
          className="  w-[150px] py-1 px-3 focus:outline-none border-b-2 border-secondary text-xl font-semibold rounded "
          value={type.name || ""}
          readOnly
        />
        <div className="flex gap-3 justify-center items-center">
          <p>Precio (S/.)</p>
          <input
            type="number"
            name="price"
            placeholder="Precio"
            className=" w-[60px] py-1 px-3 rounded focus:outline-none border-b-2 border-secondary   font-semibold "
            value={type.price || 0}
            readOnly
          
          />
        </div>
        <div className="flex gap-4 justify-center items-center"> 
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 bg-primary text-white font-bold rounded-md p-1 cursor-pointer"
                onClick={handleNavigate}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 bg-red-800 text-white font-bold rounded-md p-1 cursor-pointer"
                name="deleteService"
                onClick={handleDelete}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="flex justify-around items-center px-4 py-4 rounded-sm font-semibold">
          <div className="size-6 "></div>
          <p className="text-lg ">Cuarto</p>
          <p className="text-lg ">Piso</p>
        </div>
        <ul className="px-0">
          {room &&
            room.map((r, index) => (
              <li
                className="flex justify-around items-center px-4 pr-6 py-4 border-t-[1px] border-border"
                key={index}
              >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-red-800 hover:cursor-pointer"
                    onClick={() => handleDeleteRoom(r.id ? r.id : '')}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                <input
                  type="number"
                  name="number"
                  className={` w-[70px] py-1  focus:outline-none pl-6 ml-4`}
                  value={r.number === 0 ? "" : r.number}
                  readOnly
                />
                <input
                  type="number"
                  name="floor"
                  className={`  w-[50px] py-1 pl-6  focus:outline-none`}
                  value={r.floor.number === 0 ? "" : r.floor.number}
                  readOnly
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default SeeRoomComponent;
