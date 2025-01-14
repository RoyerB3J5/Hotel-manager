import { deleteClient, getClientFilterPagination } from "@/services/clients.client";
import { useClientStore } from "@/store/clientStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClientReservationsType {
  id: string;
  name: string;
  lastname: string;
  room_number: number;
  dni: number;
  phone: number;
  dateIn: string;
  dateOut: string;
  status: string;
  paid: boolean;
  price: number;
}
interface TypeRoom {
  name: string;
  price: number;
  floor: number;
}

export interface ClientWithRoom {
  client: ClientReservationsType;
  typeRoom: TypeRoom;
}

export const useClientInfo = (status: string) => {
  const [clientInfoStatus, setClientInfoStatus] = useState<
      ClientWithRoom[] | null
    >(null);
    const { setClientInfo } = useClientStore();
    const route = useRouter();
  
    const [inputClient, setInputClient] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const pageSize = 2;
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(1);
  
  
    const debounce = (func: Function, delay: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    };
  
    const getClient = async (query: string) => {
      setIsLoading(true);
      try {
        if (query.length < 3) {
          console.log("llama a los datos");
          const {data,total} = await getClientFilterPagination(
            status,
            "",
            page,
            pageSize
          );
          setClientInfoStatus(data);
          setTotalPages(Math.ceil(total/ pageSize));
          console.log("Total",data);
        } else {
          const {data,total} = await getClientFilterPagination(
            status,
            inputClient,
            page,
            pageSize
          );
          setClientInfoStatus(data);
          setTotalPages(Math.ceil(total / pageSize));
          console.log("Total",total);
        }
      } catch (e) {
        console.error("Error fetching client reservations:", e);
      } finally {
        setIsLoading(false);
      }
    };
    const handleSearch = debounce((query: string) => {
      getClient(query);
    }, 500);
  
    const seeClientInfo = (data: ClientWithRoom) => {
      setClientInfo(data);
      route.push(`/dashboard/${status === "inactive" ? "clients":"reservation"}/${data.client.id}`);
    };

    const deleteClientInfo = async (id : string) => {
      try {
        await deleteClient(id);
        getClient("");
      } catch (e) {
        console.error("Error deleting client:", e);
      }
    }
  
    
    useEffect(() => {
      handleSearch(inputClient);
    }, [inputClient, page]);

    

  return {
    clientInfoStatus,
    seeClientInfo,
    inputClient,
    setPage,
    setInputClient,
    isLoading,
    totalPages,
    page,
    deleteClientInfo

  }
};
