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
      return NextResponse.json({ message: "Invalid User" }, { status: 400 });
    }
    const isPassword = await bcrypt.compare(password, exitingUser.password);
    if (isPassword) {
      const payload = { email: email, password: password };
      const jwtToken = jwt.sign(payload, "secret");
      const response = NextResponse.json(
        { message: "Login Successfull" },
        { status: 200 }
      );
      response.cookies.set("token", jwtToken, {
        httpOnly: true,
      });
      return response;
    } else {
      NextResponse.json({ message: "Password is wrong" }, { status: 400 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "SomeThing went wrong" },
      { status: 500 }
    );
  }
}
