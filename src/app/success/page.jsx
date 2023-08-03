"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Success() {
  const [data, setData] = useState({});
  const getBooking = async () => {
    try {
      const response = await fetch("api/bookStatus");
      const data = await response.json();
      if (response.ok) {
        setData(data.message);
      } else {
        console.log(data)
      }
    } catch (err) {
      console.error(err.messsage);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);

  return <div>
    Success
    <p className="mb-5">
      Order id: {data.bookToken}
    </p>
    <Link href="/" className="p-2 border-2 border-black rounded-full m-5"><button>Go Home</button></Link>
  </div>;
}
