"use client";

import axios from "axios";
import { BASE_URL, PAGE_SIZE } from "../lib/utils";

export async function getAllOrders(page, query, status) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  let url = `${BASE_URL}/click-and-collect?per_page=${PAGE_SIZE}&page=${page}`;

  if (status) {
    url = `${BASE_URL}/click-and-collect?status=${status}&per_page=${PAGE_SIZE}&page=${page}`;
  }

  if (query) {
    url = `${BASE_URL}/click-and-collect/search?search=${query}&per_page=${PAGE_SIZE}&page=${page}`;
  }
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no order at that momment! Please add a new Order"
    );

  return data.data;
}

export async function getInvoice(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  let url = `${BASE_URL}/click-and-collect/invoice/${id}`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getOrder(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  let url = `${BASE_URL}/click-and-collect/order/${id}`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function updateOrderStatus(id, formData) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  let url = `${BASE_URL}/click-and-collect/update-status/${id}`;

  const { data } = await axios(url, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return data;
}

export async function createOrder(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const processData = {
    ...formData,
    product_id: Number(formData.product_id),
    varients: [{ attribute: "red", attribute_value: "yello" }],
  };

  const { data } = await axios(`${BASE_URL}/checkout`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: processData,
  });

  return data;
}

export async function deleteOrder(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(
    `${BASE_URL}/click-and-collect/order/delete/${id}`,
    {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function sendEmail(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(
    `${BASE_URL}/click-and-collect/order/send-notification`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }
  );

  return data;
}
