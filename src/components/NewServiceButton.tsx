"use client";
import { useRouter } from "next/navigation";

function NewServiceButton() {
  const route = useRouter();
  const handleNewService = () => {
    route.push("/dashboard/rooms/nuevo");
  };
  return (
    <button
      className="w-full bg-primary text-white py-3 rounded-lg font-medium text-lg"
      onClick={handleNewService}
    >
      + Nuevo Tipo
    </button>
  );
}

export default NewServiceButton;
