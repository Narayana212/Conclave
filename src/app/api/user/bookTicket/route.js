import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";







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

    console.log(existingBooking);

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

    return NextResponse.json({ message: {booking}}, { status: 200 });
  } catch (error) {
    console.log(error.message);
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
