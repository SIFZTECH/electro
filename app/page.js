import ProtectedRoute from "@/app/components/ProtectedRoute";
import { redirect } from "next/navigation";

const page = () => {
  redirect("/dashboard");
};

export default page;
