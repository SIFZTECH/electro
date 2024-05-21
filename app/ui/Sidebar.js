"use client";

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
        <div className="flex justify-between gap-2 items-center">
          <Logo />
          <button
            onClick={() => setOpen((open) => !open)}
            className="lg:hidden  "
          >
            {!isOpen ? <HiMenuAlt4 size={30} /> : <IoMdClose size={30} />}
          </button>
        </div>
        <div
          onClick={() => setOpen((open) => !open)}
          className={`flex flex-col fixed justify-between z-[9999] transition-all  ${
            isOpen ? "right-0" : "right-[-100%]"
          }  bg-slate-900 w-full h-dvh pb-6`}
        >
          <Navigation />
          <User />
        </div>
      </div>
      <aside className="hidden lg:flex sidebar flex-initial lg:min-h-dvh text-white bg-slate-900 py-6 px-4  flex-col justify-between">
        <div>
          <Logo />
          <Navigation />
        </div>

        <User />
      </aside>
    </>
  );
};

export default Sidebar;
