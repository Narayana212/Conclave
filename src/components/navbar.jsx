"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion"; 
import Link from "next/link";
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

  async function fetchData() {
    try {
      const { fullName, email } = await getDataFromToken();
      if(fullName === '"exp" claim timestamp check failed') {
        setUserData({fullName:"",email:""})
      }else{
        setUserData({fullName,email})
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  async function handleLogout() {
    try {
      cookie.set("jwtToken", "");
      router.push("/login");
      toast.success("Logout Successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <div
      
      className={`w-screen h-auto bg-transparent z-50 flex items-center justify-between lg:gap-5 py-5 px-12`}
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
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5 }}
                className={`hover-link overflow-hidden relative text-white ${
                  pathname === link.href ? "active-link" : ""
                }`}
              >
                {link.title}
              </motion.p>
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
              <DropdownMenuItem
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleLogout()}
              >
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
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  Hi, {userData.fullName}
                </motion.p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleLogout()}
              >
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
