"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import InstaSvg from "../components/svg/insta";
import LinkedinSvg from "../components/svg/linkedin";
import TwitterSvg from "../components/svg/twitter";
import { Toaster, toast } from "sonner";
import getUser from "../hooks/getUser";

const Links = [
  { id: 1, href: "/", title: "Home" },
  { id: 2, href: "/events", title: "Events" },
  { id: 3, href: "/tickets", title: "Tickets" },
  { id: 4, href: "/sponsors", title: "Sponsors" },
  { id: 5, href: "/contact", title: "Contact" },
];

export default function Navbar({ isLogin }) {
  const pathname = usePathname();
  const router = useRouter();
  const username = getUser();
  async function handleLogout() {
    try {
      const response = await fetch("/api/logout");
      if (response.ok) {
        setUsername("");
        router.push("/login");
        toast.success("Logout Sucessfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  if(true){
    console.log(username)
  }


  return (
    <div
      className={`w-screen h-auto bg-transparent "
      z-50 flex items-center justify-between  lg:gap-5  py-5 px-12`}
    >
     
      <div>
        <Link href="/">
          <Image
            src="/main.png"
            width="200"
            height="200"
            alt="logo"
            className="mix-blend-lighten"
          />
        </Link>
      </div>
      <div className="gap-5 items-start hidden lg:flex">
        <div className="flex gap-5 ">
          {Links.map((link) => (
            <Link key={link.id} href={link.href}>
              <p
                className={`hover-link overflow-hidden  relative text-white ${
                  pathname === link.href ? "active-link" : ""
                }`}
              >
                {link.title}
                {username}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="w-8 h-8 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {username === "" ||
              pathname === "/login" ||
              pathname === "/signup" ? (
                <Link href="/signup" className="cursor-pointer">
                  Create Your Account
                </Link>
              ) : (
                <p>Hi, {username}</p>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Links.map((link) => (
              <Link key={link.id} href={link.href}>
                <DropdownMenuItem>{link.title}</DropdownMenuItem>
              </Link>
            ))}

            {username == "" ||
            pathname === "/login" ||
            pathname === "/signup" ? (
              <Link href="/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuItem onClick={() => handleLogout()}>
                Logout
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden lg:flex gap-3">
        {!(!username || pathname === "/login" || pathname === "/signup") ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>Hi, {username}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => handleLogout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/signup"
            className="text-white opacity-75 transition-all hover:opacity-100 hover:font-semibold"
          >
            Create your account
          </Link>
        )}
        <Link href="/">
          <InstaSvg />
        </Link>

        <Link href="/">
          <LinkedinSvg />
        </Link>
        <Link href="/">
          <TwitterSvg />
        </Link>
      </div>

      <Toaster richColors closeButton />
    </div>
  );
}
