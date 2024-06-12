"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllProducts() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);
  return data;
}

export async function getProduct(slug) {
  const { data } = await axios.get(`${BASE_URL}/product/${slug}`);

  return data.data;
}
