import Hero from "../../components/hero";
import "../globals.css";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
export const metadata = {
  title: "Business Conclave",
  description: "3rd Edition",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Hero isLogin={true} />
        {children}

      </body>
    </html>
  );
}
