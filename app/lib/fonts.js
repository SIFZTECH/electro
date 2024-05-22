import { Merriweather, Poppins } from "next/font/google";

export const playfair = Merriweather({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});
export const inter = Poppins({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
