import Hero from "../../components/hero";
import "../globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "../../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Business Conclave",
  description: "3rd Edition",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Hero isLogin={true} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
