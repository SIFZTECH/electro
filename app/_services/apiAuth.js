"use client";

import axios from "axios";

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

  console.log(data);

  return data;
}

export async function enableTwoFactorAuth(password) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: "https://electro-api.sifztech.com/api/admin/enable-2fa",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      password,
    },
  });

  return data;
}

export async function verifyOtp(otp) {
  const { data } = await axios({
    url: "https://electro-api.sifztech.com/api/admin/verify-otp",
    method: "post",
    data: {
      otp: otp,
    },
  });

  return data;
}

export async function logout() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: "https://electro-api.sifztech.com/api/admin/logout",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
