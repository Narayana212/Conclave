import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";

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
    const payload = { id:exitingUser.userId,email: email, password: exitingUser.password,fullName:exitingUser.fullName };
    const alg = "HS256";
    const secret = new TextEncoder().encode(
      'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const jwtToken = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime("2h")
    .sign(secret);
    const response = NextResponse.json(
      { message: jwtToken },
      { status: 200 }
    );
   
    return response;


  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
