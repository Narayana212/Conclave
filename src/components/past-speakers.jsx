import React from "react";

import Swiper from './swiper'
export default function PastSpeakersSlider() {
  return (
    <div className="pt-10 flex flex-col">
      <h1 className="text-white  font-bold text-3xl ">
        PAST <hr className="w-0" />
        SPEAKERS
      </h1>
      <div className="bg-[#F8A254] w-[100px] h-[5px] mt-1 rounded-[11px]" />
      <Swiper/>
    </div>
  );
}
