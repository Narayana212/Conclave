"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { sendEmail } from "../actions/send-email";

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
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      message: "",
    },
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    await sendEmail(data);

    setLoading(false);
    toast.success("Sent Successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="h-auto flex flex-col gap-5 lg:flex-row mt-12 py-7 w-screen bg-[#290E13] pb-16"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full lg:w-1/2 order-2 lg:order-1 lg:ml-24"
      >
        <div className="flex flex-col">
          <Image
            src="/main.png"
            alt="logo"
            width={"150"}
            height={"150"}
            className="mix-blend-lighten"
          />
          <Image
            src="/logoin.png"
            alt="logo"
            width={"150"}
            height={"150"}
            className="mix-blend-lighten"
          />
          <Image
            src="/logosn1.png"
            alt="logo"
            width={"150"}
            height={"150"}
            className="mix-blend-lighten"
          />
        </div>

        <h1 className="text-[#F8A254] lg:text-lg font-medium text-[0.5rem]">
        Feel free to contact Adi Satya Arora, Head Of Directors at <hr className="bg-transparent w-0"/>+91 93152 33567
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full lg:w-1/2 order-1 lg:order-2"
      >
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
                      <Input
                        {...field}
                        className="bg-transparent text-white w-4/6  lg:w-full"
                      />
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
                      <Input
                        {...field}
                        className="bg-transparent text-white w-4/6 lg:w-full"
                      />
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

            <Button
              variant={"secondary"}
              type="submit"
              className="self-end mt-4 "
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" />
                  <span>Sending</span>
                </div>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </Form>
      </motion.div>
      <Toaster richColors />
    </motion.div>
  );
}
