"use client";

import Link from "next/link";
import Logo from "@/app/components/ui/Logo";

const Confirmation = ({ message }) => {
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
          <span className="text-green-500 font-semibold mb-2">
            We have sent email to you
          </span>
          <p>If you didn't get any email. Please check your junk mails</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
