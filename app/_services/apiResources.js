"use client";

import axios from "axios";
import { BASE_URL, RESOURCE_PAGE_SIZE } from "../lib/utils";

export async function getAllResources(page) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/dealer-resources`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

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

export async function getAllResourcesForAdmin(page, query) {
  const token = localStorage.getItem("access-token");
  const user = await getCurrentUser();

  if (!token || !user) return null;

  let url = `${BASE_URL}/get-folders?per_page=${RESOURCE_PAGE_SIZE}&page=${page}`;
  let url2 = `${BASE_URL}/dealer-resources?per_page=${RESOURCE_PAGE_SIZE}&page=${page}`;

  if (query) {
    url = `${BASE_URL}/search-dealer-resource?search=${query}&per_page=${RESOURCE_PAGE_SIZE}&page=${page}`;
    url2 = `${BASE_URL}/search-dealer-resource?search=${query}&per_page=${RESOURCE_PAGE_SIZE}&page=${page}`;
  }

  if (user && user.roles[0].name === "admin") {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } else {
    const { data } = await axios.get(url2, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

// export async function getAllResourcesForAdmin(page) {
//   const token = localStorage.getItem("access-token");

//   if (!token) return null;

//   const { data } = await axios.get(
//     `${BASE_URL}/get-folders?per_page=${RESOURCE_PAGE_SIZE}&page=${page}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return data.data;
// }

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
export async function EditFolder(id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/update-folder/${id}`, {
    method: "put",
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

  const user = await getCurrentUser();
  if (!token || !user) return null;
  if (user.roles[0].name === "admin") {
    const { data } = await axios(`${BASE_URL}/folder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } else {
    const { data } = await axios(`${BASE_URL}/dealer/folder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
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
