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
export async function createProduct(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;
  const productIds = formData.compare.map((product) => +product.id);

  const { data } = await axios(`${BASE_URL}/add-product`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: {
      ...formData,
      compare: productIds,
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

  return data.data;
}
export async function updateProduct(id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const productIds = formData.compare.map((product) => +product.id);

  const { data } = await axios(`${BASE_URL}/update-product/${id}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...formData,
      compare: productIds,
    },
  });

  return data;
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/delete-product/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);

  return data;
}
