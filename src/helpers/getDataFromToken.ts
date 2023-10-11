"use client"
import * as jose from 'jose';
import cookie from 'cookie-cutter'

export const getDataFromToken = async () => {
    try {
      const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      )
      const token = cookie.get("jwtToken")
      if(token){
        const verified = await jose.jwtVerify(token, secret)
        const decodedToken=verified.payload
        return decodedToken ;
      }else{
        return {email:token,fullName:token+"@"}
      }
    } catch (error: any) {
      console.log(error.message)
      return {email:"",fullName:error.message};
      
        
    }

}