import axios from "axios";
import { BASE_URL, PAGE_SIZE } from "../lib/utils";

export async function getAllUsers(page) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/admin/users-and-admin?per_page=${PAGE_SIZE}`;

  if (page) {
    url = `${BASE_URL}/admin/users-and-admin?per_page=${PAGE_SIZE}&page=${page}`;
  }

  const { data } = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function searchUsers(query) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/users/search`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { query },
  });

  return data;
}

export async function createPermission(name) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/create-permission`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name },
  });

  return data;
}
export async function createNewRole(name) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/create-role`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name },
  });

  return data;
}

export async function createRolesWithPermission(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const role_name = formData.role_name;

  const permissions = Object.entries(formData)
    .filter(([key, value]) => key !== "role_name" && value !== false)
    .map((val) => val[0]);

  const { data } = await axios({
    url: `${BASE_URL}/admin/assign-permission-in-role`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { role_name, permission_name: permissions },
  });

  return data;
}
