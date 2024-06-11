"use client";

import Logout from "@/app/dashboard/settings/Logout";
import Logo from "./Logo";
import Navigation from "./Navigation";
import User from "./User";
import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        className={`overflow-x-hidden lg:hidden z-[9999] bg-slate-900 py-6 px-4 text-white fixed w-full`}
      >
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setOpen((open) => !open)}
            className="lg:hidden  "
          >
            {!isOpen ? <HiMenuAlt4 size={30} /> : <IoMdClose size={30} />}
          </button>
          <Logo />
        </div>
        <div
          className={`flex flex-col justify-between fixed z-[9999] transition-all  ${
            isOpen ? "left-0" : "left-[-100%]"
          }  bg-slate-900 w-full h-[94.5%] pb-6`}
        >
          <Navigation />

          <User />
        </div>
      </div>
      <aside className="hidden lg:flex xl:fixed xl:h-dvh xl:overflow-y-auto sidebar flex-initial xl:min-h-dvh text-white bg-slate-900 py-6 px-4 flex-col justify-between lg:min-w-80">
        <div>
          <Logo />
          <Navigation />
        </div>
        <div className="mt-4 space-y-3">
          <Logout />
          <User />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
