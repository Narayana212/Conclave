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
import cookie from "cookie-cutter";
import { motion } from "framer-motion";

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
        cookie.set("jwtToken", responseData.message);
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideInUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="h-[65vh] w-screen flex  gap-5 items-start pt-12 relative justify-center bg-[#290F12] overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TwoCircles />
      </motion.div>
      <motion.div
        className="flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={slideInUpVariants}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className=" text-xl self-start text-white font-bold ml-5">Login</h1>
        <motion.form
          className="flex flex-col text-white border-black px-5 py-2 mt-5 rounded-lg gap-5"
          onSubmit={handleSubmit(onSubmit)}
          initial="hidden"
          animate="visible"
          variants={slideInUpVariants}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.label
            htmlFor="email"
            className="text-[#F8A254] text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Email
          </motion.label>
          <Input
            type="email"
            id="email"
            placeholder="your email"
            className="lg:w-[30vw] bg-transparent  -mt-3"
            {...register("email", { required: true })}
            disabled={loading}
          />
          {errors.email && (
            <motion.p
              className="text-red-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {errors.email.message}
            </motion.p>
          )}

          <motion.label
            htmlFor="password"
            className="text-[#F8A254] text-sm mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Password
          </motion.label>
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
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link className="text-white text-sm mt-3 hover:underline" href="/signup">
            Don&apos;t have an account? Sign up here
          </Link>
        </motion.div>
        <Toaster richColors closeButton />
      </motion.div>
    </motion.div>
  );
}
