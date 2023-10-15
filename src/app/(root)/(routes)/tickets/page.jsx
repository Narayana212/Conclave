"use client";
import React, { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { toast, Toaster } from "sonner";
import { useRouter, redirect } from "next/navigation";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { Check, CornerDownLeft, Heading1, Loader2, Ticket } from "lucide-react";
import TwoCircles from "../../../../components/ui/two-circles";
import { motion } from "framer-motion";
import { sendTicketEmail } from "../../../../actions/send-ticket-email";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";

export default function TicketPage() {
  const [userData, setUserData] = React.useState({
    fullName: "",
    email: "",
    id: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [cancelLoading, setCancelLoading] = React.useState(false);
  const [bookingId, setBookingId] = React.useState();
  const [createdAt, setCreatedAt] = React.useState();
  const router = useRouter();

  async function fetchData() {
    try {
      const { fullName, email, id } = await getDataFromToken();
      if (fullName === '"exp" claim timestamp check failed') {
        setUserData({ fullName: "", email: "", id: "" });
      } else {
        setUserData({ fullName, email, id });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  function bookTicket() {
    try {
      setLoading(true);

      if (!userData.email) {
        toast.error("You have not registered");
        return router.push("/signup");
      }
      toast.promise(promise, {
        loading: "Going to Payment Page...",
        success: "Redirected Payment Page",
        error: "Error",
      });
      return router.push(`/payment/${userData.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function bookTwoTicket() {
    try {
      setLoading(true);

      if (!userData.email) {
        toast.error("You have not registered");
        return router.push("/signup");
      }
      toast.promise(promise, {
        loading: "Going to Payment Page...",
        success: "Redirected Payment Page",
        error: "Error",
      });
      return router.push(`/payment/${userData.id}/1`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getBookingStatus() {
    try {
      const email = userData.email;
      const response = await fetch(`/api/user/:${email}`);
      const data = await response.json();

      if (response.ok) {
        setBookingId(data.message.bookToken);

        const originalDateString = data.message.createdAt;
        if (originalDateString !== "") {
          const originalDate = new Date(originalDateString);
          const hours = originalDate.getUTCHours();
          const minutes = originalDate.getUTCMinutes();
          const day = originalDate.getUTCDate();
          const month = originalDate.getUTCMonth() + 1;
          const year = originalDate.getUTCFullYear();
          const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;
          setCreatedAt(formattedDate);
        } else {
          setCreatedAt("");
        }
      } else {
        setBookingId("");
        setCreatedAt("");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getBookingStatus();
  });

  async function sendTicket({ bookingId, userData }) {
    setCancelLoading(true);
    toast.promise(promise, {
      loading: "Sending to your email...",
      success: "Sent",
      error: "Error",
    });

    await sendTicketEmail({ bookingId, userData });

    setCancelLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#290F12] w-screen mx-auto  flex items-center flex-col pt-14 justify-center p-10 overflow-hidden"
    >
      <TwoCircles />
      {bookingId !== "" ? (
        <div className="lg:w-[650px] p-3 mb-3 relative md:w-[550px] sm:w-[450px] w-[350px] aspect-[9.35/3] rounded-md bg-[#7B283A]">
          {userData.email && (
            <p className="text-white">Booking id: {bookingId}</p>
          )}
          {userData.email && (
            <p className="text-white">Booked At: {createdAt}</p>
          )}
        </div>
      ) : (
        <Tabs defaultValue="account" className=" pl-12 lg:pl-0">
          <TabsList>
            <TabsTrigger value="account">For SNU Students</TabsTrigger>
            <TabsTrigger value="password">For Non-SNU Students</TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="flex  gap-x-4 gap-y-2 flex-col  "
          >
            <div className=" bg-[#7B283A] mr-12 gap-y-5 h-[27rem]  py-5 px-3 aspect-[1/1.25] flex flex-col items-start  rounded-md">
              <div className="flex  gap-3 ">
                <Check className="w-5 h-5 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Access to all 6 events
                </p>
              </div>
              <div className="flex  gap-3 ">
                <Check className="w-6 h-6 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Delegate kit with 10+ items worth Rs. 500+
                </p>
              </div>
              <div className="flex  gap-3 ">
                <Check className="w-5 h-5 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Delegate Handbook
                </p>
              </div>
              <div className="flex  gap-3 ">
                <Check className="w-5 h-5 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Complimentary buffet lunch
                </p>
              </div>
              <div className="flex  gap-3 ">
                <Check className="w-8 h-8 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Complimentary drink and appetizer at the Corporate Gala
                </p>
              </div>
              <div className="flex  gap-3 ">
                <Check className="w-5 h-5 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Access to DJ Night by AminJaz
                </p>
              </div>
              <div className="flex  gap-3 ">
                <Check className="w-8 h-8 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Networking opportunities with speakers and external delegates
                </p>
              </div>
              <div className="flex  gap-3 ">
                <Check className="w-6 h-6 text-[#F8A254]  font-semibold" />
                <p className="text-white font-semibold text-sm ">
                  Eligible for applications at the Internship Fair
                </p>
              </div>
            </div>
            <div className="flex gap-5  items-center">
              <Button
                variant="secondary"
                className="text-xs"
                onClick={bookTicket}
              >
                ₹800 for 1 ticket
              </Button>
              <Button
                variant="secondary"
                className="flex gap-1 text-xs"
                onClick={bookTwoTicket}
              >
                <span className="ml-2 font-semibold">₹1400</span>
                <span className="text-gray-400 line-through">₹1600</span>
                <span className="">for 2 tickets</span>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className=" bg-[#7B283A] mr-12 h-[35rem] aspect-[1/1.2]"></div>
          </TabsContent>
        </Tabs>
      )}

      <Toaster richColors />
    </motion.div>
  );
}
