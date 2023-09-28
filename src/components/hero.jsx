import React from "react";
import Heading from "./ui/heading";
import Navbar from "./navbar";
import { Button } from "./ui/button";
import Link from "next/link";
export default function Hero() {
  return (
    <>
      <div className="h-screen w-screen    bg-[#290E13]">
        <div
          className="w-screen h-full"
          style={{
            backgroundImage: `url("/banner.png")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="w-full h-full opacity-90"
            style={{ background: "#290E13" }}
          >
            <Navbar isLogin={true} />
            <div className="flex md:hidden flex-col items-center justify-center w-full h-full ">
              <Heading text={"BUSINESS"} styles="text-6xl " />
              <Heading text={"CONCLAVE"} styles="text-6xl" />
              <Heading text={"2023"} styles="text-6xl " />
              <Button className="mt-3">GET TICKETS</Button>
            </div>
            <div className="hidden md:flex items-center justify-center w-full h-full  ">
              <div className="flex flex-col items-start">
                <Heading text={"BUSINESS"} styles="text-9xl " />
                <Heading text={"CONCLAVE"} styles="text-9xl" />
                <Button className="self-center mt-3 -mr-[10rem]">GET TICKETS</Button>
              </div>
              <Heading
                text={"2023"}
                styles="text-8xl -ml-16 -mt-[2.5rem]  rotate-90 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
