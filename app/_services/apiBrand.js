"use client";

import axios from "axios";
import { BASE_URL, CATAGORY_PAGE_SIZE } from "../lib/utils";

export async function getAllBrands(page) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(
    `${BASE_URL}/brands?per_page=${CATAGORY_PAGE_SIZE}&page=${page}`,
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

export async function getAllBrandsForSelect() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/brands?per_page=500`, {
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

export async function getBrand(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/brands/${id}`, {
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

export async function updateBrand(id, name) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/brands/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: name,
  });

  return data;
}

export async function deleteBrand(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/brands/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id },
  });

  return data;
}

export async function createBrand(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/brands`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return data;
}
