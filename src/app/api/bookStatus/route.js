import { getDataFromToken } from "../../../helpers/getDataFromToken";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export  async function GET(request) {
    try {
      const decodedToken = getDataFromToken(request);
      const { email } = decodedToken;
      console.log(email)
      const exitingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      console.log(exitingUser)
      if (!exitingUser) {
        return NextResponse.json({ message: "Invalid user" }, { status: 400 });
      }
      const existingBooking = await prisma.booking.findUnique({
        where: { userId:exitingUser.userId },
      });
      if(existingBooking){
        return NextResponse.json({message:existingBooking},{status:200})
      }
      return NextResponse.json({message:false},{status:400})
    } catch (err) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  