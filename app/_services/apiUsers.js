import axios from "axios";
import { BASE_URL, PAGE_SIZE } from "../lib/utils";

export async function getAllUsers(page, block, query) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/admin/users-and-admin?per_page=${PAGE_SIZE}&page=${page}`;

  if (block) {
    url = `${BASE_URL}/admin/users-and-admin?per_page=${PAGE_SIZE}&page=${page}&block=true`;
  }

  if (query) {
    const { data } = await axios({
      url: `${BASE_URL}/admin/users/search`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { query, block },
    });

    return data;
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

export async function createNewRole(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const name = formData.name;

  const permission_name = Object.entries(formData)
    .filter(([key, value]) => key !== "name" && value !== false)
    .map((val) => val[0]);

  const { data } = await axios({
    url: `${BASE_URL}/admin/create-role`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name, permission_name },
  });

  return data;
}

export async function updateRole(id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const name = formData.name;

  const permission_name = Object.entries(formData)
    .filter(([key, value]) => key !== "name" && value !== false)
    .map((val) => val[0]);

  const { data } = await axios({
    url: `${BASE_URL}/admin/update-role/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name, permission_name },
  });

  return data;
}

export async function deleteRole(role_name) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/roles/delete`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { role_name },
  });

  return data;
}

export async function deletePermission(permission_name) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/admin/permissions/delete`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { permission_name },
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
