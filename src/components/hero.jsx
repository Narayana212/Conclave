import React from "react";
import Heading from "./ui/heading";
import Navbar from "./navbar";
import { Button } from "./ui/button";
import Link from "next/link";
export default function Hero({ isLogin }) {
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
          <div className="w-full h-full opacity-90 bg-[#290E13]">
            <Navbar isLogin={isLogin} />
            <div className="flex md:hidden flex-col items-center justify-center w-full h-full ">
              <Heading text={"BUSINESS"} styles="text-6xl " />
              <Heading text={"CONCLAVE"} styles="text-6xl" />
              <Heading text={"2023"} styles="text-6xl " />
              <Link href="/tickets">
                <Button className={` ${isLogin ? "flex" : "hidden"}  mt-3 `}>
                  GET TICKETS
                </Button>
              </Link>
            </div>
            <div className="hidden md:flex justify-center items-center w-full h-full  ">
              <div className="flex flex-col items-start ">
                <Heading text={"BUSINESS"} styles="text-8xl " />
                <Heading text={"CONCLAVE"} styles="text-8xl" />
                <Link href="/tickets" className="self-center -mr-[8rem]">
                  <Button
                    className={`${
                      isLogin ? "" : "hidden"
                    }  mt-3`}
                  >
                    GET TICKETS
                  </Button>
                </Link>
              </div>
              <Heading
                text={"2023"}
                styles={` ${
                  isLogin ? "-mt-[2rem]" : "mt-2"
                } text-7xl -ml-12  rotate-90 `}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
