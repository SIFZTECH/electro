"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../_features/authentication/useUser";
import Spinner from "./ui/Spinner";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  // 1. Get currentUser and check user is admin
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) router.push("/login");
    },
    [isAuthenticated, isLoading, router]
  );

  // 3. IF LOADING IS TRUE
  if (isLoading) return <Spinner />;

  // 4. If there IS a admin user, render the app
  if (isAuthenticated && !isLoading) {
    return children;
  }
};

export default ProtectedRoute;
