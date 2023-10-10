"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import TwoCircles from "../../../components/ui/two-circles";

const schema = z.object({
  email: z.string().email("Invalid email format").min(5, "Too short"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Login successfully");
        router.push("/");
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[65vh] w-screen flex  gap-5 items-start pt-12 relative justify-center bg-[#290F12] overflow-hidden">
      <TwoCircles/>
      <div className="flex flex-col items-center justify-center ">
        <h1 className=" text-xl self-start text-white font-bold ml-5">
          Login
        </h1>
        <form
          className="flex flex-col text-white border-black px-5 py-2 mt-5 rounded-lg gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="text-[#F8A254] text-sm">
            Email
          </label>
          <Input
            type="email"
            id="email"
            className="lg:w-[30vw] bg-transparent  -mt-3"
            {...register("email", { required: true })}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label htmlFor="password" className="text-[#F8A254] text-sm mt-2">
            Password
          </label>
          <Input
            type="password"
            id="password"
            className=" bg-transparent lg:w-[30vw] -mt-3"
            {...register("password", { required: true })}
            disabled={loading}
          />

          <Button
            className={`self-end transition-opacity ${
              loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            type="submit"
            variant={"secondary"}
            disabled={loading}
          >
            {loading ? (
              <div className="flex gap-2">
                {" "}
                <Loader2 className="animate-spin w-4 h-4 " />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <Link
          className="text-white text-sm mt-3 hover:underline"
          href="/signup"
        >
          Don't have account ? Sign up here
        </Link>
        <Toaster richColors closeButton />
      </div>
    </div>
  );
}
