import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken=(request)=>{
    try{
        let jwtToken=request.cookies.get("token")
        if(jwtToken){
            jwtToken=jwtToken.value
            const decodedToken=jwt.verify(jwtToken,"secret")
            return decodedToken
        }
        return {email:""}
       
    }catch(err){
        throw new Error(err.message)
    }
}