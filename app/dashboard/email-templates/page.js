import { redirect } from "next/navigation";

const page = () => {
  redirect("/dashboard/email-templates/password_reset");
};

export default page;
