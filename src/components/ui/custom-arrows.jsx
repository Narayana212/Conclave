import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react"

const NextArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <>
      <div onClick={onClick} className="absolute top-52 right-0 cursor-pointer">
        <Image alt="right" src="/right-arrow.png" width={"15"} height={"15"} />
      </div>
    </>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <>
      <div onClick={onClick} className="absolute top-52 left-0 cursor-pointer">
        <Image src="/left-arrow.png" alt="left" width={"15"} height={"15"} />
      </div>
    </>
  );
};

const PrevEventArrow = (props) => {
  const { onClick } = props;
  return (
    <>
      <div
        className={`rounded-full px-2 py-2 -left-5  lg:px-3 lg:py-3 absolute lg:-left-8 cursor-pointer top-[5rem] lg:top-14  `}
        style={{
          background:
            "linear-gradient(#751D3C,#873B38)",
         }}
        onClick={onClick}
      >
         <ChevronLeft className="text-white" size={"20px"}/>
      </div>
    </>
  );
};

const NextEventArrow = (props) => {
  const { className, onClick } = props;
  return (
    <>
      <div onClick={onClick} className="absolute  -right-5 lg:-right-8 top-[5rem] cursor-pointer rounded-full px-2 py-2  lg:px-3 lg:py-3 lg:top-14 "  style={{
          background:
            "linear-gradient(#751D3C,#873B38)",
         }}>
        <ChevronRight  className="text-white" size={"20px"}/>
      </div>
    </>
  );
};

export { NextArrow, PrevArrow, NextEventArrow, PrevEventArrow };
