"use client";

import axios from "axios";
import { BASE_URL, PRODUCT_PAGE_SIZE } from "../lib/utils";

export async function getAllProducts({ categoryId, brandId, page, query }) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/products`;

  if (page) {
    url = `${BASE_URL}/products?per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }

  if (categoryId) {
    url = `${BASE_URL}/products?category=${categoryId}&per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }
  if (brandId) {
    url = `${BASE_URL}/products?brand=${brandId}&per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }

  if (query) {
    url = `${BASE_URL}/search-products?search=${query}&per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getAllProductsForPublic({
  categoryId,
  brandId,
  page,
  query,
}) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/public/products`;

  if (page) {
    url = `${BASE_URL}/public/products?per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }

  if (categoryId) {
    url = `${BASE_URL}/public/products?category=${categoryId}&per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }
  if (brandId) {
    url = `${BASE_URL}/public/products?brand=${brandId}&per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }

  if (query) {
    url = `${BASE_URL}/public/search-products?search=${query}&per_page=${PRODUCT_PAGE_SIZE}&page=${page}`;
  }

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
export async function createProduct(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;
  const productIds = formData.compare.map((product) => +product.id);

  const { data } = await axios(`${BASE_URL}/add-product`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: {
      ...formData,
      compare: productIds,
    },
  });

  return data;
}

export async function getProduct(slug) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/product/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function updateProduct(id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const productIds = formData.compare.map((product) => +product.id);

  const { data } = await axios(`${BASE_URL}/update-product/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: {
      ...formData,
      compare: productIds,
      _method: "PUT",
    },
  });

  return data;
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/delete-product/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function deleteImage(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/delete-product-image/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
