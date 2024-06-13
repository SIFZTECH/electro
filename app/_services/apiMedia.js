"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllMedia(icon) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/media`;

  if (icon) {
    url = `${BASE_URL}/media?icon={true}`;
  }
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function getMedia(id) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios.get(`${BASE_URL}/media/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
