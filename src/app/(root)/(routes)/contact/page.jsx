"use client";
import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Image from "next/image";
import Heading from "../../../../components/ui/heading";
import TwoCircles from "../../../../components/ui/two-circles";
import ContactForm from "../../../../components/contact-form";

const CORES = [
  {
    id: 1,
    name: "Sadhika Uppal",
    designation: "Chairperson",
    src: "/coe10.png",
  },
  {
    id: 2,
    name: "Ria Kachhal"    ,
    designation: "President",
    src: "/core11.png",
  },
  {
    id: 3,
    name: "Mansi Kulshreshtha",
    designation: "Vice President",
    src: "/core7.png",
  },
  {
    id: 4,
    name: "Rushali Aggarwal",
    designation: "Managing Director",
    src: "/core12.png",
  },
  {
    id: 5,
    name: "Kushaan Sethi",
    designation: "Executive Director",
    src: "/core13.png",
  },
];

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="h-auto w-screen bg-[#290E13] pl-16 pr-[12rem] overflow-hidden relative lg:pt-12 pt-6"
      initial={{ opacity: 0, y: -20 }}
      id="contact"
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap   gap-x-10 gap-y-10 max-w-screen">
        {CORES.map((core, index) => (
          <motion.div
            className="flex flex-col  gap-10 justify-center cursor-pointer transition-all relative ease-in-out delay-150"
            key={core.id}
            variants={itemVariants}
          >
            <div className="flex flex-col lg:ml-[3rem] lg:mr-[3rem] mr-[2rem] ml-[2rem] justify-center relative ">
            <div className="flex ">
              <div
                className="flex items-end justify-center px-5 pt-5 relative h-[300px] w-[200px] mx-auto mb-4 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #840F52 0%, #B26D43 100%)",
                  borderRadius: "3.5rem 0 0 0",
                }}
              >
                <img
                  src={core.src}
                  alt="test"

                  
                  className={`w-full   ${core.id===1?"scale-125 hover:scale-[1.35]":""}  ${core.id===2?"scale-[1.35] hover:scale-[1.45]":""} ${core.id===3?"scale-[1.50] hover:scale-[1.60]":""} ${core.id===4?"scale-[1.35] hover:scale-[1.45]":""} ${core.id===5?"scale-[1.25] hover:scale-[1.35]":""} overflow-hidden transition-all`}
                />
              </div>

              <Heading
                text={core.name}
                styles={`opacity-60 absolute whitespace-nowrap  text-4xl rotate-90 ${core.id===1?"top-[7.5rem] left-[5.5rem]":""}  ${core.id===2?"top-[5.5rem] left-[6.5rem]":""} ${core.id===3?"top-[7.5rem] text-[1.75rem] left-[4.5rem]":""} ${core.id===4?"top-[6.5rem] text-[1.75rem] left-[5.5rem]":""} ${core.id===5?"top-[7rem] left-[5.5rem]":""} overflow-hidden`}
              />
            </div>
            <h1 className="text-[#F8A254] font-bold -mr-16 text-xl">
              {core.designation}
            </h1>
            </div>
          </motion.div>
        ))}
      </div>
      <ContactForm />
      <TwoCircles />
    </motion.div>
  );
}
