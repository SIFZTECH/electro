"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllAttributes() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/data-attributes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no Attribute at that momment! Please add a new Attribute"
    );

  return data.data;
}

export async function getAllAttributeNames() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/all-attributes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no Attribute at that momment! Please add a new Attribute"
    );

  return data.data;
}

export async function getAttribute(categoryId) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/attributes/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no Attribute at that momment! Please add a new Attribute"
    );

  console.log(data);

  return data.data;
}

export async function updateAttribute(id, name) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/attributes/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
    },
  });

  return data;
}

export async function createAttribute({ name, value }) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/create-attribute`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name, value },
  });

  console.log(data);

  return data;
}
export async function createAttributeValue({ value, attribute_id }) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/create-attribute-value`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { value, attribute_id },
  });

  console.log(data);

  return data;
}

export async function deleteAttribute(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/attributes/${+id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id },
  });

  return data;
}
