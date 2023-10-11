"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
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
import cookie from "cookie-cutter";
import { getDataFromToken } from "../helpers/getDataFromToken";

const Links = [
  { id: 1, href: "/", title: "Home" },
  { id: 2, href: "/events", title: "Events" },
  { id: 3, href: "/tickets", title: "Tickets" },
  { id: 4, href: "/sponsors", title: "Sponsors" },
  { id: 5, href: "/contact", title: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [userData, setUserData] = React.useState({ fullName: "", email: "" });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { fullName, email } = await getDataFromToken();
        setUserData({ fullName, email });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  });
  async function handleLogout() {
    try {
      cookie.set("jwtToken", "");
      router.push("/login");
      toast.success("Logout Sucessfully");
    } catch (error) {
      throw new Error(error.message);
    }
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
              {userData.fullName === "" ||
              pathname === "/login" ||
              pathname === "/signup" ? (
                <Link href="/signup" className="cursor-pointer">
                  Create Your Account
                </Link>
              ) : (
                <p>Hi, {userData.fullName}</p>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Links.map((link) => (
              <Link key={link.id} href={link.href}>
                <DropdownMenuItem>{link.title}</DropdownMenuItem>
              </Link>
            ))}

            {userData.fullName == "" ||
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
        {!(
          !userData.fullName ||
          pathname === "/login" ||
          pathname === "/signup"
        ) ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>{userData.fullName[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>Hi, {userData.fullName}</p>
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
