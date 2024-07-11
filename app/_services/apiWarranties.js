"use client";

import axios from "axios";
import { BASE_URL, PAGE_SIZE, WARRANTY_PAGE_SIZE } from "../lib/utils";

export async function getAllWarranties() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/my-warranties`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function getAllWarrantiesForAdmin(page) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(
    `${BASE_URL}/warranties?per_page=${WARRANTY_PAGE_SIZE}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.data;
}

export async function getWarrantyStats() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/warranty/get-statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getWarranty(id) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios.get(`${BASE_URL}/warranty/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
export async function deleteWarranty(id) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios(`${BASE_URL}/warranty/delete/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function updateWarrantyStatus(id, { status, message }) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  let bodyData = { status };

  if (message) {
    bodyData = {
      status,
      message,
    };
  }

  const { data } = await axios(`${BASE_URL}/warranty/update/${id}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: bodyData,
  });

  return data;
}

export async function updateWarranty(id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios(`${BASE_URL}/my-warranty-update/${id}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: {
      ...formData,
      _method: "PUT",
    },
  });

  return data;
}

export async function createWarranty(formData) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  console.log(formData);
  const { data } = await axios({
    url: `${BASE_URL}/warranty/create`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: formData,
  });

  return data;
}
