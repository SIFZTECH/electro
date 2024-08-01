"use client";

import axios from "axios";
import { BASE_URL, TABLE_PAGE_SIZE } from "../lib/utils";

export async function getAllFeatures(page) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(
    `${BASE_URL}/key-features?per_page=${TABLE_PAGE_SIZE}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!data.data)
    throw new Error(
      "There is no brand at that momment! Please add a new Brand"
    );

  return data.data;
}

export async function getAllFeaturesForSelect() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/key-features?per_page=500`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no brand at that momment! Please add a new Brand"
    );

  return data.data;
}

export async function getAllBrandsForPublic() {
  const { data } = await axios.get(`${BASE_URL}/public/brands`);

  if (!data.data)
    throw new Error(
      "There is no brand at that momment! Please add a new Brand"
    );

  return data.data;
}

export async function getFeature(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/key-features/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no Brand at that momment! Please add a new Brand"
    );

  return data.data;
}

export async function updateFeature(id, formData) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/key-features/${id}`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: { ...formData, _method: "PUT" },
  });

  return data;
}

export async function deleteFeature(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/key-features/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id },
  });

  return data;
}

export async function createFeature(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/key-features`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: formData,
  });

  return data;
}
