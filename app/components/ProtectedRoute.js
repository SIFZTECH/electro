"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../_features/authentication/useUser";
import Spinner from "./ui/Spinner";

const ProtectedRoute = ({ children }) => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage?.getItem("access-token");
  }

  // const token = localStorage?.getItem("access-token");
  const router = useRouter();

  // 1. Get currentUser and check user is admin or dealer
  const { isLoading, user, isVerified, isAdmin, isDealer, isBlocked } =
    useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && !user) {
        router.replace("/login");
      } else if (!token) {
        router.replace("/login");
      }
    },
    [user, isLoading, router, token]
  );

  // 3. IF LOADING IS TRUE
  if (isLoading) return <Spinner />;

  // If there is user and not verified
  if (!isLoading && user && !isVerified) {
    return <h1> You don't have permission to Access this route</h1>;
  }

  // 4. If there IS a admin user, render the app
  if (!isLoading && !isBlocked && (isAdmin || isDealer)) {
    return children;
  } else {
    return <h1>This is customer page</h1>;
  }
};

export default ProtectedRoute;
