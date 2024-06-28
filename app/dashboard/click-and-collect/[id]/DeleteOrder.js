import { deleteOrder } from "@/app/_services/apiOrders";
import { deleteResourceFile } from "@/app/_services/apiResources";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteOrder = ({ id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await deleteOrder(id);

      if (res) {
        toast.success(res.message);
        router.back(-1);
        queryClient.invalidateQueries("orders");
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
          {isSubmitting ? <SpinnerMini /> : "Delete Order"}
        </span>
      </button>
    </form>
  );
};

export default DeleteOrder;
