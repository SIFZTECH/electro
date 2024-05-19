import "./globals.css";
import { inter, playfair } from "./lib/fonts";
import Sidebar from "./ui/Sidebar";

export const metadata = {
  title: "Electro | Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`} lang="en">
      <body className="font-sans lg:flex  overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}
