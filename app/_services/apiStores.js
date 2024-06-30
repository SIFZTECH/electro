import axios from "axios";
import { BASE_URL, STORES_PAGE_SIZE } from "../lib/utils";

export async function getAllStores(page, query) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  console.log(query);
  let url = `${BASE_URL}/find/dealer/get-all?per_page=${STORES_PAGE_SIZE}&page=${page}`;

  if (query) {
    const { data } = await axios({
      url: `${BASE_URL}/find/dealer/search?search=${query}?per_page=${STORES_PAGE_SIZE}&page=${page}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data;
  } else {
    const { data } = await axios({
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  }
}

export async function createStore(formData) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const process_data = {
    ...formData,
    logo: formData.logo[0],
  };

  const { data } = await axios({
    url: `${BASE_URL}/find/dealer/create`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: process_data,
  });

  return data;
}

export async function updateStore(id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/find/dealer/update/${id}`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: { ...formData, logo: formData.logo[0], _method: "PUT" },
  });

  return data;
}

export async function deleteStore(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/find/dealer/delete/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
