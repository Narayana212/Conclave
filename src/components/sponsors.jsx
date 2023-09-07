"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
const sponsors = [
  { id: 1, src: "/sponsors.png", name: "random" },
  { id: 2, src: "/sponsors.png", name: "random" },
  { id: 3, src: "/sponsors.png", name: "random" },
  { id: 4, src: "/sponsors.png", name: "random" },
];
export default function Sponsors() {
  return (
    <div className="pt-10  overflow-hidden px-10 w-full relative p-20    ">
      <div className="flex space-x-4 w-full justify-center   ">
        <Marquee>
          {sponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={"150"}
                height={"150"}
              />
            </div>
          ))}
          {sponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={"150"}
                height={"150"}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
