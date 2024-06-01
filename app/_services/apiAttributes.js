"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllAttributes() {
  const JWT = localStorage.getItem("access-token");
  const { data } = await axios.get(`${BASE_URL}/data-attributes`, {
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

export async function getAttribute(categoryId) {
  const JWT = localStorage.getItem("access-token");
  const { data } = await axios.get(`${BASE_URL}/attributes/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no category at that momment! Please add a new Category"
    );

  console.log(data);

  return data.data;
}

export async function updateAttribute(id, name) {
  const token = localStorage.getItem("access-token");

  const { data } = await axios({
    url: `${BASE_URL}/attributes/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
    },
  });

  return data;
}

export async function createAttribute({ name, category_id }) {
  const token = localStorage.getItem("access-token");

  const { data } = await axios({
    url: `${BASE_URL}/attributes`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name },
  });

  console.log(data);

  return data;
}

export async function deleteAttribute(id) {
  const token = localStorage.getItem("access-token");

  const { data } = await axios({
    url: `${BASE_URL}/attributes/${+id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id },
  });

  return data;
}
