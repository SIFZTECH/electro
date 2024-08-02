import { deleteResourceFile } from "@/app/_services/apiResources";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteFiles = ({ selectedItems, setSelectedItems, folder_id }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    const paths = Object.keys(selectedItems);

    try {
      const res = await deleteResourceFile({ folder_id, file_paths: paths });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("folder", folder_id);
        setSelectedItems({});
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
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <button>
        <span className="btn-primary bg-red-500 text-white inline-block">
          {isSubmitting ? <SpinnerMini /> : "Delete Selected Files"}
        </span>
      </button>
    </form>
  );
};

export default DeleteFiles;
