"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


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
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <form className="flex flex-col border-2 border-black px-5 py-2 rounded-lg gap-5">
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
        <button
          className="border-2 border-black p-2 rounded-lg self-end"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p>{message}</p>
      </form>
      <Link className="underline" href="/signup">
        Go to signup
      </Link>
    </div>
  );
}
