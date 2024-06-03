"use client";

import axios from "axios";
import { BASE_URL } from "../lib/utils";

export async function getAllWarranties() {
  const token = localStorage.getItem("access-token");

  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/my-warranties`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function getWarranty(id) {
  const token = localStorage.getItem("access-token");

  if (!token && !id) return null;

  const { data } = await axios.get(`${BASE_URL}/warranty/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function createWarranty(formData) {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  const {
    firstname,
    lastname,
    email,
    phone,
    company_name,
    address,
    purchase_from,
    purchase_date,
    invoice_number,
    bike_frame_serial_no,
    bike_battery_serial_no,
    bike_motor_serial_no,
    invoice_image,
    frame_serial_no_image,
    battery_serial_no_image,
    motor_serial_no_image,
  } = formData;

  console.log(invoice_image[0]);

  const { data } = await axios({
    url: `${BASE_URL}/warranty/create`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    data: {
      firstname,
      lastname,
      email,
      phone,
      company_name,
      address,
      purchase_from,
      purchase_date,
      invoice_number,
      bike_frame_serial_no,
      bike_battery_serial_no,
      bike_motor_serial_no,
      invoice_image: invoice_image[0],
      frame_serial_no_image: frame_serial_no_image[0],
      battery_serial_no_image: battery_serial_no_image[0],
      motor_serial_no_image: motor_serial_no_image[0],
    },
  });

  return data;
}
