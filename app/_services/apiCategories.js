"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllCategories() {
  const JWT = localStorage.getItem("access-token");
  const { data } = await axios.get(`${BASE_URL}/categories`, {
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
