"use client";
import { useToast } from "../components/ui/use-toast";
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
import { Loader2, Menu, TwitterIcon } from "lucide-react";
import { Button } from "./ui/button";
import InstaSvg from "../components/svg/insta";
import LinkedinSvg from "../components/svg/linkedin";
import TwitterSvg from "../components/svg/twitter";

const Links = [
  { id: 1, href: "/", title: "Home" },
  { id: 2, href: "/events", title: "Events" },
  { id: 3, href: "/tickets", title: "Tickets" },
  { id: 4, href: "/sponsors", title: "Sponsors" },
  { id: 5, href: "/contact", title: "Contact" },
];

export default function Navbar({ isLogin = true }) {
  const pathname = usePathname();
  const { toast } = useToast();

  const router = useRouter();

  const [username, setUsername] = useState("");

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout");
      if (response.ok) {
        router.push("/login");
        toast({
          title: "Logout Sucessfully",
        });
      } else {
        console.log("Login out failed");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getUserData() {
    try {
      const response = await fetch("/api/username");
      const data = await response.json();
      if (response.ok) {
        setUsername(data.message.fullName);
      } else {
        setUsername("guest");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    getUserData();
  });

  return (
    <div
      className={`w-screen h-auto ${
        isLogin ? "bg-transparent " : "bg-[#290F12]"
      } z-50 flex items-center justify-between  lg:gap-5  py-5 px-12`}
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
        {isLogin ? (
          <div className="flex gap-5 ">
            {Links.map((link) => (
              <Link key={link.id} href={link.href}>
                <p
                  className={`hover-link overflow-hidden  relative text-white ${
                    pathname === link.href ? "active-link" : ""
                  }`}
                >
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {isLogin ? (
        <div className="flex lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="w-8 h-8 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {username == "" ? (
                  <Loader2 className="animate-spin text-black" />
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
              <Link href="/">
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <Button className="lg:hidden">Login</Button>
        </>
      )}

      {isLogin ? (
        <div className="hidden lg:flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {username == "" ? (
                  <Loader2 className="animate-spin text-black" />
                ) : (
                  <p>Hi, {username}</p>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => handleLogout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      ) : (
        <>
          <Button className="hidden lg:flex">Login</Button>
        </>
      )}
    </div>
  );
}
