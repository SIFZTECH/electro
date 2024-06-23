import UploadModal from "@/app/components/ui/UploadModal";
import { useForm } from "react-hook-form";

const UploadStock = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  return <UploadModal title="Upload New Stock File" btn="Upload" />;
};

export default UploadStock;
