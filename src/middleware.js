import { NextResponse } from "next/server";


export async function middleware(request) {
    const path=request.nextUrl.pathname
    const isPublicPath= path==='/login' || path==='/signup'
    const token = request.cookies.get('token')|| ""
    if(!isPublicPath && !token.value){
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }
  
}


export const config = {
  matcher: ["/login", "/", "/signup","/success"],
};