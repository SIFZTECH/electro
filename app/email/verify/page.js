"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import Confirmation from "./Confirmation";

const VerifyEmail = () => {
  const params = useSearchParams();
  const url = params.get("url");

  (async function verifyEmail() {
    try {
      const { data } = await axios.get(url);

      if (data.status === 200) {
        return <Confirmation message={data.message} />;
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        return <Confirmation message={err.response.data.message} />;
      }
    }
  })();
  return <Confirmation message="Something went wrong!" />;
};

export default VerifyEmail;
