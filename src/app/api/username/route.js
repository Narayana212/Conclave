import { getDataFromToken } from "../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    const decodedToken = await getDataFromToken(request);
    console.log("decodedToken: " + decodedToken)
    const { email,fullName } = decodedToken;
    console.log(decodedToken)
    return NextResponse.json({ message: { email, fullName,decodedToken } },{status:200});
  } catch (err) {
    console.log(err.message)
    return NextResponse.json({message:err.message},{status:500})

  }
    
}
