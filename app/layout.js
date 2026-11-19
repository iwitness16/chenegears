import localFont from "next/font/local";
import Script from "next/script";
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
  description: "Waders, jackets, and boots built by waterfowl hunters. Lifetime warranty. Repaired in-house within 7 business days.",
  metadataBase: new URL("https://chenegears.com"),
  openGraph: {
    title: "Chêne Gear | Built by Waterfowl Hunters",
    description: "Waders, jackets, and boots built by waterfowl hunters. Lifetime warranty. Repaired in-house within 7 business days.",
    url: "https://chenegears.com",
    siteName: "Chêne Gear",
    images: [
      {
        url: "/images/fav.jpg",
        width: 1200,
        height: 630,
        alt: "Chêne Gear — Built by Waterfowl Hunters",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chêne Gear | Built by Waterfowl Hunters",
    description: "Waders, jackets, and boots built by waterfowl hunters.",
    images: ["/images/fav.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <head>
        {/* Smartsupp Live Chat — placed in <head> exactly as instructed */}
        <Script
          id="smartsupp-chat"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
var _smartsupp = _smartsupp || {};
_smartsupp.key = 'f91864637401f4b33c53beb052304b3212e384fd';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
            `,
          }}
        />
      </head>
      <body>
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
