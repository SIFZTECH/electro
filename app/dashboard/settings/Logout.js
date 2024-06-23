"use client";

import { logout } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GrLogout } from "react-icons/gr";

const Logout = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function handleLogout() {
    try {
      const res = await logout();
      if (res.data === "SUCCESS") {
        toast.success(res.message);

        localStorage.removeItem("access-token");
        router.replace("/login");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <form
      className="bg-gray-50 mt-6 md:mt-0 flex gap-3 items-center rounded-xl font-sans py-2 px-3 text-center"
      onSubmit={handleSubmit(handleLogout)}
    >
      <button
        onClick={handleLogout}
        className="text-gray-900 flex items-center gap-2 font-semibold justify-center w-full text-lg"
      >
        {isSubmitting ? (
          <SpinnerMini />
        ) : (
          <>
            <GrLogout />
            <span>Logout</span>
          </>
        )}
      </button>
    </form>
  );
};

export default Logout;
