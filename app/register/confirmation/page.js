"use client";

import Logo from "@/app/components/ui/Logo";
import { BASE_URL } from "@/app/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";

const Confirmation = () => {
  const accessToken = localStorage.getItem("access-token");

  // async function handleClick() {
  //   try {
  //     const { data } = await axios.post(
  //       `${BASE_URL}/user/email/verification-notification`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (data.status === 200) {
  //       router.replace("/login");
  //       toast({
  //         variant: "success",
  //         title: data.message,
  //         duration: 1000,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);

  //     if (err.response) {
  //       toast({
  //         variant: "destructive",
  //         title: err.response.data.message,
  //         duration: 1000,
  //       });
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "Something went wrong. Try later!",
  //         duration: 1000,
  //       });
  //     }
  //   }
  // }

  return (
    <div className="flex items-center min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:w-[34rem] sm:py-8 mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Logo />
          <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
            Verify your Email address
          </h2>
        </div>

        <div className="mt-8  sm:mx-auto sm:w-full sm:max-w-sm text-center flex flex-col items-center">
          <span className="text-color-primary font-semibold mb-2">
            We have sent email to you
          </span>
          <p>If you didn't get any email. Please check your junk mails</p>
          {/* <button
            onClick={handleClick}
            className="font-medium mt-4 text-[14px] text-color-primary hover:underline"
          >
            Resend Email
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
