import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const requestBody = await request.json();
  const { email, password } = requestBody;
  try {
    const exitingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!exitingUser) {
      return NextResponse.json({ message: "You have not been register yet" }, { status: 402 });
    }
    const isPassword = await bcrypt.compare(password, exitingUser.password);
    if (!isPassword) {
      return NextResponse.json({ message: "Password is wrong" }, { status: 400 });
    }
    const payload = { email: email, password: exitingUser.password,fullName:exitingUser.fullName };
    const jwtToken = jwt.sign(payload, "secret");
    const response = NextResponse.json(
      { message: jwtToken },
      { status: 200 }
    );
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
    });
    return response;


  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
