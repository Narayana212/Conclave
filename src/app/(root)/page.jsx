"use client";
import { useEffect, useState } from "react";
import AboutConclave from "../../components/about-conclave";
import PastSpeakersSlider from "../../components/past-speakers";
import AllPastSpeakers from "../../components/all-past-speakers";
import Sponsors from "../../components/sponsors";
import ContactForm from "../../components/contact-form";

export default function Home() {
  const [view, setView] = useState(false);

  return (
    <div className=" w-screen h-auto overflow-hidden flex flex-col    relative px-7 bg-[#290E13] ">
      <AboutConclave />
      {!view && <PastSpeakersSlider />}
      {view && <AllPastSpeakers />}
      <div
        className="self-end pr-10 mt-5 lg:pr-20 relative active-link cursor-pointer "
        onClick={() => setView(!view)}
      >
        <p className="text-white font-semibold">
          {view ? "View less" : "View All"}
        </p>
      </div>
      <Sponsors />
      <div className="ml-12 lg:ml-0">
        <ContactForm />
      </div>
    </div>
  );
}
