"use client";

import axios from "axios";
import { BASE_URL, MEDIA_PAGE_SIZE } from "../lib/utils";

export async function getAllMedia(page) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/media?per_page=${MEDIA_PAGE_SIZE}`;

  if (page) {
    url = `${BASE_URL}/media?per_page=${MEDIA_PAGE_SIZE}&page=${page}`;
  }

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function deleteMedia(path) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios(`${BASE_URL}/delete-media`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      path,
    },
  });

  return data;
}
