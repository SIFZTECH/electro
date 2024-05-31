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

  return data;
}

export async function changePassword({
  old_password,
  new_password,
  new_password_confirmation,
}) {
  const { data } = await axios({
    url: "https://electro-api.sifztech.com/api/admin/change-password",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },

    data: {
      old_password,
      new_password,
      new_password_confirmation,
    },
  });

  console.log(data);

  return data;
}

export async function profileSettings({
  user_id,
  firstname,
  lastname,
  phone,
  company_name,
  weburl,
  abn,
  purchase_date,
  invoice_number,
  description,
  street_address,
  city,
  postal_code,
  state,
  logo,
  stockfeedurl,
}) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: "https://electro-api.sifztech.com/api/dealer/settings",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id: 1,
      firstname,
      lastname,
      phone,
      company_name,
      weburl,
      abn,
      purchase_date,
      invoice_number,
      description,
      street_address,
      city,
      postal_code,
      state,
      logo,
      stockfeedurl,
    },
  });

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

export async function disbleTwoFactorAuth(password) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: "https://electro-api.sifztech.com/api/admin/disable-2fa",
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
export async function resendOtp(otp) {
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
