import React from "react";

export default function TwoCircles() {
  return (
    <>
      <div
        className=" rounded-full w-[300px] h-[300px] hidden sm:flex absolute bottom-1 -right-36  lg:-left-36 "
        style={{
          background: "linear-gradient(224deg, #751D3C 13.59%, #873B38 58.57%)",
        }}
      />
      <div
        className=" rounded-full w-[150px] h-[150px] absolute  hidden sm:flex bottom-10 lg:bottom-36 right-24  lg:left-20 opacity-30 "
        style={{
          background:
            "linear-gradient(224deg, #751D3C 13.59%, #873B38 58.57%)",
        }}
      />
    </>
  );
}
