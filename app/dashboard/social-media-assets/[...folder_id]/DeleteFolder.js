import { deleteMediaFolder } from "@/app/_services/apiMedia";
import { deleteFolder } from "@/app/_services/apiResources";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteFolder = ({ folder_id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await deleteMediaFolder(folder_id);

      if (res) {
        toast.success(res.message);

        router.back(-1);
        queryClient.invalidateQueries("social_assets");
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
    <Dialog>
      <DialogTrigger className="btn-primary bg-red-500 text-white">
        Delete Folder
      </DialogTrigger>
      <DialogContent>
        <h1>Are you sure! You want to delete this Folder</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-end gap-3 mt-8">
            <DialogClose>Close</DialogClose>
            <button type="submit" className="btn-primary bg-red-500 text-white">
              {isSubmitting ? <SpinnerMini /> : "Delete"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFolder;
