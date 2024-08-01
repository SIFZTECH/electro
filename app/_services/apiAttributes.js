"use client";

import axios from "axios";
import { BASE_URL, TABLE_PAGE_SIZE } from "../lib/utils";

export async function getAllAttributes() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(
    `${BASE_URL}/data-attributes?per_page=${TABLE_PAGE_SIZE}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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

  return data;
}

export async function deleteAttribute(name) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/delete-attribute/${name}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
export async function deleteAttributeValue(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/delete-attribute-value/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function deleteVariant({ product_id, attribute_value_id }) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/delete-product-varient`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      product_id,
      attribute_value_id,
    },
  });

  return data;
}
