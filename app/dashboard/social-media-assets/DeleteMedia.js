import { deleteMedia } from "@/app/_services/apiMedia";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteMedia = ({ item }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await deleteMedia(item);
      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("media");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <button className="w-full flex justify-end mt-4">
        <span className="btn-primary bg-red-500 text-white">
          {isSubmitting ? <SpinnerMini /> : "Delete"}
        </span>
      </button>
    </form>
  );
};

export default DeleteMedia;
