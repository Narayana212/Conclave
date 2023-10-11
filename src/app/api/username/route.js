import { getDataFromToken } from "../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


export async function GET(request) {
  try {
    const decodedToken = getDataFromToken(request);
    const { email,fullName } = decodedToken;
    return NextResponse.json({ message: { email, fullName } },{status:200});
  } catch (err) {
    console.log(err.message)
    return NextResponse.json({message:err.message},{status:500})

  }
    
}
