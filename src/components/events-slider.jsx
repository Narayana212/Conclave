"use client"
import React from 'react'
import Slider from "react-slick";
import events from '../data/events'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {NextEventArrow,PrevEventArrow} from "../components/ui/custom-arrows"

export default function EventSlider() {

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
  };
  return (
    <div className='p-5 lg:p-24 bg-[#290E13] '>
      <Slider {...settings} className="pt-10 px-5 lg:px-10 ">
        {events.map((event) => (
          <div
            className='flex flex-col gap-3 justify-center items-center'
            key={event.id}
          >
            <div className='flex gap-3 items-center'>
              <p className='text-[#F8A254] font-bold'>{event.title}</p>

              <p className='text-white font-bold text-sm'>{event.time}</p>
            </div>
            <div>
              <p className='text-white text-sm lg:text-base'>{event.description}</p>
            </div>

           
          </div>
        ))}
      </Slider>
    </div>
  )
}
