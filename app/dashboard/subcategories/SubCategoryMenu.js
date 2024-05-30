"use client";

import { CiMenuKebab } from "react-icons/ci";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/app/components/ui/menubar";

import Link from "next/link";

import EditSubCategory from "./EditSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";

const SubCategoryMenu = ({ subcategory, category_id }) => {
  return (
    <Menubar className="bg-inherit border-none flex items-center justify-center">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/dashboard/subcategories/?id=${subcategory.id}`}>
            <CiMenuKebab size={20} />
          </Link>
        </MenubarTrigger>

        <MenubarContent>
          <div className="flex flex-col">
            <EditSubCategory
              subcategory={subcategory}
              category_id={category_id}
            />
            <MenubarSeparator />
            <DeleteSubCategory />
            <MenubarSeparator />
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SubCategoryMenu;
