import "./globals.css";

import ReactQueryProvider from "@/app/components/ReactQueryProvider";
import { inter, playfair } from "@/app/lib/fonts";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Leon Cycle",
};

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`} lang="en">
      <body className="font-sans lg:flex overflow-x-hidden">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: {
              style: { backgroundColor: "#22c55e", color: "#fff" },
              // Make success toast closable
              icon: true,
              closeable: true,
              duration: 2000,
            },
            error: {
              style: { backgroundColor: "#ef4444", color: "#fff" },
              // Make error toast closable
              icon: true,
              closeable: true,
              duration: 2000,
            },
            style: {
              textAlign: "center",
              fontSize: "16px",
              borderRadius: "5px",
            },
          }}
        />
      </body>
    </html>
  );
}
