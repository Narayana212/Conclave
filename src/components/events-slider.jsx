"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import events from "../data/events";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextEventArrow, PrevEventArrow } from "../components/ui/custom-arrows";
import Image from "next/image";
import CircleType from 'circletype';
import styles from "./styles/event-circle.module.css";
export default function EventSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const bgCircleRef = useRef(null);
  const bottomWrapper = useRef(null);
  useEffect(() => {
    const circleText = new CircleType(document.getElementById('circleText'));
    const resizeStuff = () => {
      circleText.radius(circleText.element.offsetWidth / 2);
      if (!bgCircleRef.current) return;
      if (window.innerWidth >= 768) {
        bgCircleRef.current.style.width = `${circleText.element.offsetWidth - 100}px`;
        bgCircleRef.current.style.borderRadius = `${circleText.element.offsetWidth}px`;
      } else if (window.innerWidth >= 640) {
        bgCircleRef.current.style.width = `660px`;
        bgCircleRef.current.style.borderRadius = `660px`;
      } else {
        bgCircleRef.current.style.width = `580px`;
        bgCircleRef.current.style.borderRadius = `580px`;
      }
      // bgCircleRef.current.style.height = `${circleText.element.offsetWidth - 100}px`;

    };

    resizeStuff();

    setTimeout(() => {
      bottomWrapper.current.style.opacity = 1;
    }, 500);


    window.addEventListener('resize', function updateRadius() {
      if (window.innerWidth > 1024) {
        resizeStuff();
      }
    });

    return () => {
      window.removeEventListener('resize', function updateRadius() {
        resizeStuff();
      });
    }
  }, []);

  var settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextEventArrow />,
    prevArrow: <PrevEventArrow />,
    afterChange: (index) => {
      setActiveSlideIndex(index);
    },
  };

  return (
    <div className="relative lg:p-24 lg:pb-0 bg-[#290E13] transition-all ">
      <Slider {...settings} className="pt-10 mx-auto max-w-[95%] sm:max-w-[80%] lg:max-w-[80%] px-8 lg:px-16">
        {events.map((event) => (
          <div
            className="flex flex-col gap-3 justify-center items-center"
            key={event.id}
          >
            <div className="flex gap-x-4 gap-y-1 items-baseline flex-col sm:flex-row">
              <p className="text-[#F8A254] font-bold text-lg sm:text-xl lg:text-2xl">{event.title}</p>
              <p className="text-white font-bold sm:text-lg lg:text-xl">{event.time}</p>
            </div>
            <div className="mt-3">
              <p className="text-white text-sm lg:text-base">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="relative h-[330px] md:h-[440px] mt-10 overflow-y-clip opacity-0 transition-all duration-500 ease-in" ref={bottomWrapper}>
        <div className="absolute border-white border overflow-x-hidden aspect-square top-[5.8rem] left-1/2 -translate-x-1/2 p-12 sm:min-w-0 sm:w-[660px] md:min-w-[750px] lg:min-w-[835px]" ref={bgCircleRef}>
          <div className={`w-full h-full bg-red-600 rounded-full ${styles.coloredCircle}`}>
            <Image
              src="/logo-main.png"
              width="250"
              height="200"
              alt="logo"
              className="mx-auto top-16 md:top-28 relative w-44 sm:w-52 md:w-64"
            />
          </div>
        </div>
        <div className={`flex flex-wrap gap-8 pt-10 text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal tracking-widest relative ${styles.circleText}`} id="circleText">
       
          <p
            className={`${activeSlideIndex === 0 ? "text-[#F8A254]" : "text-white"
              }`}
          >
            Keynote Session&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 1 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Off - Beat Roundtable&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 2 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Internship fairs&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 3 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Canop Conversations&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 4 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Workshops&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 5 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Corporate Gala&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 0 ? "text-[#F8A254]" : "text-white"
              }`}
          >
            Keynote Session&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 1 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Off - Beat Roundtable&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 2 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Internship fairs&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 3 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Canop Conversations&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 4 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Workshops&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            className={`${activeSlideIndex === 5 ? "text-[#F8A254]" : "text-white"
              } `}
          >
            Corporate Gala&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </div>
    </div>
  );
}
