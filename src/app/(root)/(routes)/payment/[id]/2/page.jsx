"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";
import Heading from "../../../../../../components/ui/heading";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../../../../../components/ui/form";
  import { Input } from "../../../../../../components/ui/input";
  import { Button } from "../../../../../../components/ui/button";
  import ImageUpload from "../../../../../../components/ui/image-upload";
  import { getDataFromToken } from "../../../../../../helpers/getDataFromToken";
  

const userSchema = z.object({
  fullName: z.string(),
  email: z.string().min(5, "Too short"),
  college: z
    .string(),
  images: z
    .array(z.object({ url: z.string() }))
    .refine((images) => images.length > 0, "Image is required to Upload"),
    phoneNumber: z
    .string()
    .min(10, "Invalid Phone Number")
    .max(10, "Invalid Phone Number")  
});

export default function PaymentPage() {
  const router = useRouter();

  const [loading,setLoading]=React.useState(false)

  const [userData, setUserData] = React.useState({ fullName: "", email: "" });

  async function fetchData() {
    try {
      const { fullName, email } = await getDataFromToken();
      if (fullName === "exp claim timestamp check failed") {
        setUserData({ fullName: "", email: "" });
      } else {
        setUserData({ fullName, email });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const body={...data,email2:userData.email,type:"NON SNU STUDENT 1 Ticket WITHOUT ACCOMDATION"}
      const response = await fetch("/api/booking", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success("Sent Successfully will conform your payment soon");
        router.push("/tickets")
      } else if(response.status===402){
        toast.error(responseData.message);
        router.push("/signup")
      }else{
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error.message)
    }finally{
      setLoading(false)
      
    }
  };

  const defaultValues = {
    fullName: "",
    email: "",
    college: "",
    images: [],
    phoneNumber:""
  };

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <div className=" bg-[#290E13] items-center lg:justify-between pb-20 w-screen pt-36 flex flex-col lg:flex-row gap-5 px-10">
      <Heading text={"PAYMENT"} styles="text-4xl  lg:hidden pb-10 " />
      <div>
        <Image
          src="/qr.jpg"
          className="rounded-md"
          width={500}
          height={500}
          alt="qr-code"
        />
      </div>
      <div className="w-screen flex flex-col  items-center lg:w-1/2">
        <h1 className=" text-white text-2xl mb-5 font-bold">Details</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#F8A254]">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  text-white"
                      {...field}
                      placeholder={userData.fullName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#F8A254]">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  text-white"
                      {...field}
                      placeholder={userData.email}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#F8A254]">Phone No.</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  text-white"
                      {...field}
                      placeholder={userData.email}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="college"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#F8A254]">Name of College/School/Organization</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent text-white"
                      placeholder=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#F8A254]">
                    Screenshot of Payment 
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant={"secondary"}>
              {loading?<div className="flex items-center gap-2"><Loader2 className="animate-spin"/>Submiting</div>:"Submit"}
            </Button>
          </form>
        </Form>
      </div>
      <Toaster closeButton richColors />
    </div>
  );
}
