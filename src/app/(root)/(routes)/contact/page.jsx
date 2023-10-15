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
    name: "Ria Kachhal",
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
      className="h-auto w-screen bg-[#290E13]  pl-3 overflow-hidden relative lg:pt-12 pt-6"
      initial={{ opacity: 0, y: -20 }}
      id="contact"
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap gap-x-24 pt-5 md:pt-10 mx-auto px-20 max-w-[1300px] gap-y-10 justify-center">
        {CORES.map((core, index) => (
          <motion.div
            className="flex flex-col gap-10 justify-center cursor-pointer transition-all relative ease-in-out delay-150"
            key={core.id}
            variants={itemVariants}
          >
            <div className="flex flex-col justify-center relative">
              <div className="flex relative">
                <div
                  className="flex items-end justify-center px-5 pt-5 relative w-[230px] h-[260px] md:w-[220px] md:h-[250px] lg:h-[280px] lg:w-[250px]  xl:h-[310px] xl:w-[280px] mx-auto overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, #840F52 0%, #B26D43 100%)",
                    borderRadius: "3.5rem 0 0 0",
                  }}
                >
                  <img
                    src={core.src}
                    alt="test"
                    className={`w-full   ${core.id === 1 ? "scale-100 hover:scale-[1.05] translate-y-3" : ""}  ${core.id === 2 ? "scale-[1.2] hover:scale-[1.25]" : ""} ${core.id === 3 ? "scale-[1.4] hover:scale-[1.45]" : ""} ${core.id === 4 ? "scale-100 hover:scale-[1.05] translate-y-6" : ""} ${core.id === 5 ? "scale-[1] hover:scale-[1.05] translate-y-5" : ""} overflow-hidden transition-all`}
                  />
                </div>
                <Heading
                  text={core.name}
                  transform={'rotate(90deg) translateY(-110%) translateX(100%)'}
                  styles={`opacity-80 absolute z-10 whitespace-nowrap text-2xl lg:text-[1.65rem] xl:text-[2rem] origin-top-right right-0 top-0 rotate-90 overflow-hidden`}
                />
              </div>
              <h1 className="text-[#F8A254] font-semibold text-xl mt-2">
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
