"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";
import { Toaster,toast } from "sonner";
import Heading from "../../../components/ui/heading";


const schema = z.object({
  email: z.string().email("Invalid email format").min(5, "Too short"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true); 
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Login successfully")
        router.push("/");
      } else {
        toast.error(responseData.message)
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#290F12]">
       <h1 className="text-orange-500 font-bold">Login Page</h1>
      <form
        className="flex flex-col text-white border-black px-5 py-2 rounded-lg gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          className="text-black"
          {...register("email", { required: true })}
          disabled={loading} // Disable input field during loading
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          className="text-black"
          {...register("password", { required: true })}
          disabled={loading} // Disable input field during loading
        />
        

        <Button
          className={`self-end transition-opacity ${
            loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          type="submit"
          disabled={loading} // Disable the button during loading
        >
          {loading ?<div className="flex gap-2"> <Loader2 className="animate-spin w-4 h-4 "/>Logging in...</div>: "Login"}
        </Button>
      </form>
     
      <Link className="text-white hover:underline" href="/signup">
        Go to signup
      </Link>
      <Toaster richColors closeButton/>
    </div>
  );
}
