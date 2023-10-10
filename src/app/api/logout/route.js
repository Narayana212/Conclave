import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response=NextResponse.json({message:"Logout successful"},{status:200})
        response.cookies.set("token","")
        return response
    }catch(err){
        throw new Error(err.message)
       
    }

}