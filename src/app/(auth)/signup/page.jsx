"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import TwoCircles from "../../../components/ui/two-circles";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name should be atleast 2 characters")
    .max(50, "Name should be atmost 50 characters"),
  email: z.string().email("Invalid email format").min(5, "Too short"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await fetch("api/signup", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Sucessfully Registered");
       
        router.push("/login");
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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

  if(!username){
    router.push("/")

  }


  return (
    <div className="h-[75vh] w-screen flex  gap-5 items-start pt-12 relative justify-center bg-[#290F12] overflow-hidden">
      <TwoCircles />
      <div className="flex flex-col items-center justify-center ">
        <h1 className=" text-xl self-start text-white font-bold ">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel className="text-[#F8A254] text-sm">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className=" text-white lg:w-[30vw] bg-transparent "
                      placeholder="your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="text-[#F8A254] text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className=" text-white lg:w-[30vw] bg-transparent "
                      placeholder="your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="text-[#F8A254] text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      className=" text-white lg:w-[30vw] bg-transparent "
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={`self-end transition-opacity mt-3 ${
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
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
        <Link className="underline mt-3 text-white text-sm" href="/login">
          Already have an account?Login here
        </Link>
      </div>

      <Toaster richColors closeButton />
    </div>
  );
}
