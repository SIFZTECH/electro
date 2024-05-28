import "./globals.css";

import ReactQueryProvider from "@/app/components/ReactQueryProvider";
import { inter, playfair } from "@/app/lib/fonts";
import { Toaster } from "./components/ui/toaster";

export const metadata = {
  title: "Leon Cycle",
};

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`} lang="en">
      <body className="font-sans lg:flex  overflow-x-hidden">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
