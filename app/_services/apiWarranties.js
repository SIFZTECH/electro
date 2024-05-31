"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllWarranties() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/my-warranties`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);

  return data.data;
}
