import React from "react";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "./ui/heading";

const SPEAKERS = [
  {
    id: 1,
    name: "RAJINIKANTH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    src: "/test.png",
  },
  {
    id: 2,
    name: "RAJINIKANTH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    src: "/test.png",
  },
  {
    id: 3,
    name: "RAJINIKANTH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    src: "/test.png",
  },
  {
    id: 4,
    name: "RAJINIKANTH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    src: "/test.png",
  },
  {
    id: 5,
    name: "RAJINIKANTH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    src: "/test.png",
  },
  {
    id: 6,
    name: "RAJINIKANTH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
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
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplaySpeed: 1500,
  };

  return (
    <div className="px-4 lg:px-20">
      <Slider {...settings} className="pt-10 px-10 flex gap-5">
        {SPEAKERS.map((core, index) => (
          <div className="flex flex-col cursor-pointer m-5" key={core.id}>
            <div className="flex flex-col justify-center items-center px-4 m-5">
              <div
                className="flex items-end justify-center px-5 pt-5 relative h-[250px] w-[200px] mx-auto mb-4 overflow-hidden rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, #840F52 0%, #B26D43 100%)",
                    borderRadius: "3.5rem 0 0 0",
                }}
              >
                <Image src={core.src} alt="test" width={130} height={100} />
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