"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../_features/authentication/useUser";
import Spinner from "./ui/Spinner";
import Confirmation from "../register/confirmation/page";
import { useQueryClient } from "@tanstack/react-query";
import PhoneOTPForm from "../dashboard/VerifyPhone";

const ProtectedRoute = ({ children }) => {
  if (typeof window !== "undefined") {
    var token = localStorage?.getItem("access-token");
  }

  // const token = localStorage?.getItem("access-token");
  const router = useRouter();
  const queryClient = useQueryClient();
  // 1. Get currentUser and check user is admin or dealer
  const {
    isLoading,
    isError,
    error,
    user,
    isEmailVerified,
    isPhoneVerified,
    isBlocked,
  } = useUser();

  useEffect(
    function () {
      if (!token) {
        queryClient.clear();
        router.replace("/login");
      }
    },
    [token, router, queryClient]
  );

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && isError && error && !user) {
        queryClient.clear();
        router.replace("/login");
      }
    },
    [user, isLoading, isError, error, router, queryClient]
  );

  // 3. IF LOADING IS TRUE
  if (isLoading) return <Spinner />;

  // If there is user and not verified
  if (user && !isEmailVerified) {
    return <Confirmation />;
  }

  if (user && !isPhoneVerified) {
    return <PhoneOTPForm />;
  }

  // 4. If there IS a admin user, render the app
  if (!isLoading && user && !isBlocked) {
    return children;
  }
};

export default ProtectedRoute;
