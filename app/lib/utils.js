import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = "https://electro-api.sifztech.com/api";
export const PAGE_SIZE = 8;
export const PRODUCT_PAGE_SIZE = 20;
export const MEDIA_PAGE_SIZE = 20;
export const WARRANTY_PAGE_SIZE = 10;
export const TABLE_PAGE_SIZE = 1000;
export const RESOURCE_PAGE_SIZE = 20;
export const SOCIALMEDIAASSESTS_PAGE_SIZE = 20;
export const STOCKS_PAGE_SIZE = 20;
export const STORES_PAGE_SIZE = 20;
export const BASE_URL_IMAGE = "https://electro-api.sifztech.com";

export function getCoordinatesFromUrl(url) {
  const regex = /@(.*?),(.*?),(.*?)(z|m|a)/;
  const match = url.match(regex);

  if (match) {
    const [latitude, longitude] = match.slice(1, 3).map(Number);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      return { latitude, longitude };
    }
  }

  return null;
}
