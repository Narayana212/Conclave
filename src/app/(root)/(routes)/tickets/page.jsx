"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import {useRouter} from 'next/navigation'
import { getDataFromToken } from "../../../../helpers/getDataFromToken";


export default function TicketPage() {
  const [userData, setUserData] = React.useState({ fullName: "", email: "" });
  const router=useRouter()
  React.useEffect(() => {
    async function fetchData() {
      try {
        const { fullName, email } = await getDataFromToken();
        setUserData({ fullName, email });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
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
      <p className="text-white">Ticket will sent to {userData.email}</p>
    </div>
  );
}
