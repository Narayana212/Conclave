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
      className="relative bg-[#290F12] w-screen mx-auto  flex items-center flex-col pt-14 justify-center p-10 overflow-hidden"
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
        <Tabs defaultValue="account" className=" pl-12 lg:pl-0">
          <TabsList>
            <TabsTrigger value="account">For SNU Students {bookingId}</TabsTrigger>
            <TabsTrigger value="password">For Non-SNU Students</TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="flex  gap-x-4 gap-y-2 flex-col  "
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className=" bg-[#7B283A] mr-12 gap-y-5 h-[27rem]  py-5 px-3 aspect-[1/1.25] flex flex-col items-start  rounded-md"
            >
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
            </motion.div>
            <div className="flex gap-5  items-center">
              <Button
                variant="secondary"
                className="text-xs"
                onClick={bookTicket}
              >
                ₹650 for 1 ticket
              </Button>
              <Button
                variant="secondary"
                className="flex gap-1 text-xs"
                onClick={bookTwoTicket}
              >
                <span className="ml-2 font-semibold">₹1200</span>
                <span className="text-gray-400 line-through">₹1300</span>
                <span className="">for 2 tickets</span>
              </Button>
            </div>
          </TabsContent>
          <TabsContent
            value="password"
            className="flex flex-col justify-center"
          >
            {withAccommodation ? (
              <motion.div
                className=" bg-[#7B283A] mr-12 gap-y-5 h-[30rem]  py-5 px-3 aspect-[1/1.4] flex flex-col items-start  rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
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
                    Networking opportunities with speakers and external
                    delegates
                  </p>
                </div>
                <div className="flex  gap-3 ">
                  <Check className="w-6 h-6 text-[#F8A254]  font-semibold" />
                  <p className="text-white font-semibold text-sm ">
                    Eligible for applications at the Internship Fair
                  </p>
                </div>
                <div className="flex  gap-3 ">
                  <Check className="w-6 h-6 text-[#F8A254]  font-semibold" />
                  <p className=" font-bold text-white  text-sm ">
                    Shared accommodation on campus
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className=" transition-all bg-[#7B283A] mr-12 gap-y-5 h-[30rem]  py-5 px-3 aspect-[1/1.4] flex flex-col items-start  rounded-md"
              >
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
                    Networking opportunities with speakers and external
                    delegates
                  </p>
                </div>
                <div className="flex  gap-3 ">
                  <Check className="w-6 h-6 text-[#F8A254]  font-semibold" />
                  <p className="text-white font-semibold text-sm ">
                    Eligible for applications at the Internship Fair
                  </p>
                </div>
                <div className="flex  gap-3 ">
                  <X className="w-6 h-6 text-[#F8A254]  font-semibold" />
                  <p className="text-white font-semibold text-sm ">
                    Shared accommodation on campus
                  </p>
                </div>
              </motion.div>
            )}
            <div className="flex items-center justify-center mt-2 mr-10 space-x-2 transition-all">
              <label class="switch">
                <input type="checkbox" onChange={() => setWithAccommodation(!withAccommodation)} checked={withAccommodation} />
                <span class="slider round"></span>
              </label>

              <label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                htmlFor="airplane-mode"
                className="text-white font-semibold text-sm"
              >
                {withAccommodation
                  ? "With Accommodation"
                  : "Slide to avail Accommodation"}
              </label>
            </div>
            <div>
              {withAccommodation ? (
                <div className="flex mr-10 mt-4 justify-center ">
                  <Button variant="secondary" onClick={bookFourTicket}>₹1000 for 1 ticket</Button>{" "}
                </div>
              ) : (
                <div className="flex  mr-10 mt-4 justify-center ">
                  <Button variant="secondary" onClick={bookThreeTicket}>₹800 for 1 ticket</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <Toaster richColors />
    </motion.div>
  );
}
