"use client";
import { useMails } from "@/app/_features/mails/useMail";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SkeletonNavigation } from "./SkeletonNavigation";

const Nav = () => {
  const pathname = usePathname();
  const { data, isError, isLoading, error } = useMails();

  return (
    <aside className="bg-slate-900 py-6 text-white basis-[20%]">
      <h1 className="font-semibold text-center mb-6">
        list of editable mail template
      </h1>
      <ul className="flex flex-col gap-2 text-base font-medium px-2">
        {!isLoading && isError && error && (
          <h1 className="text-xl">
            {error?.response?.data?.message || "Something went wrong!"}
          </h1>
        )}
        {isLoading && <SkeletonNavigation />}
        {!isLoading &&
          !isError &&
          !error &&
          data?.data?.map((template) => (
            <li key={template.id}>
              <Link
                className={`flex gap-2 items-center px-3 py-2 rounded-md ${
                  pathname.startsWith(
                    `/dashboard/email-templates/${template.template_name}`
                  )
                    ? "active"
                    : ""
                }`}
                href={`/dashboard/email-templates/${template.template_name}`}
              >
                <span>{template.subject}</span>
              </Link>
            </li>
          ))}
        {/* <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname.startsWith("/dashboard/email-templates/password-reset")
                ? "active"
                : ""
            }`}
            href={"/dashboard/email-templates/password-reset"}
          >
            <span>Password Reset</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname.startsWith(
                "/dashboard/email-templates/order-delivery-notification"
              )
                ? "active"
                : ""
            }`}
            href={"/dashboard/email-templates/order-delivery-notification"}
          >
            <span>Order Delivery Notification</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname.startsWith(
                "/dashboard/email-templates/warranty-approve-notification"
              )
                ? "active"
                : ""
            }`}
            href={"/dashboard/email-templates/warranty-approve-notification"}
          >
            <span>Warranty Approve Notification</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname.startsWith(
                "/dashboard/email-templates/user-created-notification"
              )
                ? "active"
                : ""
            }`}
            href={"/dashboard/email-templates/user-created-notification"}
          >
            <span>User Created Notification </span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname.startsWith(
                "/dashboard/email-templates/order-mail-notification"
              )
                ? "active"
                : ""
            }`}
            href={"/dashboard/email-templates/order-mail-notification"}
          >
            <span>Order Mail Notification</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname.startsWith("/dashboard/email-templates/otp-mail")
                ? "active"
                : ""
            }`}
            href={"/dashboard/email-templates/otp-mail"}
          >
            <span>Otp Mail</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname.startsWith(
                "/dashboard/email-templates/customer-order-mail"
              )
                ? "active"
                : ""
            }`}
            href={"/dashboard/email-templates/customer-order-mail"}
          >
            <span>Customer Order Mail</span>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default Nav;
