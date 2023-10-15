"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import events from "../data/events";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextEventArrow, PrevEventArrow } from "../components/ui/custom-arrows";
import Image from "next/image";
import CircleType from 'circletype';
import ReactCurvedText from 'react-curved-text';
import styles from "./styles/event-circle.module.css";
import useWindowDimensions from "../helpers/useWindowDimensions";


export default function EventSlider() {
  const pointCoords = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { height, width } = useWindowDimensions();
  const bgCircleRef = useRef(null);
  const bottomWrapper = useRef(null);
  const sliderRef = useRef(null);
  const countRef = useRef(0);
  const [rotateAngle, setRotateAngle] = useState(80.5);
  function updateCoords() {
    pointCoords.current = [];
    document.querySelectorAll('.text-block').forEach((el, i) => {
      const textElem = el.querySelector('svg text');
      const textElemBox = textElem.getBoundingClientRect();
      pointCoords.current[i] = textElemBox;
    });
  }

  useEffect(() => {

    // let isRotating = false;
    // let startAngle = 0;
    // let currentAngle = 0;

    // const rotatableDiv = document.getElementById('rotatable-div');

    // rotatableDiv.addEventListener('touchstart', (e) => {
    //   isRotating = true;
    //   startAngle = Math.atan2(
    //     e.touches[0].clientY - rotatableDiv.offsetTop - rotatableDiv.clientHeight / 2,
    //     e.touches[0].clientX - rotatableDiv.offsetLeft - rotatableDiv.clientWidth / 2
    //   );
    // });

    // rotatableDiv.addEventListener('touchmove', (e) => {
    //   if (isRotating) {
    //     const newAngle = Math.atan2(
    //       e.touches[0].clientY - rotatableDiv.offsetTop - rotatableDiv.clientHeight / 2,
    //       e.touches[0].clientX - rotatableDiv.offsetLeft - rotatableDiv.clientWidth / 2
    //     );
    //     const angleDiff = newAngle - startAngle;
    //     currentAngle += angleDiff;
    //     rotatableDiv.style.transform = `rotate(-${currentAngle}rad)`;
    //     startAngle = newAngle;
    //   }
    // });

    // rotatableDiv.addEventListener('touchend', () => {
    //   isRotating = false;
    // });


    updateCoords();
    const interval = setInterval(() => {
      updateCoords();
    }, 100);
    window.addEventListener('click', handleEventClick);

    return () => {
      window.removeEventListener('click', handleEventClick);
      clearInterval(interval);

    }

  }, []);

  useEffect(() => {
    setRotateAngle(80.5 - activeSlideIndex * 30);
  }, [activeSlideIndex]);

  const handleEventClick = (e) => {
    pointCoords.current.forEach((coords, i) => {
      if (e.clientX >= coords.left && e.clientX <= coords.right && e.clientY >= coords.top && e.clientY <= coords.bottom) {
        sliderRef.current.slickGoTo(i);
      }
    });
  }

  var settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    centerPadding: "100px",
    nextArrow: <NextEventArrow />,
    prevArrow: <PrevEventArrow />,
    beforeChange: (index, newIndex) => {
      setActiveSlideIndex(newIndex);
    },
  };

  return (
    <div className="relative lg:p-24 lg:pb-0 bg-[#290E13] transition-all ">
      <Slider ref={
        slider => sliderRef.current = slider
      } {...settings} className="pt-10 mx-auto max-w-[95%] sm:max-w-[80%] lg:max-w-[80%] px-8 lg:px-16">
        {events.concat(events).map((event) => (
          <div
            className="flex flex-col gap-3 justify-center items-center px-2"
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
      <div className="relative h-[280px] sm:h-[400px] opacity-1 transition-all duration-500 ease-in overflow-y-clip tracking-widest" ref={bottomWrapper}>
        <div className="absolute border-white border overflow-x-hidden aspect-square top-[6rem] sm:top-[8rem] left-1/2 -translate-x-1/2 p-8 sm:p-12  min-w-[570px] sm:min-w-[820px] rounded-full" ref={bgCircleRef}>
          <div className={`w-full h-full rounded-full ${styles.coloredCircle}`}>
            <Image
              src="/logo-main.png"
              width="250"
              height="200"
              alt="logo"
              className="mx-auto top-10 sm:top-24 relative w-40 sm:w-52 md:w-64"
            />
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="w-[740px] h-[740px] sm:w-[1100px] mt-2 sm:mt-0 sm:h-[1100px] mx-auto transition-all duration-300" id="rotatable-div" style={{
            transform: `rotate(${rotateAngle}deg) scale(${width >= 640 ? 1 : 0.9})`,
            transformOrigin: "center center"
          }}>
            {
              events.concat(events).map((event, i) => {
                return <div key={i} className="absolute transition-all duration-300 left-1/2 text-block cursor-default" style={{
                  transform: "translateX(-50%)"
                }}>
                  <ReactCurvedText
                    width={width >= 640 ? 1100 : 740}
                    height={width >= 640 ? 1100 : 740}
                    cx={width >= 640 ? 550 : 370}
                    cy={width >= 640 ? 550 : 370}
                    rx={width >= 640 ? 450 : 340}
                    ry={width >= 640 ? 450 : 340}
                    startOffset={calcOffest(i, width)}
                    reversed={true}
                    text={event.title}
                    textProps={{ style: { fontSize: width >= 640 ? 19 : 15 } }}
                    textPathProps={{
                      fill: events[activeSlideIndex % events.length].title == event.title ? "#F8A254" : "#ffffff"
                    }}
                    tspanProps={null}
                    ellipseProps={null}
                    svgProps={null}
                  />
                </div>
              }
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}


const calcOffest = (i, width) => {
  if (width >= 640) {
    switch (i) {
      case 0:
        return 0;
      case 1:
        return 240;
      case 2:
        return 430;
      case 3:
        return 710;
      case 4:
        return 1000;
      case 5:
        return 1210;
      case 6:
        return 1430;
      case 7:
        return 1660;
      case 8:
        return 1840;
      case 9:
        return 2120;
      case 10:
        return 2410;
      case 11:
        return 2620;
    }
  } else {
    switch (i) {
      case 0:
        return 0;
      case 1:
        return 170;
      case 2:
        return 300;
      case 3:
        return 520;
      case 4:
        return 750;
      case 5:
        return 920;
      case 6:
        return 1080;
      case 7:
        return 1255;
      case 8:
        return 1390;
      case 9:
        return 1600;
      case 10:
        return 1815;
      case 11:
        return 1980;
    }
  }
  return 0;
}