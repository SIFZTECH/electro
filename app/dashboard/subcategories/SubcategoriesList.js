"use client";

import { useForm } from "react-hook-form";
import { useCategory } from "@/app/_features/categories/useCategory";

import { CiMenuKebab } from "react-icons/ci";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/app/components/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import { TableCell, TableRow } from "@/app/components/ui/table";
import Link from "next/link";
import { useToast } from "@/app/_hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  deleteSubcategory,
  updateSubcategory,
} from "@/app/_services/apiSubcategories";
import { useState } from "react";
import SubCategoryMenu from "./SubCategoryMenu";

const SubcategoriesList = ({ subcategory, category }) => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  console.log(open);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: subcategory.name ?? "" } });

  async function onSubmit({ name }) {
    try {
      const res = await updateSubcategory(subcategory.id, {
        name,
        category_id: category.id,
      });

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });
        setOpen((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
          duration: 1000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          duration: 1000,
        });
      }
    }
  }

  async function handleClick() {
    try {
      const id = params.get("id");

      const res = await deleteSubcategory(id);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
          duration: 1000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          duration: 1000,
        });
      }
    }
  }

  return (
    <TableRow>
      <TableCell>{subcategory.id}</TableCell>
      <TableCell>{subcategory.name}</TableCell>
      <TableCell>{category?.name}</TableCell>
      <TableCell className="w-6">
        <Menubar className="bg-inherit border-none flex items-center justify-center">
          <MenubarMenu>
            <MenubarTrigger>
              <Link href={`/dashboard/subcategories/?id=${subcategory.id}`}>
                <CiMenuKebab size={20} />
              </Link>
            </MenubarTrigger>

            <MenubarContent>
              <div className="flex flex-col">
                <SubCategoryMenu
                  subcategory={subcategory}
                  category_id={category.id}
                />
                <MenubarSeparator />
                <Dialog>
                  <DialogTrigger className="hover:bg-gray-100 transition-all py-1">
                    Delete
                  </DialogTrigger>
                  <DialogContent onOpenChange={setOpen}>
                    <div>
                      <h2 className="font-serif text-xl">Delete Category</h2>
                      <div>
                        <p className="mt-3">
                          Are you sure you want to delete this cartegory #Name
                        </p>
                        <p className="text-sm text-gray-800 mt-3">
                          This will delete your category permanently. You cannot
                          undo this action.
                        </p>
                        <div className="flex gap-3 mt-6">
                          <button className="btn-primary bg-transparent border border-gray-900">
                            Cencel
                          </button>
                          <button
                            className="btn-primary bg-red-500 text-white"
                            onClick={handleClick}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <MenubarSeparator />
                <Dialog>
                  <DialogTrigger className="hover:bg-gray-100 transition-all py-1">
                    Details
                  </DialogTrigger>
                  <DialogContent>Details</DialogContent>
                </Dialog>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </TableCell>
    </TableRow>
  );
};

export default SubcategoriesList;
