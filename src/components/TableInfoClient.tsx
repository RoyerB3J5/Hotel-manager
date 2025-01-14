import { ClientWithRoom } from "@/hooks/useClientInfo";
import { Spinner } from "@nextui-org/react";
import DeleteClientButton from "./DeleteClientButton";
interface TableInfoClientProps {
  clientInfoStatus: ClientWithRoom[] | null;
  seeClientInfo: (data: ClientWithRoom) => void;
  formatDate: (date: string) => string;
  isLoading: boolean;
  deleteClient: (id: string) => Promise<void>;
}
const TableInfoClient: React.FC<TableInfoClientProps> = ({
  clientInfoStatus,
  seeClientInfo,
  formatDate,
  isLoading,
  deleteClient
}) => {
  return (
    <table className="w-full ">
      <thead>
        <tr>
          <th className=" py-3 ">Nombre</th>
          <th className=" py-3 ">Cuarto</th>
          <th className=" py-3 ">Fecha</th>
          <th className=" py-3 ">Pagado</th>
          <th className=" py-3 ">Accion</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {isLoading ? (
          <tr>
            <td colSpan={5}>
              <Spinner color="primary" />
            </td>
          </tr>
        ) : clientInfoStatus && clientInfoStatus.length > 0 ? (
          clientInfoStatus.map(
            (data, index) =>
              data.client && (
                <tr key={index} className="border-y-[1px] border-secondary ">
                  <td className="py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.client.name + " " + data.client.lastname}
                  </td>
                  <td className=" py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.client.room_number}
                  </td>
                  <td className=" py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    {formatDate(data.client.dateIn) +
                      " - " +
                      formatDate(data.client.dateOut)}
                  </td>
                  <td className=" py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.client.paid ? "Si" : "No"}
                  </td>
                  <td className=" py-3 whitespace-nowrap overflow-hidden text-ellipsis flex justify-center items-center space-x-2 min-w-[100px]">
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-primary hover:cursor-pointer"
                      onClick={() => seeClientInfo(data)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <DeleteClientButton deleteClient={() =>deleteClient(data.client.id)} />
                  </td>
                </tr>
              )
          )
        ) : (
          <tr>
            <td colSpan={5}>No se encontraron clientes</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableInfoClient;
