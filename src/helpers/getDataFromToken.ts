import { NextRequest } from "next/server";
import * as jose from 'jose';

export const getDataFromToken = async (request: NextRequest) => {
    try {
      const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      )
      const token = request.cookies.get("token");
      if(token){
        const verified = await jose.jwtVerify(token.value, secret)
        const decodedToken=verified.payload
        return decodedToken ;
      }else{
        return {email:token,fullName:token.value+"@"}
      }
    } catch (error: any) {
      console.log(error.message)
      return {email:"",fullName:error.message};
      
        
    }

}