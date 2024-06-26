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

  return data;
}

export async function profileSettings(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const processedData = {
    ...formData,
    logo: formData.logo[0],
    weeks: formData.weeks.map((week) => ({
      ...week,
      is_holiday: week.is_holiday === "0" ? 1 : 0,
    })),
  };

  console.log("process", processedData);

  const { data } = await axios({
    url: `${BASE_URL}/dealer/settings`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: processedData,
  });

  return data;
}

export async function profileSettingsForNonDealer({
  firstname,
  lastname,
  profile,
}) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let profileResponse, nameResponse;

  if (profile.length > 0) {
    profileResponse = await axios({
      url: `${BASE_URL}/admin/update-profile`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: {
        profile: profile[0],
      },
    });
  }

  if (firstname && lastname) {
    nameResponse = await axios({
      url: `${BASE_URL}/admin/update-me`,
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        firstname,
        lastname,
      },
    });
  }

  return {
    profileResponse: profileResponse?.data,
    nameResponse: nameResponse?.data,
  };
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

export async function addUser(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/add-user`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return data;
}

export async function updateUser(user_id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/update-user/${user_id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
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
