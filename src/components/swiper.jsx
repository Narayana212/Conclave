import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import speakers from '../data/speakers'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {NextArrow,PrevArrow} from "../components/ui/custom-arrows"



export default function Swiper() {
  var settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplaySpeed: 1500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="px-4 lg:px-20">
      <Slider {...settings} className="pt-10 px-5 lg:px-10 ">
        {speakers.map((core) => (
          <div
            className="flex  justify-center items-center ml-10 "
            key={core.id}
          >
            <div className="flex flex-col justify-center items-start h-[400px] w-[200px]">
              <div
                className="flex items-center justify-center relative h-[270px] w-[200px] overflow-hidden rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, #840F52 0%, #B26D43 100%)",
                  borderRadius: "3.5rem 0 0 0",
                }}
              >
                <Image src={core.src} alt="speaker" width={130} height={100} />
              </div>
              <h1 className="text-[#F8A254] font-bold mt-2">{core.name}</h1>
              <p className="text-white">{core.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
