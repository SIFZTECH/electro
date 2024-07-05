import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getDashboardStats() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/dashbord-statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
