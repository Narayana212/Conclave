"use client";
import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Heading from "./ui/heading";
import Navbar from "./navbar";
import { Button } from "./ui/button";

import Link from "next/link";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  GitPullRequest,
  LocateFixed,
  LocateIcon,
  LocateOffIcon,
  MapPin,
  Pin,
  PinOff,
} from "lucide-react";

export default function Hero({ isLogin }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="h-screen w-screen bg-[#290E13]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div
        className="w-screen h-full"
        style={{
          backgroundImage: `url("/banner1.JPG")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full opacity-[0.85] bg-[#290E13]">
          <Navbar isLogin={isLogin} />
          <motion.div
            className="flex md:hidden flex-col items-center justify-center -mt-10 w-full h-full "
            variants={textVariants}
          >
            <Heading text={"BUSINESS"} styles="text-5xl xs:text-6xl " />
            <Heading text={"CONCLAVE"} styles="text-5xl xs:text-6xl" />
            <Heading text={"2023"} styles="text-5xl xs:text-6xl " />
            <div className="flex gap-4 self-center "> <p
                style={{
                  background:
                    "linear-gradient(161deg, #AC016A -11.7%, #FBA150 101.48%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="font-bold text-sm flex self-center items-center gap-2 mt-2"
              >
                <CalendarDays
                  className="text-white  w-5 h-5"
                />
                28-10-2023
              </p>
              <p style={{
                  background:
                    "linear-gradient(161deg, #AC016A -11.7%, #FBA150 101.48%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }} className=" font-bold  text-sm flex self-end items-center gap-2 mt-2">
                <MapPin className="text-white w-5 h-5"  />
                SNIoE, Delhi NCR
              </p></div>
            <Link href="/tickets">
              <motion.div
                className={` ${isLogin ? "flex" : "hidden"}  mt-5 `}
                variants={buttonVariants}
              >
                <Button>GET TICKETS</Button>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div
            className="hidden md:flex justify-center items-center w-full h-full"
            variants={textVariants}
          >
            <div className="flex flex-col items-start">
              <Heading text={"BUSINESS"} styles="md:text-8xl lg:text-9xl" />
              <Heading text={"CONCLAVE"} styles="md:text-8xl lg:text-9xl" />
             <div className="flex gap-4 self-center ml-20"> <p
                style={{
                  background:
                    "linear-gradient(161deg, #AC016A -11.7%, #FBA150 101.48%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="font-bold flex self-center items-center gap-2 mt-2"
              >
                <CalendarDays
                  className="text-white"
                />
                28-10-2023
              </p>
              <p style={{
                  background:
                    "linear-gradient(161deg, #AC016A -11.7%, #FBA150 101.48%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }} className=" font-bold flex self-end items-start gap-2 mt-2">
                <MapPin className="text-white"  />
                SNIoE, Delhi NCR
              </p></div>
              <Link href="/tickets" className="self-center -mr-[8rem]">
                <motion.div
                  className={`${isLogin ? "" : "hidden"}  mt-5`}
                  variants={buttonVariants}
                >
                  <Button>GET TICKETS</Button>
                </motion.div>
              </Link>
            </div>
            <motion.div variants={textVariants}>
              <Heading
                text={"2023"}
                styles={` ${
                  isLogin ? "-mt-[5rem]" : "-mt-[4.5rem]"
                } md:text-7xl  lg:text-8xl -ml-14 rotate-90`}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
