"use client";

import { useToast } from "@/app/_hooks/use-toast";
import { logout } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GrLogout } from "react-icons/gr";

const Logout = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function handleLogout() {
    try {
      const res = await logout();
      if (res.data === "SUCCESS") {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });

        localStorage.removeItem("access-token");
        router.replace("/login");
      }
    } catch (err) {
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
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
