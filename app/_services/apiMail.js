import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllMailTemplates() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/mail/all-templates`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getMailTemplate(name) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/mail/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function updateMailTemplate(name, body) {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios({
    url: `${BASE_URL}/mail/update/${name}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: body,
  });

  return data;
}
