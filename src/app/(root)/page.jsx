"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import AboutConclave from "../../components/about-conclave";
import PastSpeakersSlider from "../../components/past-speakers";
import AllPastSpeakers from '../../components/all-past-speakers';
import Sponsors from '../../components/sponsors'
import ContactForm from "../../components/contact-form";

export default function Home() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [book, setBook] = useState(false);
  const router = useRouter();
  const [view,setView]=useState(false)

  const cancelTicket = async () => {
    try {
      await fetch("api/book", {
        method: "DELETE",
      });
      setBook(false);
    } catch (err) {
      console.log(error.message);
    }
  };
  const getBooking = async () => {
    try {
      const response = await fetch("api/bookStatus");
      await response.json();
      if (response.ok) {
        setBook(true);
      } else {
        setBook(false);
      }
    } catch (err) {
      console.error(err.messsage);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);

  const getName = async () => {
    try {
      const response = await fetch("api/username");
      const data = await response.json();
      const { message } = data;
      console.log(data);
      setEmail(message.email);
      setFullName(message.fullName);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const bookTicket = async () => {
    try {
      const response = await fetch("api/book");
      const data = await response.json();
      if (response.ok) {
        setBook(true);
        router.push("/success");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");
      router.push("/login");
    } catch (err) {
      console.err(err.message);
    }
  };

  
  return (
    <div className="w-screen h-auto overflow-hidden flex flex-col relative px-7 bg-[#290E13] ">
      <AboutConclave />
      {!view && <PastSpeakersSlider />}
      {view && <AllPastSpeakers />}
      <div className="self-end pr-10 mt-5 lg:pr-20 relative active-link cursor-pointer " onClick={()=>setView(!view)} >
        <p className="text-white font-semibold">{view?"View less":"View All"}</p>
      </div>
      <Sponsors/>
      <ContactForm/>
    </div>
  );
}
