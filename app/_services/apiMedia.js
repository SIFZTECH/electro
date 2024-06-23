"use client";

import axios from "axios";
import { BASE_URL, SOCIALMEDIAASSESTS_PAGE_SIZE } from "../lib/utils";
import { getCurrentUser } from "./apiAuth";

export async function getAllSocialMediaAssets(page) {
  const token = localStorage.getItem("access-token");
  const user = await getCurrentUser();

  if (!token || !user) return null;
  if (user && user.roles[0].name === "admin") {
    const { data } = await axios.get(
      `${BASE_URL}/social-media-assets/get-folders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } else if (user && user.roles[0].name === "dealer") {
    const { data } = await axios.get(`${BASE_URL}/social-assets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

export async function CreateNewSocialAssets(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(
    `${BASE_URL}/social-media-assets/create-folder`,
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

export async function getMediaAsset(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/social-media-assets/folder/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function CreateNewMediaFile(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;
  console.log("Payload", formData);

  const { data } = await axios(`${BASE_URL}/social-media-assets/upload-files`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: formData,
  });

  return data;
}

export async function EditFolder(id, formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(
    `${BASE_URL}/social-media-assets/update-folder/${id}`,
    {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }
  );

  return data;
}

export async function deleteMediaFolder(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(
    `${BASE_URL}/social-media-assets/delete-folder/${id}`,
    {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function deleteMediaFile(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios(`${BASE_URL}/social-media-assets/delete-file`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return data;
}

export async function getAllMedia(page) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  let url = `${BASE_URL}/media?per_page=${MEDIA_PAGE_SIZE}`;

  if (page) {
    url = `${BASE_URL}/media?per_page=${MEDIA_PAGE_SIZE}&page=${page}`;
  }

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function deleteMedia(path) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios(`${BASE_URL}/delete-media`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      path,
    },
  });

  return data;
}
