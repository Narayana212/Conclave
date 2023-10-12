import React from "react";
import { motion } from "framer-motion"; 

export default function AboutConclave() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-10"
    >
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-3xl">
          ABOUT
          <hr className="w-0" />
          CONCLAVE
        </h1>
        <div className="bg-[#F8A254] w-[100px] h-[5px] mt-1 rounded-[11px]" />
      </div>
      <div className="px-10 lg:px-16 py-5 flex flex-col mt-5">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-[#F8A254] font-bold lg:text-xl"
        >
          #BusinessAndBeyond and 3rd edition
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-[#F8A254] font-bold lg:text-xl"
        >
          #10 years of inspiria
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-white flex flex-wrap lg:text-xl mt-5"
          style={{ textWrap: "balance" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="hidden text-white lg:flex flex-wrap lg:text-xl"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="hidden text-white lg:flex flex-wrap lg:text-xl"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </motion.p>
      </div>
    </motion.div>
  );
}
