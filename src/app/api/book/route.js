import { getDataFromToken } from "../../../helpers/getDataFromToken";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
  try {
    const decodedToken = await getDataFromToken(request);
    const { email } = decodedToken;
    const exitingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!exitingUser) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }

    const existingBooking = await prisma.booking.findUnique({
      where: { userId: exitingUser.userId },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "You have already booked" },
        { status: 400 }
      );
    }

    const userId = exitingUser.userId;
    const bookToken = uuidv4();
    await prisma.booking.create({
      data: {
        bookToken,
        userId,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ message: bookToken }, { status: 200 });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const decodedToken = getDataFromToken(request);
    const { email } = decodedToken;
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
