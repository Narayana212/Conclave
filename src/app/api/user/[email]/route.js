import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request, { params }) {
  try {
    const email = params.email.slice(1);
   
   

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });


    if (!existingUser) {
      return NextResponse.json(
        { message: "You have not been register yet" },
        { status: 400 }
      );
    }
    const existingBooking = await prisma.booking.findUnique({
        where: {
          userId: existingUser.userId,
        },
      });

    if(!existingBooking) {
        return NextResponse.json({message:"Not Booked yet"},{status:400})
    } 
    const bookToken=existingBooking.bookToken
    const createdAt=existingBooking.createdAt
    return NextResponse.json({message:{bookToken,createdAt}})


  } catch (error) {
    console.log(error.message);
  }
}
