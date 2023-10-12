import React from "react";
import { motion } from "framer-motion"; 
import Swiper from "./swiper";

export default function PastSpeakersSlider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-10 flex flex-col"
    >
      <h1 className="text-white font-bold text-3xl">
        PAST
        <hr className="w-0" />
        SPEAKERS
      </h1>
      <div className="bg-[#F8A254] w-[100px] h-[5px] mt-1 rounded-[11px]" />
      <Swiper />
    </motion.div>
  );
}
