"use client";

import axios from "axios";
import { BASE_URL, RESOURCE_PAGE_SIZE } from "../lib/utils";

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

export async function getAllResourcesForAdmin(page) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(
    `${BASE_URL}/get-folders?per_page=${RESOURCE_PAGE_SIZE}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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

export async function deleteFolder(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/delete-folder/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
export async function CreateNewFile(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;
  console.log("Payload", formData);

  const { data } = await axios(`${BASE_URL}/upload-files`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: formData,
  });

  return data;
}

export async function getResource(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/folder/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function deleteResourceFile(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/delete-file`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return data;
}
