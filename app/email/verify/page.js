"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const url = params.get("url");

  useEffect(function () {
    async function verification() {
      try {
        const { data } = await axios.get(url);

        if (data.status === 200) {
          toast.success(data.message);
          router.replace("/login");
        }

        console.log(data);
      } catch (err) {
        console.log(err);

        if (err.response) {
          router.replace("/login");
          toast.error(err.response.data.message);
        }
      }
    }
    verification();
  }, []);
};

export default VerifyEmail;
