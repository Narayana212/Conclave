import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET(request, { params }) {
  try {
    const email = params.email.slice(1);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const existingRequestBooking = await prisma.userBooking.findUnique({
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

    console.log(existingUser);
    if (existingRequestBooking && !existingRequestBooking.isBooked) {
      return NextResponse.json({
        message: { bookToken: "pending", createdAt: "" },
      });
    }
    const existingBooking = await prisma.booking.findUnique({
      where: {
        userId: existingUser.userId,
      },
    });

    console.log(existingBooking);
    console.log(existingRequestBooking)


    if (
      !existingBooking &&
      existingRequestBooking &&
      existingRequestBooking.isBooked
    ) {
      const userId = existingUser.userId;
      const bookToken = uuidv4();
      const booking = await prisma.booking.create({
        data: {
          bookToken,
          userId,
          createdAt: new Date(),
        },
      });
      console.log(booking);
      return NextResponse.json(
        {
          message: {
            bookToken: booking.bookToken,
            createdAt: booking.createdAt,
          },
        },
        { status: 200 }
      );
    }

    const bookToken = existingBooking.bookToken;
    const createdAt = existingBooking.createdAt;
    return NextResponse.json({ message: { bookToken, createdAt } });
  } catch (error) {
    console.log(error.message);
  }
}
