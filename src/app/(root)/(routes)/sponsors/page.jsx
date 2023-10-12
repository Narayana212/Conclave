"use client";
import React from "react";
import Sponsors from "../../../../components/sponsors";

export default function SponsorsPage() {
  return (
    <div className="bg-[#290E13] px-8 pt-5 w-screen">
      <h1 className="text-white font-bold text-3xl">
        
        SPONSORS
      </h1>
      <div className="bg-[#F8A254] w-[100px] h-[5px] mt-1 rounded-[11px]" />
      <Sponsors />
    </div>
  );
}
