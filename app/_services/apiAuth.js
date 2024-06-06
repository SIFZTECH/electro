"use client";

import axios from "axios";
import { BASE_URL, PAGE_SIZE } from "../lib/utils";

export async function getCurrentUser() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/admin/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function login({ email, password }) {
  const { data } = await axios({
    url: `${BASE_URL}/admin/login`,
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
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/change-password`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    url: `${BASE_URL}/dealer/settings`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
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

export async function enableTwoFactorAuth({ two_fa_email, channel, phone }) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let bodyData;

  if (channel === "email") {
    bodyData = {
      two_fa_email,
      channel,
    };
  }
  if (channel === "number") {
    bodyData = {
      phone,
      channel,
    };
  }

  const { data } = await axios({
    url: `${BASE_URL}/admin/enable-2fa`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: bodyData,
  });

  return data;
}

export async function verifyOtpForLogin(otp) {
  const { data } = await axios({
    url: `${BASE_URL}/admin/verify-otp`,
    method: "post",
    data: {
      otp: otp,
    },
  });

  return data;
}

export async function verifyOtpForEnable(otp) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/verify-2fa-otp`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      otp: otp,
    },
  });

  return data;
}

export async function disbleTwoFactorAuth() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/disable-2fa`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function resendOtp(formData) {
  const { data } = await axios({
    url: `${BASE_URL}/admin/resend-otp`,
    method: "post",
    data: formData,
  });

  console.log(data);

  return data;
}

export async function logout() {
  const token = localStorage.getItem("access-token");

  const { data } = await axios({
    url: `${BASE_URL}/admin/logout`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getAllUsers(page) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/admin/users-and-admin?per_page=${PAGE_SIZE}`;

  if (page) {
    url = `${BASE_URL}/admin/users-and-admin?per_page=${PAGE_SIZE}&page=${page}`;
  }

  const { data } = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getAllAdminUsers() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/users-and-admin?role=admin`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getAllBlockedUsers() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/users-and-admin?block=true`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function userBlock(user_id, option) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/user-block`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id,
      block: option,
    },
  });

  return data;
}

export async function getAllRoles() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/all-roles`,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function assignRole(user_id, role) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/create-user-permission`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id,
      role,
    },
  });

  return data;
}
