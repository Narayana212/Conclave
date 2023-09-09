import React from "react";
import Image from "next/image";
import speakers from '../data/speakers'


export default function AllPastSpeakers() {
  return (
    <div className="flex flex-col pt-10">
      <h1 className="text-white  font-bold text-3xl ">
        PAST <hr className="w-0" />
        SPEAKERS
      </h1>
      <div className="bg-[#F8A254] w-[100px] h-[5px] mt-1 rounded-[11px]" />
      <div className="flex w-full px-10 pt-10  gap-8 justify-center flex-wrap">
        {speakers.map((speaker) => (
          <div
            className="flex  flex-col  cursor-pointer  w-[230px] h-[400px] m-5"
            key={speaker.id}
          >
            <div className="flex flex-col justify-start items-start h-[400px] w-[200px]  ">
              <div
                className="flex items-end justify-center px-5 pt-5 relative h-[270px] w-[200px] mx-auto mb-4 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #840F52 0%, #B26D43 100%)",
                  borderRadius: "3.5rem 0 0 0",
                }}
              >
                <Image
                  src={speaker.src}
                  alt="test"
                  width={"130"}
                  height={"100"}
                />
              </div>
              <h1 className="text-[#F8A254] font-bold mt-2">{speaker.name}</h1>
              <h1 className="text-white text-semibold ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
