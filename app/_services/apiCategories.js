"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllCategories() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function getCategory(categoryId) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  if (!categoryId) return;

  const { data } = await axios.get(`${BASE_URL}/categories/${+categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function updateCategory(categoryId, name) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/categories/${categoryId}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: name,
  });

  return data;
}

export async function deleteCategory(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/categories/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id },
  });

  return data;
}

export async function createCategory(name) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/categories`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name },
  });

  return data;
}
