import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SiteShell from "@/components/SiteShell";

// Headings / nav / buttons — Montserrat served from local files
const head = localFont({
  src: [
    { path: "../public/fonts/montserrat-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/montserrat-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/montserrat-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-head",
  display: "swap",
});

// Body copy — Nunito served from local files
const body = localFont({
  src: [
    { path: "../public/fonts/nunito-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/nunito-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/nunito-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Chêne | Waders, Jackets & Boots Built by Waterfowl Hunters",
  description: "Waders, jackets, and boots built by waterfowl hunters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
