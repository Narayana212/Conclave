"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import events from "../data/events";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextEventArrow, PrevEventArrow } from "../components/ui/custom-arrows";
import Image from "next/image";

export default function EventSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  var settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <NextEventArrow />,
    prevArrow: <PrevEventArrow />,
    afterChange: (index) => {
      setActiveSlideIndex(index);
    },
  };

  return (
    <div className="relative lg:p-24 bg-[#290E13] transition-all ">
      <Slider {...settings} className="pt-10 px-5 lg:px-10 ">
        {events.map((event) => (
          <div
            className="flex flex-col gap-3 justify-center items-center"
            key={event.id}
          >
            <div className="flex gap-3 items-center">
              <p className="text-[#F8A254] font-bold">{event.title}</p>
              <p className="text-white font-bold text-sm">{event.time}</p>
            </div>
            <div>
              <p className="text-white text-sm lg:text-base">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex flex-wrap gap-8 pt-10">
        <p
          className={`${
            activeSlideIndex === 0 ? "text-[#F8A254]" : "text-white"
          }`}
        >
          Speaker Session
        </p>
        <p
          className={`${
            activeSlideIndex === 1 ? "text-[#F8A254]" : "text-white"
          } `}
        >
          Off - Beat Roundtable
        </p>
        <p
          className={`${
            activeSlideIndex === 2 ? "text-[#F8A254]" : "text-white"
          } `}
        >
          Internship fairs
        </p>
        <p
          className={`${
            activeSlideIndex === 3 ? "text-[#F8A254]" : "text-white"
          } `}
        >
          Canop Conversations
        </p>
        <p
          className={`${
            activeSlideIndex === 4 ? "text-[#F8A254]" : "text-white"
          } `}
        >
          Workshops
        </p>
        <p
          className={`${
            activeSlideIndex === 5 ? "text-[#F8A254]" : "text-white"
          } `}
        >
         Corporate Gala
        </p>
      </div>
    </div>
  );
}
