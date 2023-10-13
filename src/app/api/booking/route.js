import { NextResponse } from "next/server";
import Plunk from "@plunk/node";
import prisma from "../../../lib/prisma";
import { render } from "@react-email/components";
import TicketEmail from "../../../email/ticket-email";




export async function GET(request){
  try {

    const Bookings = await prisma.userBooking.findMany({
    
    });

    return NextResponse.json({message:Bookings},{status:200})

    

  } catch (error) {
    console.log("error from ticket post", error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    
  }
}



export async function POST(request) {
  const requestBody = await request.json();
  const { email,email2, rollNumber, images,fullName } = requestBody;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email2,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "You have not been register yet" },
        { status: 402 }
      );
    }

    console.log(existingUser);

    const existingBooking = await prisma.booking.findUnique({
      where: {
        userId: existingUser.userId,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "You have booked Ticket already" },
        { status: 403 }
      );
    }


    const existingRequestBooking = await prisma.userBooking.findUnique({
      where: {
        rollNumber: rollNumber,
      },
    });

    if(existingRequestBooking){
      return NextResponse.json(
        { message: "You have already submited the form" },
        { status: 422 }
      )
    }

    


    const booking = await prisma.userBooking.create({
      data: {
        email,
        rollNumber,
        fullName,
        imageUrl:images[0].url
      },
    });

    const ticketHtml = render(
      <TicketEmail
        email={email}
        bookToken={`Hi ${fullName} Payment Request Received will confirm your payment soon..`}
      />
    );
    const plunk = new Plunk(process.env.PLUNK_API_KEY);

    const response = await plunk.emails.send({
      to: email,
      subject: "Payment request Received",
      body: ticketHtml,
    });

    console.log("response", response);

    return NextResponse.json({ message: { booking } }, { status: 200 });
  } catch (error) {
    console.log("error from ticket post", error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
