import React from "react";
import Image from "next/image";

export default function Sponsors() {
  return (
    <div className="pt-10 overflow-x-hidden px-10 w-full relative   ">
      <div className="flex space-x-4 w-full justify-center  ">
        <section className="flex">
          <div className="w-36 h-36">
            <Image src="/sponsors.png" width={"150"} height={"150"} />
          </div>
          <div className="w-36 h-36 ">
            <Image src="/sponsors.png" width={"150"} height={"150"} />
          </div>
        </section>
        <section className="flex">
          <div className="w-36 h-36">
            <Image src="/sponsors.png" width={"150"} height={"150"} />
          </div>
          <div className="w-36 h-36 ">
            <Image src="/sponsors.png" width={"150"} height={"150"} />
          </div>
        </section>
        <section className="flex">
          <div className="w-26 h-36">
            <Image src="/sponsors.png" width={"150"} height={"150"} />
          </div>
          <div className="w-36 h-36 ">
            <Image src="/sponsors.png" width={"150"} height={"150"} />
          </div>
        </section>
      </div>
    </div>
  );
}
