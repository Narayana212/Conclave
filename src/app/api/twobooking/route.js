import { NextResponse } from "next/server";
import Plunk from "@plunk/node";
import prisma from "../../../lib/prisma";
import { render } from "@react-email/components";
import {TicketEmail} from "../../../email/ticket-email";


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
  const { email,email2,email1, rollNumber1,rollNumber, images,fullName1,fullName } = requestBody;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
   


    if (existingUser===null) {
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

    if(existingRequestBooking || existingRequestBooking1 ){
      return NextResponse.json(
        { message: "On of them have already submited the form" },
        { status: 422 }
      )
    }

    


    const booking = await prisma.userBooking.create({
      data: {
        email,
        rollNumber,
        fullName,
        type:`2 Tickets with ${email1}`,
        imageUrl:images[0].url
      },
    });

    const booking1 = await prisma.userBooking.create({
        data: {
          email:email1,
          rollNumber:rollNumber1,
          fullName:fullName1,
          type:`2 Tickets with ${email2}`,
          imageUrl:images[0].url
        },
      });

    const ticketHtml = render(
      <TicketEmail
        email={email}
        bookToken={`Hi ${fullName} Payment Request Received will confirm your payment soon..`}
      />
    );
    const ticketHtml1 = render(
        <TicketEmail
          email={email1}
          bookToken={`Hi ${fullName1} Payment Request Received will confirm your payment soon..`}
        />
      );
    
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

    console.log("response", response);
    console.log("response", response1);

    return NextResponse.json({ message: { booking ,booking1} }, { status: 200 });
  } catch (error) {
    console.log("error from ticket post", error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
