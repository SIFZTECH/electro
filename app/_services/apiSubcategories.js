"use client";

import axios from "axios";
import { BASE_URL, TABLE_PAGE_SIZE } from "../lib/utils";

export async function getAllSubcategories(page) {
  const JWT = localStorage.getItem("access-token");

  let url = `${BASE_URL}/subcategories?per_page=${TABLE_PAGE_SIZE}&page=${page}`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no category at that momment! Please add a new Category"
    );

  return data.data;
}

export async function getSubcategory(categoryId) {
  const JWT = localStorage.getItem("access-token");
  const { data } = await axios.get(`${BASE_URL}/subcategories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no category at that momment! Please add a new Category"
    );

  return data.data;
}

export async function updateSubcategory(id, name, category_id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/subcategories/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
      category_id,
    },
  });

  return data;
}

export async function createSubcategory({ name, category_id }) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/subcategories`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name, category_id: +category_id },
  });

  return data;
}

export async function deleteSubcategory(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/subcategories/${+id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id },
  });

  return data;
}
