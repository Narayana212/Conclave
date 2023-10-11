"use client";

import { useEffect, useState } from "react";

export default function useUser() {
    const [username,setUsername]=useState("")
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

  return username;
}


