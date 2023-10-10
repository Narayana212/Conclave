import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  const requestBody = await request.json();
 
  const { name, email, password } = requestBody;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json({message:"Password must be at least 6 characters"},{status:400})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        fullName: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Registered Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
   return NextResponse.json({message:err.message},{status:500})
  }
}
