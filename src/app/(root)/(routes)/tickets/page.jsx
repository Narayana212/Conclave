"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import {useRouter} from 'next/navigation'

export default function TicketPage() {
  const router=useRouter()
  const [username, setUsername] = useState("");
  async function getUserData() {
    try {
      const response = await fetch("/api/username");
      const data = await response.json();
      if (response.ok) {
        setUsername(data.message.fullName);
      } else {
        setUsername("");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    getUserData();
  });

  async function bookTicket() {
    if(username){
      toast.error("Uncurrently unavailable please try again later ..")
    }else{
      router.push("/signup")
    }
  }
  return (
    <div className="bg-[#290F12] w-screen flex items-center pt-28 justify-center">
      <Button onClick={bookTicket}>Book the Ticket</Button>
    </div>
  );
}
