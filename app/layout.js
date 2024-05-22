import "./globals.css";
import { inter, playfair } from "./lib/fonts";
import AppLayout from "./ui/AppLayout";

export const metadata = {
  title: "Electro | Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`} lang="en">
      <body className="font-sans lg:flex  overflow-x-hidden">
        {/* <AppLayout>{children}</AppLayout> */}
        {children}
      </body>
    </html>
  );
}
