"use client";
import React, { useState } from "react";
import { login } from "./action";
import AnounceError from "@/components/AnounceError";
import { Spinner } from "@nextui-org/react";
import { useHotelStore } from "@/store/hotelStore";
import { getHotelName } from "@/services/hotel.client";
import { useLogin } from "@/hooks/useLogin";

type User = {
  email: string;
  password: string;
};

export default function Home() {
  const {error, handleSubmit, data, handleChange, isLoading} = useLogin()
  
  return (
    <section className=" flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col w-[500px] gap-9 justify-center items-center py-10 px-8 h-auto ">
        {error && <AnounceError />}
        <h2 className=" text-center text-xl flex flex-col gap-2 ">
          ADMINISTRADOR DE{" "}
          <span className="text-4xl font-semibold text-primary">HOTEL</span>
        </h2>
        <form
          className=" w-full flex flex-col gap-8 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              className=" w-full py-3 px-4 border border-border  rounded-lg focus:outline-1 focus:outline-secondary"
              value={data?.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password">Contrasena</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••••••"
              name="password"
              className=" w-full py-3 px-4 border border-border  rounded-lg focus:outline-1 focus:outline-secondary"
              value={data?.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className=" w-full bg-primary text-white  px-6 py-3 rounded-lg "
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="secondary"/> : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}
