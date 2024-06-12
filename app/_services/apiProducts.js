"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllProducts() {
  const { data } = await axios.get(`${BASE_URL}/products`);

  console.log(data);
  return data;
}

export async function getProduct(slug) {
  const { data } = await axios.get(`${BASE_URL}/product/${slug}`);

  return data.data;
}
