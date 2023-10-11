"use client";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { useRouter, redirect } from "next/navigation";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { Loader2 } from "lucide-react";

export default function TicketPage() {
  const [userData, setUserData] = React.useState({ fullName: "", email: "" });
  const [loading, setLoading] = React.useState(false);
  const [cancelLoading, setCancelLoading] = React.useState(false);
  const [bookingId, setBookingId] = React.useState();
  const [createdAt, setCreatedAt] = React.useState();
  const router = useRouter();

  async function fetchData() {
    try {
      const { fullName, email } = await getDataFromToken();
      setUserData({ fullName, email });
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    fetchData();
  },[]);

  async function cancelTicket() {
    try {
      setCancelLoading(true);
      const response = await fetch("/api/user/bookTicket", {
        method: "DELETE",
        body: JSON.stringify(userData),
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Ticket Cancel successfully");
        setBookingId("");
        setCreatedAt("");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setCancelLoading(false);
    }
  }

  async function bookTicket() {
    try {
      setLoading(true);
      const response = await fetch("/api/user/bookTicket", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Ticket Booked successfully");
        console.log(responseData);
        setBookingId(responseData.message.booking.bookToken);
        setCreatedAt(responseData.message.booking.createdAt);
      } else if (response.status == 402) {
        toast.error(responseData.message);
        router.push("/signup");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#290F12] w-screen flex items-center gap-3  flex-col pt-14 justify-center p-10">
      <div className="lg:w-[650px] p-3 relative md:w-[550px] sm:w-[450px] w-[350px] aspect-[9.35/3] rounded-md bg-[#7B283A] ">
        {userData.email && (
          <p className="text-white ">Booking id: {bookingId}</p>
        )}
        {userData.email && (
          <p className="text-white ">Created At: {createdAt}</p>
        )}
      </div>

      <div className="flex gap-3">
        {!bookingId ? (
          <Button onClick={bookTicket} variant="secondary">
            {loading ? (
              <div className="flex  gap-2 items-center">
                <Loader2 className="animate-spin" />
                <span>Booking Ticket</span>
              </div>
            ) : (
              "Book Ticket"
            )}
          </Button>
        ) : (
          <Button onClick={cancelTicket} variant="secondary">
            {cancelLoading ? (
              <div className="flex gap-2 items-center">
                <Loader2 className="animate-spin" />
                <span>Cancelling Ticket</span>
              </div>
            ) : (
              "Cancel Ticket"
            )}
          </Button>
        )}
        <Button onClick={cancelTicket} variant="secondary">
          {cancelLoading ? (
            <div className="flex gap-2 items-center">
              <Loader2 className="animate-spin" />
              <span>Cancelling Ticket</span>
            </div>
          ) : (
            "Cancel Ticket"
          )}
        </Button>
      </div>
      {userData.email && (
        <p className="text-white ">Ticket will be sent to {userData.email}</p>
      )}
    </div>
  );
}
