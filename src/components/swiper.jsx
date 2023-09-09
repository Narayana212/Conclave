import React from "react";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SPEAKERS = [
  {
    id: 1,
    name: "RAJINIKANTH",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ",
    src: "/test.png",
  },
  {
    id: 2,
    name: "RAJINIKANTH",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ",
    src: "/test.png",
  },
  {
    id: 3,
    name: "RAJINIKANTH",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ",
    src: "/test.png",
  },
  {
    id: 4,
    name: "RAJINIKANTH",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    src: "/test.png",
  },
  {
    id: 5,
    name: "RAJINIKANTH",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    src: "/test.png",
  },
  {
    id: 6,
    name: "RAJINIKANTH",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ",
    src: "/test.png",
  },
];

export default function Swiper() {
  var settings = {
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
    centerPadding: "10px",
  };

  return (
    <div className="px-4 lg:px-20">
      <Slider {...settings} className="pt-10 px-5 lg:px-10">
        {SPEAKERS.map((core) => (
          <div className="flex flex-col cursor-pointer " key={core.id}>
            <div className="flex flex-col justify-start items-start h-[400px] w-[200px]">
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
              <h1 className="text-[#F8A254] font-bold">{core.name}</h1>
              <p className="text-white">{core.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
