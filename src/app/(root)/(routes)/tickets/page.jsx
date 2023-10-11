"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import {useRouter} from 'next/navigation'
import useUser from "../../../../hooks/useUser";

export default function TicketPage() {
  const router=useRouter()
  const username= useUser();
  
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
