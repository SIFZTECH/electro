import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = "https://electro-api.sifztech.com/api";
export const PAGE_SIZE = 5;
