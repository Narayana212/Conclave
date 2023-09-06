"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {Button} from '../../components/ui/button'

export default function Home() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const[book,setBook]=useState(false)
  const router = useRouter();

  const cancelTicket=async()=>{
    try{
      await fetch("api/book",{
        method:"DELETE"
      })
      setBook(false)

    }catch(err){
      console.log(error.message)
    }
  }
  const getBooking = async () => {
    try {
      const response = await fetch("api/bookStatus");
      await response.json();
      if (response.ok) {
        setBook(true);
      } else {
        setBook(false)
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

  const bookTicket=async()=>{
    try{
      const response=await fetch("api/book")
      const data=await response.json()
      if(response.ok){
        setBook(true) 
        router.push("/success")
      }else{
        console.log(data)
      }

    }catch(err){
      console.error(err.message)

    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");
      router.push("/login");
    } catch (err) {
      console.err(err.message);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 bg-slate-400 relative ">
      <Button
        className="border-2 p-3  rounded-full border-black"
        onClick={handleLogout}
      >
        Log out
      </Button>
      <h1 className="text-2xl font-bold">
        Hi {fullname}, you haved Signed in as {email}
      </h1>
      <button className="border-2 p-3 rounded-full mt-3 border-black" onClick={bookTicket} disabled={book}>

        {book?"You have booked the event":"Book the ticket"}
      </button>
      {book&&<button className="border-2 p-3 rounded-full mt-3  border-black"  onClick={cancelTicket}>Cancel book</button>}
      <div></div>

     
    </div>
  );
}
