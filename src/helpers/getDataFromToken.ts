import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log(token);
        const decodedToken:{email:string,fullName:string} = jwt.verify(token, "secret");
        return decodedToken;
    } catch (error: any) {
      console.log(error.message)
      return {email: error.message,fullName: error.message};
      
        
    }

}