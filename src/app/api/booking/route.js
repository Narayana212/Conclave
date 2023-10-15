import { NextResponse } from "next/server";
import Plunk from "@plunk/node";
import prisma from "../../../lib/prisma";
import { render } from "@react-email/components";
import TicketEmail from "../../../email/ticket-email";
import {v4 as uuid} from "uuid"



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


export async function GET(request){
  try {

    const Bookings = await prisma.userBooking.findMany({
      where:{
        isBooked:false
      }
    
    });

    return NextResponse.json({message:Bookings},{headers:corsHeaders})

    

  } catch (error) {
    console.log("error from ticket post", error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    
  }
}


export async function PUT(request){
  try {

    const requestBody = await request.json();
    const { rollNumber} = requestBody;


    const existingBooking = await prisma.userBooking.update({
      where: {
        rollNumber,
      },
      data:{
        isBooked:true

      }
    });
    const Bookings = await prisma.userBooking.findMany({
      where:{
        isBooked:false
      }
    
    });


    return  NextResponse.json({message:Bookings},{headers:corsHeaders})




    
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
  const { email, rollNumber, images,fullName,college ,type} = requestBody;
  console.log(requestBody)
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
       email:email,
      },
    });

    console.log(existingRequestBooking)

    if(existingRequestBooking){
      return NextResponse.json(
        { message: "You have already submited the form" },
        { status: 422 }
      )
    }
    const rollNumber1 = rollNumber?rollNumber:uuid()
    console.log("rollNumber1: " + rollNumber1)
    console.log("email",email)
    console.log("college",college)
    const booking = await prisma.userBooking.create({
      data: {
        email,
        rollNumber: rollNumber1,
        fullName,
        type,
        college,
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
