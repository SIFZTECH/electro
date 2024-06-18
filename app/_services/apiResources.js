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

export async function CreateNewResource(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/create-folder`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return data;
}
