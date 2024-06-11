"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../_features/authentication/useUser";
import Spinner from "./ui/Spinner";
import Confirmation from "../register/confirmation/page";

const ProtectedRoute = ({ children }) => {
  if (typeof window !== "undefined") {
    var token = localStorage?.getItem("access-token");
  }

  // const token = localStorage?.getItem("access-token");
  const router = useRouter();

  // 1. Get currentUser and check user is admin or dealer
  const { isLoading, user, isVerified, isBlocked } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && !user) {
        router.replace("/login");
      }
    },
    [user, isLoading, router]
  );

  // 3. IF LOADING IS TRUE
  if (isLoading) return <Spinner />;

  // If there is user and not verified
  // if (user && !isVerified) {
  //   return <Confirmation />;
  // }

  // 4. If there IS a admin user, render the app
  if (!isLoading && !isBlocked && isVerified) {
    return children;
  }
};

export default ProtectedRoute;
