"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  emailId: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      message: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="h-auto flex flex-col gap-5 lg:flex-row mt-12 py-7 w-screen bg-[#290E13]">
      <div className="flex flex-col w-full lg:w-1/2 order-2 lg:order-1 lg:ml-24">
        <Image src='/main.png' alt="logo" width={"200"} height={"200"}  className="mix-blend-lighten"/>
        <h1 className="text-[#F8A254] lg:text-xl  font-medium ">
          Shiv Nadar Institution of Eminence
        </h1>
        <h1 className="text-[#F8A254] lg:text-xl font-medium">+91-120-7170100</h1>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 order-1 lg:order-2">
        <h1 className="text-white text-2xl font-bold">Contact Us</h1>
        <Form {...form} className="w-full">
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="w-full flex flex-col lg:flex-row  gap-8 lg:gap-2 mt-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#F8A254]">First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-transparent text-white w-4/6  lg:w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#F8A254]">Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-transparent text-white w-4/6 lg:w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-4/6">
              <FormField
                control={form.control}
                name="emailId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#F8A254]">Email Id</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-transparent text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/6">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#F8A254]">Message</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-transparent text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button   variant={"secondary"} type="submit" className="self-end mt-4">
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
