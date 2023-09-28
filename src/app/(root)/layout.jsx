"use client";
import Hero from "../../components/hero";
import "../globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "../../components/ui/toaster";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Business Conclave",
  description: "3rd Edition",
};

export default function RootLayout({ children }) {
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowButton(false);
    }, 7000);

    return () => {
      clearTimeout(delay);
    };
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          {showButton ? (
            <div className="h-screen w-screen flex items-center justify-center">
              <video src="https://res.cloudinary.com/diynkxbpc/video/upload/v1695910897/conclave_xxjeki.mp4"  autoPlay muted/>
            </div>
          ) : (
            <>
              <Hero isLogin={true} />
              {children}
              <Toaster />
            </>
          )}
        </>
      </body>
    </html>
  );
}
