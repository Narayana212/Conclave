"use client";
import React, { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { toast, Toaster } from "sonner";
import { useRouter, redirect } from "next/navigation";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { Heading1, Loader2 } from "lucide-react";
import TwoCircles from "../../../../components/ui/two-circles";
import { motion } from "framer-motion";
import { sendTicketEmail } from "../../../../actions/send-ticket-email";

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
      className="relative bg-[#290F12] w-screen flex items-center flex-col pt-14 justify-center p-10 overflow-hidden"
    >
      <TwoCircles />
      <div className="w-screen flex items-center gap-3 flex-col justify-center">
        <div className="lg:w-[650px] p-3 relative md:w-[550px] sm:w-[450px] w-[350px] aspect-[9.35/3] rounded-md bg-[#7B283A]">
          {userData.email && (
            <p className="text-white">Booking id: {bookingId}</p>
          )}
          {userData.email && (
            <p className="text-white">Booked At: {createdAt}</p>
          )}
        </div>

        <div className="flex gap-3">
          {bookingId !== "pending" ? (
            !bookingId ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Button onClick={bookTicket} variant="secondary">
                  {loading ? (
                    <div className="flex gap-2 items-center">
                      <Loader2 className="animate-spin" />
                      <span>Processing</span>
                    </div>
                  ) : (
                    "Proceed to Payment" // Corrected the spelling error
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="secondary"
                  onClick={() => sendTicket({ bookingId, userData })}
                >
                  {cancelLoading ? (
                    "Sending"
                  ) : (
                    <h1>Send ticket to {userData.email}</h1>
                  )}
                </Button>
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="secondary">Confirmation Pending</Button>
            </motion.div>
          )}
        </div>
        {userData.email && (
          <p className="text-white">Ticket will be sent to {userData.email}</p>
        )}
      </div>
      <Toaster richColors />
    </motion.div>
  );
}
