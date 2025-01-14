import { login } from "@/app/action";
import { getHotelName } from "@/services/hotel.client";
import { useHotelStore } from "@/store/hotelStore";
import { useState } from "react";
type User = {
  email: string;
  password: string;
};
export const useLogin = () => {
  const [data, setData] = useState<User>({
      email: "",
      password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {name, setName} = useHotelStore()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
  
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
  
      const result = await login(formData);
  
      if (!result.success) {
        setError(result.message);
        setTimeout(() => {
          setError(null);
          setIsLoading(false);
        }, 3000);
      } else {
        if(!name){
          const hotel = await getHotelName()
          if(hotel !== ""){
            setName(hotel)
          }
        }
        window.location.href = "/dashboard";
      }
    };

    return {
      error,
      handleSubmit,
      data,
      handleChange,
      isLoading
    }
}