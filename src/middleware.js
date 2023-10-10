import { NextResponse } from "next/server";

export async function middleware(request) {
    const path=request.nextUrl.pathname
    const isPublicPath= path==='/login' || path==='/signup'
    const token = request.cookies.get('token')|| ""
    console.log(token.value)
    console.log(isPublicPath)
    if(isPublicPath && token.value){
        return NextResponse.redirect(new URL("/",request.nextUrl))
    }
  
}


export const config = {
  matcher: ["/login", "/", "/signup","/success",'/contact','/events',"/tickets"],
};