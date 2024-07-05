"use client";

import axios from "axios";
import { BASE_URL, SOCIALMEDIAASSESTS_PAGE_SIZE } from "../lib/utils";
import { getCurrentUser } from "./apiAuth";

export async function getAllSocialMediaAssets(page, query) {
  const token = localStorage.getItem("access-token");
  const user = await getCurrentUser();

  if (!token || !user) return null;

  let url = `${BASE_URL}/social-media-assets/get-folders?per_page=${SOCIALMEDIAASSESTS_PAGE_SIZE}&page=${page}`;
  let url2 = `${BASE_URL}/social-assets?per_page=${SOCIALMEDIAASSESTS_PAGE_SIZE}&page=${page}`;

  if (query) {
    url = `${BASE_URL}/search-social-media-assets?search=${query}&per_page=${SOCIALMEDIAASSESTS_PAGE_SIZE}&page=${page}`;
    url2 = `${BASE_URL}/search-social-media-assets?search=${query}&per_page=${SOCIALMEDIAASSESTS_PAGE_SIZE}&page=${page}`;
  }

  if (user && user.roles[0].id === 1) {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } else if (user && user.roles[0].id === 2) {
    const { data } = await axios.get(url2, {
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
  const user = await getCurrentUser();
  if (!token || !user) return null;

  if (user.roles[0].id === 1) {
    const { data } = await axios(
      `${BASE_URL}/social-media-assets/folder/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } else {
    const { data } = await axios(`${BASE_URL}/social/folder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

export async function CreateNewMediaFile(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

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
