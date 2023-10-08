import React from "react";
import Image from "next/image";
import Heading from "../../../../components/ui/heading";

import ContactForm from "../../../../components/contact-form";

const CORES = [
  {
    id: 1,
    name: "NAME",
    designation: "DESIGNATION ",
    src: "/test.png",
  },
  {
    id: 2,
    name: "NAME",
    designation: "DESIGNATION ",
    src: "/test.png",
  },
  {
    id: 3,
    name: "NAME",
    designation: "DESIGNATION ",
    src: "/test.png",
  },
  {
    id: 4,
    name: "NAME",
    designation: "DESIGNATION ",
    src: "/test.png",
  },
];

export default function ContactPage() {
  return (
    <div className="h-auto w-screen bg-[#290E13]  pl-16 pr-[12rem] overflow-hidden relative lg:pt-12  pt-6">
      <div className="flex flex-wrap justify-center sm:justify-between gap-x-36  gap-y-16  max-w-screen ">
        {CORES.map((core, index) => (
          <div
            className="flex flex-col cursor-pointer  transition-all ease-in-out delay-150  hover:scale-110   "
            key={core.id}
          >
            <div className="flex">
              <div
                className=" flex items-end justify-center px-5 pt-5 relative h-[300px] w-[200px] mx-auto mb-4 overflow-hidden"
                style={{
                  background:
                    " linear-gradient(180deg, #840F52 0%, #B26D43 100%)",
                  borderRadius: "3.5rem 0 0 0",
                }}
              >
                <Image src={core.src} alt="test" width={"130"} height={"100"} />
              </div>
              <Heading
                text={core.name}
                styles=" opacity-60 text-4xl rotate-90 -ml-52 -mt-20 overflow-hidden"
              />
            </div>
            <h1 className="text-[#F8A254] font-bold -mr-16 text-xl ">
              {core.designation}
            </h1>
          </div>
        ))}
      </div>
      <ContactForm />
      <div
        className=" rounded-full w-[300px] h-[300px] hidden sm:flex absolute bottom-1 -right-36  lg:-left-36 "
        style={{
          background: "linear-gradient(224deg, #751D3C 13.59%, #873B38 58.57%)",
        }}
      />
      <div
        className=" rounded-full w-[150px] h-[150px] absolute  hidden sm:flex bottom-10 lg:bottom-36 right-24  lg:left-20 opacity-30 "
        style={{
          background: "linear-gradient(224deg, #751D3C 13.59%, #873B38 58.57%);",
        }}
      />
      
    </div>
  );
}
