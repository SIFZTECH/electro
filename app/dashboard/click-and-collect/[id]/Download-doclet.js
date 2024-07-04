"use client";
import axios from "axios";
import { useState } from "react";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BASE_URL } from "@/app/lib/utils";

const DownloadFile = ({ id }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [downloading, setDownloading] = useState(false);

  async function onSubmit() {
    try {
      setDownloading(true);

      const token = localStorage.getItem("access-token");

      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/click-and-collect/download-invoice/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Important: responseType as 'blob' for file download
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "order.pdf");
      document.body.appendChild(link);
      link.click();
      setDownloading(false);

      // toast.success("CSV file downloaded successfully!");
    } catch (err) {
      console.error(err);
      setDownloading(false);

      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-end">
      <button
        type="submit"
        className="btn-primary"
        disabled={isSubmitting || downloading}
      >
        {downloading ? <SpinnerMini /> : "Download Docket"}
      </button>
    </form>
  );
};

export default DownloadFile;