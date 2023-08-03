import { getDataFromToken } from "../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prisma";


export async function GET(request) {
  try {
    const decodedToken = getDataFromToken(request);
    const { email } = decodedToken;

    const exitingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if(!exitingUser){
      return NextResponse.json({message:"Invalid user"},{status:400})
  }
    const { fullName } = exitingUser;
    return NextResponse.json({ message: { email, fullName } },{status:200});
  } catch (err) {
    return NextResponse.json({message:"Something went Wrong"},{status:500})

  }
    
}
