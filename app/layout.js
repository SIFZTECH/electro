import "./globals.css";

import ReactQueryProvider from "@/app/components/ReactQueryProvider";
import { inter, playfair } from "@/app/lib/fonts";
// import { Toaster } from "./components/ui/toaster";
import { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

export const metadata = {
  title: "Leon Cycle",
};

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`} lang="en">
      <body className="font-sans lg:flex overflow-x-hidden">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: { backgroundColor: "#22c55e", color: "#fff" },
            },
            error: { style: { backgroundColor: "#ef4444", color: "#fff" } },
            icon: false,
            style: {
              textAlign: "center",
              fontSize: "16px",
              borderRadius: "5px",
            },
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
