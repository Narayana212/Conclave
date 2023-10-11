import { getDataFromToken } from "../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


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
    console.log(fullName)
    return NextResponse.json({ message: { email, fullName } },{status:200});
  } catch (err) {
    console.log(err.message)
    return NextResponse.json({message:err.message},{status:500})

  }
    
}
