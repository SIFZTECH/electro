import { redirect } from "next/navigation";

const page = () => {
  redirect("/dashboard/email-templates/password-reset");
};

export default page;
