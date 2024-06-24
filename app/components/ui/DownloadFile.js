import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SpinnerMini from "./SpinnerMini";

const DownloadButton = ({ fileUrl }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("access-token");

      const response = await axios.get(fileUrl, {
        responseType: "blob", // Important for handling binary data
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded-file";
      if (contentDisposition && contentDisposition.includes("filename=")) {
        fileName = contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/['"]/g, ""); // Remove any quotes
      }
      a.download = fileName;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Clean up the DOM
      window.URL.revokeObjectURL(url); // Revoke the object URL
    } catch (error) {
      toast.error("Download failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleDownload)}>
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? <SpinnerMini /> : "Download"}
      </button>
    </form>
  );
};

export default DownloadButton;
