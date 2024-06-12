"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllEvents() {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data.data)
    throw new Error(
      "There is no Event at that momment! Please add a new Brand"
    );

  return data.data;
}

export async function getEvent(id) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

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

  console.log(data);

  return data.data;
}

export async function updateEvent(id, name) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/Events/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: name,
  });

  return data;
}

export async function deleteEvent(id) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/Events/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id },
  });

  return data;
}

export async function createEvent({ date, title, visible_to }) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/promotional/calendar/create`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { date, title, visible_to },
  });

  return data;
}
