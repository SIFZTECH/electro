"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="mt-8">
      <ul className="flex flex-col text-lg ">
        <li>
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-md ${
              pathname === "/" ? "active" : ""
            }`}
            href={"/"}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7755 3.31152L4.77551 3.31152L4.77551 13.5972L10.7755 13.5972L10.7755 3.31152Z"
                strokeWidth="2.05714"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M10.7755 17.0264H4.77551L4.77551 22.1692H10.7755V17.0264Z"
                strokeWidth="2.05714"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M20.204 3.31152L14.204 3.31152L14.204 8.45438L20.204 8.45438V3.31152Z"
                strokeWidth="2.05714"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M20.204 11.8828L14.204 11.8828L14.204 22.1685H20.204L20.204 11.8828Z"
                strokeWidth="2.05714"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
            </svg>
            <span>Dashboard</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
