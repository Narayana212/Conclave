"use client";
import React from "react";
import Sponsors from "../../../../components/sponsors";

export default function SponsorsPage() {
  return (
    <div className="bg-[#290E13] px-8 pt-5 w-screen" id="#sponsors">
      <h1 className="text-white font-bold text-3xl">
        OUR SPONSORS
      </h1>
      <div className="bg-[#F8A254] w-[200px] h-[5px] mt-1 rounded-[11px]" />
      <Sponsors />
    </div>
  );
}
