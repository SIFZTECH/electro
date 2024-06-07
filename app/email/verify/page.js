"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
const VerifyEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const url = params.get("url");

  (async function verification() {
    try {
      const { data } = await axios.get(url);

      if (data.status === 200) {
        router.replace("/login");
        toast({
          variant: "success",
          title: data.message,
          duration: 1000,
        });
      }

      console.log(data);
    } catch (err) {
      console.log(err);

      if (err.response) {
        router.replace("/login");
        toast.error(err.response.data.message);
      }
    }
  })();
};

export default VerifyEmail;
