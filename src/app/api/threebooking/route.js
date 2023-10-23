import { NextResponse } from "next/server";
import Plunk from "@plunk/node";
import prisma from "../../../lib/prisma";
import { render } from "@react-email/components";
import { TicketEmail } from "../../../email/ticket-email";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  try {
    const Bookings = await prisma.userBooking.findMany({
      where: {
        isBooked: false,
      },
    });

    return NextResponse.json({ message: Bookings }, { headers: corsHeaders });
  } catch (error) {
    console.log("error from ticket post", error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const requestBody = await request.json();
    const { rollNumber } = requestBody;

    const existingBooking = await prisma.userBooking.update({
      where: {
        rollNumber,
      },
      data: {
        isBooked: true,
      },
    });
    const Bookings = await prisma.userBooking.findMany({
      where: {
        isBooked: false,
      },
    });

    return NextResponse.json({ message: Bookings }, { headers: corsHeaders });
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
  const {
    email,
    email1,
    rollNumber1,
    rollNumber,
    images,
    fullName1,
    fullName,
    phoneNumber,
    phoneNumber1,
    email2,
    fullName2,
    phoneNumber2,
    rollNumber2,
  } = requestBody;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser === null) {
      return NextResponse.json(
        { message: "You have not been register yet" },
        { status: 402 }
      );
    }

    const existingBooking = await prisma.booking.findUnique({
      where: {
        userId: existingUser.userId,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "You booked Ticket already" },
        { status: 403 }
      );
    }

    const existingRequestBooking = await prisma.userBooking.findUnique({
      where: {
        rollNumber: rollNumber,
      },
    });

    const existingRequestBooking1 = await prisma.userBooking.findUnique({
      where: {
        rollNumber: rollNumber1,
      },
    });
    if (
      existingRequestBooking ||
      existingRequestBooking1 
    ) {
      return NextResponse.json(
        { message: "On of them have already submited the form" },
        { status: 422 }
      );
    }

    const booking = await prisma.userBooking.create({
      data: {
        email,
        rollNumber,
        fullName,
        type: `3 Tickets with ${email1}  ${email2}`,
        imageUrl: images[0].url,
        phoneNumber,
      },
    });

    const booking1 = await prisma.userBooking.create({
      data: {
        email: email1,
        rollNumber: rollNumber1,
        fullName: fullName1,
        type: `3 Tickets with ${email} ${email2}`,
        imageUrl: images[0].url,
        phoneNumber: phoneNumber1,
      },
    });
    const booking2 = await prisma.userBooking.create({
      data: {
        email: email2,
        rollNumber: rollNumber2,
        fullName: fullName2,
        type: `3 Tickets with ${email} ${email1}`,
        imageUrl: images[0].url,
        phoneNumber: phoneNumber2,
      },
    });

    const ticketHtml = render(<TicketEmail />);
    const ticketHtml1 = render(<TicketEmail />);

    const ticketHtml2 = render(<TicketEmail />);

    const plunk = new Plunk(process.env.PLUNK_API_KEY);

    const response = await plunk.emails.send({
      to: email,
      subject: "Payment request Received",
      body: ticketHtml,
    });
    const response1 = await plunk.emails.send({
      to: email1,
      subject: "Payment request Received",
      body: ticketHtml1,
    });
    const response2 = await plunk.emails.send({
      to: email1,
      subject: "Payment request Received",
      body: ticketHtml2,
    });

    console.log("response", response);
    console.log("response", response1);
    console.log("response", response2);

    return NextResponse.json(
      { message: { booking, booking1, booking2 } },
      { status: 200 }
    );
  } catch (error) {
    console.log("error from ticket post", error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
