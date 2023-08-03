import { NextResponse } from "next/server";
import prisma from "../../../libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
    const requestBoby = await request.json();
    const{name,email,password}=requestBoby
    try{
        const existingUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
          if (existingUser) {
        
            return NextResponse.json({ message: "User already exists" },{status:400});
          }
      
          if (password.length < 6) {
            return NextResponse.json({ message: "Password is too short"},{status:400});
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          await prisma.user.create({
            data: {
              fullName: name,
              email: email,
              password: hashedPassword,
            },
          });
          
          return NextResponse.json({ message: "Resgistered Successfully"},{status:200});
    }catch(err){
        console.error(error);
    return NextResponse.json({ message: "Internal server error"},{status:500})

    }
}