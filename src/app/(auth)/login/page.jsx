"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";


export default function Login() {
  
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        router.push("/");
      } else {
        setEmail("");
        setPassword("");
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("An error occurred while logging in.");
    }
  };

  

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#290F12]">
      <form className="flex flex-col  text-white border-black px-5 py-2 rounded-lg gap-5">
        <label htmlFor="email" >Email</label>
        <Input
          type="email"
          id="email"
          className="text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          className="text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
         
        />
        <Button
          className="self-end"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <p>{message}</p>
      </form>
      <Link className="text-white hover:underline" href="/signup">
        Go to signup
      </Link>
    </div>
  );
}
