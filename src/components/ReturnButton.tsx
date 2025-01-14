"use client";
import { useRouter } from "next/navigation";
import React from "react";

function ReturnButton() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-start items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-6  text-primary cursor-pointer"
        onClick={() => router.back()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
    </div>
  );
}

export default ReturnButton;
