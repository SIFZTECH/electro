"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function createOrder(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const processData = {
    ...formData,
    product_id: Number(formData.product_id),
  };

  console.log(processData);
  const { data } = await axios(`${BASE_URL}/checkout`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: processData,
  });

  return data;
}
