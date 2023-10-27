"use client";
import React, { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { toast, Toaster } from "sonner";
import { useRouter, redirect } from "next/navigation";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import {
  Check,
  CornerDownLeft,
  Heading1,
  Loader2,
  Ticket,
  X,
} from "lucide-react";
import TwoCircles from "../../../../components/ui/two-circles";
import { motion } from "framer-motion";
import { sendTicketEmail } from "../../../../actions/send-ticket-email";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Switch } from "../../../../components/ui/switch";
import { Label } from "../../../../components/ui/label";

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
  const [withAccommodation, setWithAccommodation] = React.useState(false);
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
  function bookThreeTicket() {
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
      return router.push(`/payment/${userData.id}/2`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function bookFourTicket() {
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
      return router.push(`/payment/${userData.id}/3`);
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
      return router.push(`/payment/${userData.id}/4`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getBookingStatus() {
    try {
      const email = userData.email;

      const response = await fetch(`/api/user/:${userData.email}`);
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

  async function sendTicket({ bookingId }) {
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
      className="relative bg-[#290F12] w-screen mx-auto  flex items-center flex-col pt-14 justify-center  p-10 overflow-hidden"
      id="tickets"
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
          {bookingId === "pending" ? (
            <p className="text-white text-sm mt-2">
              Yet To Confirm your payment
            </p>
          ) : (
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => sendTicket(bookingId)}
            >
              Sent Ticket to {userData.email}
            </Button>
          )}
        </div>
      ) : (
                                          
               <p className="text-white text-2xl">Registers Closed </p>
              
      )}

      <Toaster richColors />
    </motion.div>
  );
}
