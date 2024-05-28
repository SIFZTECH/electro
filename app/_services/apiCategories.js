"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllCategories() {
  const JWT = localStorage.getItem("access-token");
  const { data } = await axios.get(`${BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  console.log(data);

  return data.data;
}

// export async function getProduct(slug) {
//   const { data } = await axios.get(`${BASE_URL}/api/product/${slug}`);

//   return data.data;
// }
