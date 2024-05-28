"use client";

import axios from "axios";
import { useLocalStorageState } from "../_hooks/useLocalStorageState";

export async function getCurrentUser() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(
    "https://electro-api.sifztech.com/api/admin/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.data;
}

export async function login({ email, password }) {
  const { data } = await axios({
    url: "https://electro-api.sifztech.com/api/admin/login",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: {
      email,
      password,
    },
  });

  return data.data;
}
