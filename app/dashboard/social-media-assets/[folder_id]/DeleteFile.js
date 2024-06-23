import { deleteMediaFile } from "@/app/_services/apiMedia";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteFile = ({ file_path, folder_id }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await deleteMediaFile({ folder_id, file_path });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("folder", folder_id);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <form className="w-full flex justify-end" onSubmit={handleSubmit(onSubmit)}>
      <button className="mt-4">
        <span className="btn-primary bg-red-500 text-white inline-block">
          {isSubmitting ? <SpinnerMini /> : "Delete"}
        </span>
      </button>
    </form>
  );
};

export default DeleteFile;