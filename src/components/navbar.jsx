"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Links = [
  { id: 1, href: "/", title: "Home" },
  { id: 2, href: "/success", title: "Events" },
  { id: 3, href: "/tickets", title: "Tickets" },
  { id: 4, href: "/sponsors", title: "Sponsors" },
  { id: 5, href: "/contact", title: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-screen h-auto bg-transparent z-50 flex items-center justify-between lg:justify-start lg:gap-5 bg-blue-400 py-5 px-12">
      <div>
        <Link href="/">
          <Image src="/main.png" width="200" height="200" alt="logo" className="mix-blend-lighten"  />
        </Link>
      </div>
      <div className="gap-5 items-start hidden lg:flex">
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
      <div className="flex lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="w-8 h-8 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Links.map((link) => (
              <Link key={link.id} href={link.href}>
                <DropdownMenuItem>{link.title}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
