"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";
import { getCurrentUser } from "./apiAuth";

export async function getAllEventsForAdmin() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/promotional/calendar/get-all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getAllEvents() {
  const token = localStorage.getItem("access-token");
  const user = await getCurrentUser();

  if (!token || !user) return null;

  let url;

  if (user?.roles[0].id === 1) {
    url = `${BASE_URL}/promotional/calendar/get-all`;
  } else {
    url = `${BASE_URL}/promotional/calendar/get`;
  }

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getEvent(id) {
  const token = localStorage.getItem("access-token");

  if (!token || !id) return null;

  const { data } = await axios.get(
    `${BASE_URL}/promotional/calendar/get/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!data.data)
    throw new Error(
      "There is no Event at that momment! Please add a new Event"
    );

  return data.data;
}

export async function updateEvent(id, formData) {
  const token = localStorage.getItem("access-token");
  if (!token || !id) return null;

  const { data } = await axios({
    url: `${BASE_URL}/promotional/calendar/update/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return data;
}

export async function deleteEvent(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/promotional/calendar/delete/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function createEvent(formData) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  // const { data } = await axios({
  //   url: `${BASE_URL}/promotional/calendar/create`,
  //   method: "post",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   data: formData,
  // });

  // return data;
}
