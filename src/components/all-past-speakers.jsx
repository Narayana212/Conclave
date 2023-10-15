"use client"
import React from "react";
import { motion } from "framer-motion"; 
import Image from "next/image";
import speakers from '../data/speakers'

export default function AllPastSpeakers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col pt-10"
    >
      <h1 className="text-white font-bold text-3xl">
        OUR SPEAKERS
      </h1>
      <div className="bg-[#F8A254] w-[200px] h-[5px] mt-1 rounded-[11px]" />
      <div className="flex w-full lg:px-10 pt-10 lg:gap-x-[6rem] justify-center flex-wrap">
        {speakers.map((speaker) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col cursor-pointer w-[230px] h-[400px] m-5"
            key={speaker.id}
          >
            <div className="flex flex-col justify-start items-start h-[400px] w-[200px]">
              <div
                className="flex items-end justify-center px-5 pt-5 relative h-[270px] w-[200px] mx-auto mb-4 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #840F52 0%, #B26D43 100%)",
                  borderRadius: "3.5rem 0 0 0",
                }}
              >
                <img
                  src={speaker.src}
                  alt="test"
                  className={`${speaker.id===2?"scale-[1.75] hover:scale-[1.85]":""} scale-125  cursor-pointer hover:scale-[1.35] transition-all`}
                  
                />
              </div>
              <h1 className="text-[#F8A254] font-bold text-sm mt-2">{speaker.name}</h1>
              <h1 className="text-white text-semibold text-sm">
                {speaker.description}
              </h1>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}