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

  return data;
}
export async function createProduct({
  name,
  price,
  introduction,
  stock,
  category_id,
  subcategory_id,
  brand_id,
  key_features,
  variants,
  specifications,
  images,
}) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/add-product`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: {
      name,
      price,
      introduction,
      stock,
      category_id: +category_id,
      subcategory_id: +subcategory_id,
      brand_id,
      key_features,
      variants,
      specifications,
      images,
    },
  });

  return data;
}

export async function getProduct(slug) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/product/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);

  return data.data;
}
