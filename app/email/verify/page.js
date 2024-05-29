"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/app/_hooks/use-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const { toast } = useToast();
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
        toast({
          variant: "destructive",
          title: err.response.data.message,
          duration: 1000,
        });
      }
    }
  })();
};

export default VerifyEmail;
