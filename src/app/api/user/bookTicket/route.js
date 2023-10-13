import { render } from "@react-email/components";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import Plunk from '@plunk/node';
import { v4 as uuidv4 } from "uuid";
import TicketEmail from '../../../../email/ticket-email'




export async function POST(request) {
  const requestBody = await request.json();
  const { email } = requestBody;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
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
        { message: "You have booked Ticket already" },
        { status: 403}
      );
    }

    const userId = existingUser.userId;
    const bookToken = uuidv4();
   const booking= await prisma.booking.create({
      data: {
        bookToken,
        userId,
        createdAt: new Date(),
      },
    });
    

    
    
    const ticketHtml=render(<TicketEmail email={email} bookToken={bookToken}/>)
    const plunk = new Plunk(process.env.PLUNK_API_KEY);

    
   

    

    const response=await plunk.emails.send({
      to: email,
      subject: "Hello world",
      body: ticketHtml,
    });

    console.log("response",response)


    
    return NextResponse.json({ message: {booking}}, { status: 200 });
  } catch (error) {
    console.log("error from ticket post",error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const requestBody = await request.json();
  const { email } = requestBody;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    await prisma.booking.delete({
      where: { userId: existingUser.userId },
    });
    return NextResponse.json({ message: "Done" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
