import { Database } from "@/types/database";

type TypeRoom = Pick<
  Database["public"]["Tables"]["typeroom"]["Row"],
  "name" | "price" | "id"
>;
type Room = {
  floor: { number: number };
  number: number;
  id: string;
  typeroom: { name: string };
};
function EditRoomComponent({
  currentType,
  handleType,
  currentRoom,
  handleRoom,
}: {
  currentType: TypeRoom | null;
  handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentRoom: Room[] | null;
  handleRoom: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (!currentType || !currentRoom) {
    return <div>Cargando ...</div>;
  }
  return (
    <section className="relative flex rounded-lg w-full h-auto py-10 px-6 sm:px-20 flex-col gap-6 my-3 border-[2px] border-border">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <input
          type="text"
          name="name"
          className=" w-[170px] py-1 px-2 focus:outline-secondary  text-xl font-semibold rounded-lg border-[2px] border-border"
          value={currentType?.name || ""}
          onChange={handleType}
        />
        <div className="flex gap-3 justify-center items-center">
          <p>Precio (S/.)</p>
          <input
            type="number"
            name="price"
            placeholder="Precio"
            className=" w-[70px] py-1 px-2 rounded-lg focus:outline-secondary border-[2px] border-border no-arrows"
            value={
              currentType?.price !== null && currentType?.price !== undefined
                ? currentType.price
                : ""
            }
            onChange={handleType}
          />
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="flex justify-around items-center px-4 py-4  rounded-sm font-semibold">
          <div className="size-6"></div>
          <p className="text-lg ">Cuarto</p>
          <p className="text-lg ">Piso</p>
        </div>
        <ul className="px-0">
          {currentRoom &&
            currentRoom.map((r, index) => (
              <li
                className="flex justify-around items-center px-4 py-4 border-t-[1px] border-border ml-5"
                key={index}
              >
                <div className=" size-6"></div>
                
                <input
                  type="number"
                  name="number"
                  className={` text-center w-[80px] py-1  focus:outline-secondary rounded-lg border-[2px] border-border px-2 no-arrows`}
                  value={r.number === 0 ? "" : r.number}
                  onChange={(e) => handleRoom(index, e)}
                />
                <input
                  type="number"
                  name="floor"
                  className={` text-center w-[60px] py-1   focus:outline-secondary rounded-lg border-[2px] border-border px-2 no-arrows`}
                  value={r.floor.number === 0 ? "" : r.floor.number}
                  onChange={(e) => handleRoom(index, e)}
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default EditRoomComponent;
