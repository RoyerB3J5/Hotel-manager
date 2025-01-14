import { Spinner } from "@nextui-org/react";

export default function Loading(){
  return (
    <section className="w-full h-screen flex justify-center items-center transition-all overflow-y-scroll">
      <Spinner color="primary"/>
    </section>
  )
}