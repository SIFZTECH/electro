import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BASE_URL } from "@/app/lib/utils";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

const DownloadFiles = ({ selectedItems, setSelectedItems }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleDownload = async () => {
    const paths = Object.keys(selectedItems);

    try {
      const token = localStorage.getItem("access-token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${BASE_URL}/bulk-download`,
        {
          paths: paths,
        },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/zip",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded-file.zip";
      if (contentDisposition && contentDisposition.includes("filename=")) {
        fileName = contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/['"]/g, "");
      }
      a.download = fileName;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setSelectedItems({});
    } catch (error) {
      console.error("Download failed", error.response?.data || error.message);
      toast.error("Download failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleDownload)}>
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? <SpinnerMini /> : "Download Selected Files"}
      </button>
    </form>
  );
};

export default DownloadFiles;
