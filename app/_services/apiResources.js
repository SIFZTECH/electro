"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllResources() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/dealer-resources`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}
export async function getAllResourcesForAdmin() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/get-folders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function getResources(id) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios.get(`${BASE_URL}/media/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
