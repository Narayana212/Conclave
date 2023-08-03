import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken=(request)=>{
    try{
        const jwtToken=request.cookies.get("token").value || ""
        const decodedToken=jwt.verify(jwtToken,"secret")
        return decodedToken


    }catch(err){
        throw new Error(err.message)
    }
}