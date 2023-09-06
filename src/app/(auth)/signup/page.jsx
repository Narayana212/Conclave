"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";

export default function Login() {
  const router=useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const response = await fetch("api/signup", {
        method: "POST",
        body: JSON.stringify({name,email,password}),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message)
        router.push("/login");
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.error(error.message)
    }
  };


  return (
    <div className="w-screen h-screen flex items-center flex-col justify-center ">
      <form className="flex flex-col border-2 border-black px-5 py-2 rounded-lg gap-5">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-5 py-2 border-2 border-black rounded-lg"
          
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          className="px-5 py-2 border-2 border-black rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-5 py-2 border-2 border-black rounded-lg"
        />
        <button className="border-2 border-black p-2 rounded-lg self-end" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <Link className="underline" href="/login">
        Go to login
      </Link>
    </div>
  );
}
